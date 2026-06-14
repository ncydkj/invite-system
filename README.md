# H5 邀请函系统 — 黄金酱酒流金之夜品鉴会

## 功能
- 管理后台：生成嘉宾邀请函、扫码核销
- 嘉宾邀请函：展示活动信息 + 专属二维码
- 核销后自动同步：嘉宾页面自动显示"已核销"状态

## 技术栈
- Node.js + Express 后端
- 纯前端 HTML/CSS/JS（无框架）
- qrcode-generator 二维码生成
- html5-qrcode 扫码核销
- JSON 文件数据存储

## 本地运行
```bash
npm install
node server.js
```
访问 http://localhost:3000

## 管理后台
- 地址：/admin.html
- 账号：admin
- 密码：123123
