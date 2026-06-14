@echo off
chcp 65001 >nul
echo ================================
echo  黄金酱酒邀请函系统 - 启动脚本
echo ================================
echo.

REM 检查 node 是否可用
where node >nul 2>&1
if errorlevel 1 (
  echo [错误] 未找到 Node.js，请先安装 Node.js
  pause
  exit /b 1
)

REM 安装依赖（如未安装）
if not exist "node_modules\" (
  echo [信息] 首次运行，正在安装依赖...
  call npm install
)

REM 启动服务器（阻塞运行，Ctrl+C 停止）
echo.
echo [信息] 正在启动服务器...
echo [信息] 启动后访问 http://localhost:3000
echo [信息] 按 Ctrl+C 停止服务器
echo.
node server.js
