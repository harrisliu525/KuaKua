# 高情商夸奖生成器

一个基于AI的智能夸奖内容生成工具，帮助用户生成专业、真诚、走心的夸奖内容。

## 项目特色

- 🎯 **27种夸奖技法**：涵盖结构类、视角类、观察类、氛围类等多种夸奖方法
- 🤖 **AI智能生成**：基于DeepSeek模型，生成高质量夸奖内容
- 📝 **详细解析**：每条夸奖都包含使用技法和逻辑思路
- 🎨 **优雅界面**：基于Tailwind CSS和Radix UI的现代化设计
- ⚡ **实时生成**：快速响应，即时生成专业夸奖内容

## 技术栈

- **Frontend**: Next.js 13.5.1 + TypeScript
- **UI**: Tailwind CSS + Radix UI + Framer Motion
- **AI**: OpenRouter API + DeepSeek Chat
- **字体**: 系统字体（避免网络依赖问题）

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
创建 `.env.local` 文件：
```env
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=deepseek/deepseek-chat-v3-0324
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 访问应用
打开浏览器访问 [http://localhost:3000](http://localhost:3000) 或 [http://localhost:3001](http://localhost:3001)

## 故障排除

### ✅ 已修复的问题

1. **Google Fonts网络连接问题**
   - **问题**: 构建时无法访问Google Fonts服务器
   - **解决**: 使用系统字体替代，避免网络依赖

2. **API路由配置冲突**
   - **问题**: `output: 'export'` 与动态API路由不兼容
   - **解决**: 移除静态导出配置，支持服务端渲染

3. **环境变量安全性**
   - **问题**: API密钥硬编码在代码中
   - **解决**: 移至环境变量配置

4. **React Hydration错误**
   - **问题**: 服务端渲染和客户端渲染不一致，localStorage访问导致hydration失败
   - **解决**: 使用ClientOnly组件包装客户端特定功能，确保SSR兼容性

### 常见问题

**Q: 构建时出现字体下载失败怎么办？**
A: 项目已配置使用系统字体，无需担心网络连接问题。

**Q: API调用失败怎么办？**
A: 检查 `.env.local` 文件中的 `OPENROUTER_API_KEY` 是否正确配置。

**Q: 端口被占用怎么办？**
A: Next.js会自动尝试下一个可用端口（如3001、3002等）。

**Q: 出现Hydration错误怎么办？**
A: 项目已通过ClientOnly组件解决SSR兼容性问题，确保客户端特定功能正确渲染。

## 项目结构

```
kuakua/
├── app/                    # Next.js App Router
│   ├── api/
│   │   └── compliments/    # AI夸奖生成API
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 首页
├── components/             # React组件
│   ├── ui/                 # 基础UI组件
│   ├── client-only.tsx     # 客户端专用组件包装器
│   ├── compliment-form.tsx # 夸奖表单
│   ├── compliment-results.tsx # 结果展示
│   ├── header.tsx          # 页头
│   ├── hero.tsx            # 主标题区域
│   ├── history-list.tsx    # 历史记录列表
│   └── footer.tsx          # 页脚
├── lib/                    # 工具函数
├── hooks/                  # 自定义Hook
└── public/                 # 静态资源
```

## 使用方法

1. **输入夸奖对象**：填写被夸奖的人是谁
2. **选择场景**（可选）：选择夸奖的具体情境
3. **生成夸奖**：点击生成按钮，AI将生成3条专业夸奖
4. **查看解析**：每条夸奖都会显示使用的技法和逻辑思路

## 夸奖技法体系

项目内置27种专业夸奖技法，分为4个类别：

- **A. 结构类**（4种）：观察-感受-展望、关键词+句型等
- **B. 视角类**（9种）：显微镜细节、时间对比、第三人称等  
- **C. 观察类**（8种）：气质氛围、态度习惯、能力高亮等
- **D. 氛围类**（6种）：半步幽默、夸+感谢、夸+请教等

## 部署

### 构建生产版本
```bash
npm run build
```

### 本地预览生产版本
```bash
npm run start
```

## 技术亮点

- 🔧 **配置优化**: 解决了字体加载和API路由的兼容性问题
- 🛡️ **安全性**: API密钥通过环境变量管理
- 🎨 **用户体验**: 现代化UI设计，响应式布局
- 📱 **兼容性**: 支持各种设备和浏览器
- ⚡ **SSR兼容**: 通过ClientOnly组件解决hydration问题

## 贡献

欢迎提交Issue和Pull Request来改进项目！

## 许可证

MIT License 