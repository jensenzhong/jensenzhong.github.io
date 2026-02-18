/**
 * 音乐数据模块
 *
 * 包含音乐口味雷达图数据、收藏歌单、当前播放信息
 */

export interface Genre {
  label: string;
  value: number; // 0-100 偏好程度
}

export interface Playlist {
  name: string;
  description: string;
  songCount: number;
  gradient: string; // Tailwind gradient classes
}

export interface NowPlayingInfo {
  title: string;
  artist: string;
}

// 音乐口味雷达图数据
export const genres: Genre[] = [
  { label: "流行", value: 85 },
  { label: "说唱", value: 92 },
  { label: "R&B", value: 70 },
  { label: "电子", value: 65 },
  { label: "摇滚", value: 55 },
  { label: "民谣", value: 40 },
];

// 收藏歌单
export const playlists: Playlist[] = [
  {
    name: "说唱精选",
    description: "最爱的 Rapper 合集",
    songCount: 128,
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    name: "流行热歌",
    description: "单曲循环停不下来",
    songCount: 96,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "深夜 R&B",
    description: "适合深夜独处时光",
    songCount: 64,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    name: "电子节拍",
    description: "写代码的 BGM",
    songCount: 82,
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    name: "经典摇滚",
    description: "永不过时的经典",
    songCount: 45,
    gradient: "from-orange-500 to-amber-600",
  },
  {
    name: "民谣小调",
    description: "慢下来 听故事",
    songCount: 38,
    gradient: "from-emerald-500 to-green-600",
  },
];

// 当前播放
export const nowPlayingInfo: NowPlayingInfo = {
  title: "Midnight City",
  artist: "M83",
};
