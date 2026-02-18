# 数据管理

这个目录包含了网站所有的静态数据，便于集中管理和更新。

## 文件结构

```
src/data/
├── index.ts              # 统一导出所有数据
├── books.ts              # 书籍相关数据
├── music.ts              # 音乐相关数据
├── movies.ts             # 电影相关数据
└── ai-capabilities.ts    # AI 能力和技术栈数据
```

## 使用方法

### 导入单个数据模块

```typescript
import { books, currentlyReading } from "@/data/books";
import { playlist, nowPlaying } from "@/data/music";
import { movies } from "@/data/movies";
import { aiCapabilities, techSkills } from "@/data/ai-capabilities";
```

### 导入所有数据

```typescript
import { books, movies, playlist, aiCapabilities } from "@/data";
```

## 数据类型

所有数据都有完整的 TypeScript 类型定义，确保类型安全。

### 书籍数据 (books.ts)

- `Book` - 书籍信息
- `CurrentlyReading` - 当前阅读的书籍
- `books` - 已读书籍列表
- `currentlyReading` - 当前阅读信息
- `booksReadThisYear` - 今年已读书籍数量

### 音乐数据 (music.ts)

- `Track` - 音乐曲目
- `NowPlaying` - 当前播放信息
- `playlist` - 播放列表
- `nowPlaying` - 当前播放的歌曲

### 电影数据 (movies.ts)

- `Movie` - 电影信息
- `movies` - 电影列表

### AI 能力数据 (ai-capabilities.ts)

- `AICapability` - AI 能力项
- `TechSkill` - 技术技能
- `aiCapabilities` - AI 能力列表
- `techSkills` - 技术技能列表
- `aiDescription` - AI 部分的描述文本

## 更新数据

要更新网站内容，只需编辑对应的数据文件即可，无需修改组件代码。

例如，要添加一本新书：

```typescript
// src/data/books.ts
export const books: Book[] = [
  // ... 现有书籍
  {
    title: "新书名",
    author: "作者名",
    rating: 5,
    cover: "bg-purple-100",
    quote: "书中的名言",
  },
];
```

## 优点

✅ **集中管理** - 所有数据在一个地方，易于查找和更新
✅ **类型安全** - 完整的 TypeScript 类型定义
✅ **易于维护** - 更新内容不需要修改组件代码
✅ **可扩展** - 便于后续接入 CMS 或数据库
✅ **代码清晰** - 组件专注于展示逻辑，数据与视图分离
