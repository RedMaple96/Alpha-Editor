# Alpha Editor

## 1. 项目概述

Alpha Editor 是一个纯前端的图片透明度（Alpha）编辑器：导入图片后，可用画笔/橡皮擦与多种选区工具修改像素透明度，并导出带透明通道的 PNG。

核心能力：

- 导入图片：支持拖拽或点击上传（PNG/JPEG/TIFF 等浏览器可识别格式）
- 编辑透明度：画笔“隐藏”（降低 Alpha），橡皮擦“还原”（恢复 Alpha=255）
- 选区工具：矩形、圆形、套索选区，可对选区内一次性应用透明度
- 视图控制：平移、缩放
- 历史记录：撤销 / 重做（macOS ⌘Z / ⌘⇧Z；Windows/Linux Ctrl+Z / Ctrl+Y）
- 导出：导出 PNG，保留原图颜色并按遮罩 Alpha 输出透明度

## 2. 快速开始指南

### 2.1 运行前提

- Node.js：建议 `>= 18`（构建工具链需要）
- 浏览器：Chrome / Edge / Firefox 最新版本

### 2.2 安装步骤与依赖安装命令

```bash
git clone <your-repo-url>
cd Alpha-editor
npm install
```

### 2.3 开发运行

```bash
npm run dev
```

默认访问：

- http://localhost:5173/

### 2.4 生产构建与本地预览

```bash
npm run build
npm run preview
```

默认预览地址（以终端输出为准）：

- http://localhost:4173/

### 2.5 后台运行（本地服务常驻）

适用于在本机或服务器上“常驻”运行（关闭当前终端也不中断）。

后台启动服务（推荐，基于构建产物 `dist/`）：

```bash
npm run build
nohup npm run preview -- --host 0.0.0.0 --port 4173 > alpha-editor-preview.log 2>&1 &
echo $! > alpha-editor-preview.pid
```

后台启动开发服务（用于开发调试，非推荐生产方式）：

```bash
nohup npm run dev -- --host 0.0.0.0 --port 5173 > alpha-editor-dev.log 2>&1 &
echo $! > alpha-editor-dev.pid
```

查看日志：

```bash
tail -f alpha-editor-preview.log
```

停止服务（两种方式任选其一）：

```bash
kill "$(cat alpha-editor-preview.pid)"
```

```bash
lsof -ti :4173 | xargs kill
```

## 3. 配置说明

### 3.1 环境变量

本项目不依赖后端服务，默认无需 `.env`。

### 3.2 可定制参数与选项

- UI 主题与 Tailwind 扩展配置：[tailwind.config.js](./tailwind.config.js)
- 构建配置（Vite）：[vite.config.js](./vite.config.js)
- 应用逻辑（编辑器核心）：[App.jsx](./src/App.jsx)
- 全局样式（网格背景、滚动条等）：[styles.css](./src/styles.css)

编辑器默认行为（画笔大小/形状、不透明度、缩放、历史容量等）可在 [App.jsx](./src/App.jsx) 中调整。

## 4. 项目结构（入口与运行链路）

当前仓库已完成“预编译 + 本地依赖”的工程化改造，开发与生产均通过 Vite 构建输出静态资源：

- [index.html](./index.html)：应用入口（开发与生产）
- [src/main.jsx](./src/main.jsx)：应用启动入口（React 挂载）
- [src/App.jsx](./src/App.jsx)：编辑器全部业务逻辑（React + PixiJS）

说明：

- 现在不再使用 `type="text/babel"`，JSX 会在构建阶段预编译
- React 生产构建时会自动使用生产模式（无开发警告、体积更小）
- 所有依赖通过 npm 安装并打包到 `dist/assets/*`，不再依赖外部 CDN

## 5. 开发指南

### 5.1 代码贡献规范

- 变更尽量保持可回滚：对遮罩/历史记录/导出链路的修改，建议附最小复现步骤
- 对大图性能敏感的修改，建议说明影响范围（像素遍历、历史栈容量等）

### 5.2 测试方法

项目当前未引入专门测试框架，建议以手动回归为主：

- 导入一张 PNG（最好包含半透明区域）
- 画笔隐藏部分区域，验证撤销/重做
- 使用矩形/圆形/套索选区进行一次性透明度设置
- 导出 PNG，打开导出文件检查透明通道是否生效

### 5.3 调试技巧

浏览器控制台可用调试接口：

- `window.__alphaEditorDebug.exportPNG()`：返回导出的 PNG DataURL
- `window.__alphaEditorDebug.undo()` / `redo()`：触发撤销/重做
- `window.__alphaEditorDebug.resetMask()`：遮罩复位并写入历史

## 6. 部署说明

### 6.1 生产环境构建步骤

```bash
npm ci
npm run build
```

构建产物输出到 `dist/`，部署时将 `dist/` 作为静态站点根目录即可。

### 6.2 服务器配置建议

- 静态文件服务即可（Nginx / Caddy / Apache / 对象存储静态托管）
- 建议开启 gzip/brotli 压缩（HTML/JS/CSS）
- 建议为 `assets/*` 配置长缓存（文件名带 hash），HTML 配置短缓存或不缓存
