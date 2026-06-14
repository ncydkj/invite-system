# 邀请函系统 - 部署说明

## 方式一：本地运行（最快，适合测试）

1. 双击 `start.bat` 启动服务器
2. 浏览器打开 `http://localhost:3000/admin.html`
3. 按 `Ctrl+C` 停止服务器

> 仅本机可访问，嘉宾无法访问。

---

## 方式二：本地运行 + 隧道（适合小型活动）

1. 安装 localtunnel：`npm install -g localtunnel`
2. 启动服务器：`start.bat`
3. 新开一个命令行窗口，运行：`lt --port 3000`
4. 得到公网 URL（如 `https://abc123.loca.lt`）
5. 将URL发送给嘉宾（如 `https://abc123.loca.lt/invite.html?id=HJXXXX`）

> ⚠️ localtunnel 在国内可能不稳定，URL 重启后会变化。

---

## 方式三：部署到 Render.com（推荐，永久稳定）

### 第一步：上传代码到 GitHub

1. 访问 [github.com](https://github.com) 并登录
2. 点击右上角 `+` → `New repository`
3. 仓库名填写 `invite-system`，点击 `Create repository`
4. 按页面提示，将本地代码推送到 GitHub：
   ```bash
   cd C:\Users\Administrator\WorkBuddy\2026-06-14-19-32-50\invite-system
   git init
   git add .
   git commit -m "初始提交"
   git remote add origin https://github.com/你的用户名/invite-system.git
   git push -u origin main
   ```

### 第二步：部署到 Render

1. 访问 [render.com](https://render.com) 并登录（可用 GitHub 登录）
2. 点击 `New +` → `Web Service`
3. 选择刚才创建的 GitHub 仓库 `invite-system`
4. 配置如下：
   - **Name**: `invite-system`（可自定义）
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: 选择 `Free`
5. 点击 `Create Web Service`
6. 等待部署完成（约 2-3 分钟）
7. 得到永久 URL，如 `https://invite-system.onrender.com`

### 第三步：使用

- 管理后台：`https://你的URL.onrender.com/admin.html`
- 邀请函：`https://你的URL.onrender.com/invite.html?id=HJXXXX`
- 系统引导页：`https://你的URL.onrender.com/`

> ✅ 此 URL 永久不变，适合正式活动使用。

---

## 数据点说明

所有邀请函数据存储在服务器的 `data/invites.json` 文件中。

- **本地运行**：数据存在本地，删除文件会丢失数据
- **Render 部署**：每次部署不会清除数据，但建议定期备份 `invites.json`

---

## 常见问题

**Q: 忘记管理员密码怎么办？**
A: 当前密码为 `admin` / `123123`，可在 `public/admin.html` 中搜索 `doLogin` 修改。

**Q: 如何更换端口？**
A: 修改 `server.js` 第 7 行的 `PORT` 变量，或运行 `set PORT=8080 && node server.js`。

**Q: 国内访问 Render.com 速度如何？**
A: Render.com 服务器在国外，国内访问速度一般但可用。如需要国内服务器，建议部署到阿里云/腾讯云。
