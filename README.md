# JensenZhong Personal Website

个人网站项目 - 展示我的技能、项目和兴趣爱好。

## 技术栈

- **框架**: Next.js 16.1.4 (App Router)
- **语言**: TypeScript 5
- **UI 框架**: React 19.2.3
- **样式**: Tailwind CSS 3.4
- **动画**: Framer Motion 12
- **UI 组件**: Radix UI
- **图标**: Lucide React
- **工具库**: clsx, tailwind-merge, class-variance-authority
- **部署**: Vercel

## 功能特性

- 🎨 现代化的 UI 设计，采用 Apple 风格
- 🌊 流畅的动画效果和交互体验
- 📱 完全响应式设计
- ♿ 良好的无障碍性支持
- 🔍 SEO 优化（OpenGraph、Twitter Cards、Sitemap、Robots.txt）
- ⚡ 性能优化（静态生成、图片优化）
- 🔒 安全头配置
- 🎯 错误边界处理
- 🎭 3D 卡片效果和动态光晕
- 🌌 轨道系统动画

## 页面模块

网站包含以下主要模块：

- **Hero**: 个人介绍和欢迎区域
- **Code**: 技能展示和 AI 能力介绍
- **Portfolio**: 项目作品集展示
- **Reading**: 阅读书单和推荐
- **Music**: 音乐品味展示
- **Movies**: 电影收藏展示
- **Footer**: 页脚和联系方式

## 项目结构

```
personal_web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 根布局和元数据
│   │   ├── page.tsx           # 主页
│   │   ├── robots.ts          # Robots.txt 配置
│   │   ├── sitemap.ts         # 站点地图
│   │   └── globals.css        # 全局样式
│   ├── components/             # React 组件
│   │   ├── ui/                # UI 基础组件
│   │   │   ├── 3d-card.tsx   # 3D 卡片效果
│   │   │   ├── bento-grid.tsx # 网格布局
│   │   │   ├── button.tsx     # 按钮组件
│   │   │   ├── dock.tsx       # Dock 导航
│   │   │   ├── dynamic-halo.tsx # 动态光晕
│   │   │   └── orbit-system.tsx # 轨道系统
│   │   ├── code.tsx           # 技能展示
│   │   ├── error-boundary.tsx # 错误边界
│   │   ├── footer.tsx         # 页脚
│   │   ├── hero.tsx           # 首屏
│   │   ├── movies.tsx         # 电影模块
│   │   ├── music.tsx          # 音乐模块
│   │   ├── navbar.tsx         # 导航栏
│   │   ├── portfolio.tsx      # 作品集
│   │   └── reading.tsx        # 阅读模块
│   ├── data/                   # 数据文件
│   │   ├── ai-capabilities.ts # AI 能力数据
│   │   ├── books.ts           # 书籍数据
│   │   ├── movies.ts          # 电影数据
│   │   ├── music.ts           # 音乐数据
│   │   └── index.ts           # 数据导出
│   ├── lib/                    # 工具函数
│   │   └── utils.ts           # 通用工具
│   └── registry/               # 第三方组件
│       └── magicui/           # Magic UI 组件
│           ├── marquee.tsx    # 跑马灯
│           └── orbiting-circles.tsx # 轨道圆圈
├── public/                     # 静态资源
│   └── images/                # 图片文件
│       ├── personal_full.jpg  # 个人照片
│       └── social_photo.jpg   # 社交分享图
├── .spec-workflow/            # 规范工作流
├── next.config.ts             # Next.js 配置
├── tailwind.config.js         # Tailwind 配置
├── postcss.config.js          # PostCSS 配置
└── tsconfig.json              # TypeScript 配置
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 环境变量配置

复制 `.env.example` 为 `.env.local` 并配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
NEXT_PUBLIC_SITE_URL=https://jensonzhong.com
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
npm start
```

### 代码检查

```bash
npm run lint
```

## 自定义内容

### 更新个人信息

1. **社交媒体链接**: 编辑 `src/components/navbar.tsx` 和 `src/components/footer.tsx`
2. **个人简介**: 编辑 `src/components/hero.tsx`
3. **技能和 AI 能力**: 编辑 `src/data/ai-capabilities.ts`
4. **阅读书单**: 编辑 `src/data/books.ts`
5. **音乐列表**: 编辑 `src/data/music.ts`
6. **电影收藏**: 编辑 `src/data/movies.ts`
7. **元数据和 SEO**: 编辑 `src/app/layout.tsx` 中的 metadata
8. **站点地图**: 编辑 `src/app/sitemap.ts`

### 添加图片

将图片放在 `public/images/` 目录下，推荐尺寸：
- 社交媒体分享图: 1200x630px (`social_photo.jpg`)
- 个人照片: 建议高质量，适合展示 (`personal_full.jpg`)
- 头像: 建议正方形，至少 400x400px

## 部署

### Vercel (推荐)

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量 `NEXT_PUBLIC_SITE_URL`
4. 部署完成

### 其他平台

项目支持任何支持 Next.js 的托管平台：
- Netlify
- Cloudflare Pages
- AWS Amplify
- Railway
- Render

## 开发注意事项

- 使用 ESLint 进行代码检查，配置在 `eslint.config.mjs`
- 使用 TypeScript 严格模式确保类型安全
- 组件采用函数式组件和 React Hooks
- 样式使用 Tailwind CSS 实用类
- 动画效果使用 Framer Motion
- 确保所有组件都有错误边界保护

## 性能优化

- 使用 Next.js 静态生成 (SSG)
- 图片使用 Next.js Image 组件自动优化
- 代码分割和懒加载
- CSS 按需加载
- 字体优化

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

© 2025 JensenZhong. All rights reserved.

## 联系方式

- GitHub: [@jensonzhong](https://github.com/jensonzhong)
