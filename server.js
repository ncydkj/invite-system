const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'invites.json');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize data directory and file
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf-8');

// Helper: read/write invites
function getInvites() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (e) {
    return [];
  }
}
function saveInvites(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Generate unique invite ID: HJ + 4 alphanumeric chars
function generateId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'HJ';
  for (let i = 0; i < 4; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

// ========== API Routes ==========

// List all invites
app.get('/api/invites', (req, res) => {
  res.json(getInvites());
});

// Create a new invite
app.post('/api/invites', (req, res) => {
  const { name, company } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: '请输入嘉宾姓名' });

  const invites = getInvites();
  const id = generateId();
  const invite = {
    id,
    name: name.trim(),
    company: (company || '').trim(),
    createdAt: new Date().toISOString(),
    used: false,
    usedAt: null
  };
  invites.push(invite);
  saveInvites(invites);
  res.json(invite);
});

// Get a single invite by ID
app.get('/api/invites/:id', (req, res) => {
  const invites = getInvites();
  const invite = invites.find(i => i.id === req.params.id);
  if (!invite) return res.status(404).json({ error: '邀请函不存在' });
  res.json(invite);
});

// Verify (核销) an invite
app.post('/api/verify/:id', (req, res) => {
  const invites = getInvites();
  const invite = invites.find(i => i.id === req.params.id);

  if (!invite) return res.status(404).json({ success: false, error: '无效邀请码' });
  if (invite.used) return res.json({ success: false, message: '已核销', invite });

  invite.used = true;
  invite.usedAt = new Date().toLocaleString('zh-CN');
  saveInvites(invites);
  res.json({ success: true, invite });
});

// Delete an invite
app.delete('/api/invites/:id', (req, res) => {
  let invites = getInvites();
  const index = invites.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '邀请函不存在' });
  invites.splice(index, 1);
  saveInvites(invites);
  res.json({ success: true });
});

// SPA fallback: serve index.html for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 服务器已启动: http://localhost:${PORT}`);
  console.log(`📋 管理后台: http://localhost:${PORT}/admin.html`);
  console.log(`\n按 Ctrl+C 停止服务器\n`);
});
