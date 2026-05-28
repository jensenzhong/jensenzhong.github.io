# Portfolio Embed Package

这个文件夹是 `portfolio.html` 的可迁移版本，可以整体复制到个人网站项目中。

## 字体

页面通过 Google Fonts 在线加载以下字体：

- `Playfair Display`：英文衬线展示字体，用在英文强调、数字和大号装饰文字。
- `Noto Serif SC`：中文宋体/衬线字体，用在中文标题。
- `Noto Sans SC`：中文无衬线字体，用在正文、导航和说明文字。
- `IBM Plex Mono`：等宽字体，用在标签、编号和英文小字。

字体引用在 `portfolio.html` 头部：

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700&family=Noto+Serif+SC:wght@300;400;500;600;700;900&family=Noto+Sans+SC:wght@300;400;500;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap" rel="stylesheet">
```

如果个人网站需要离线访问或避免 Google Fonts 加载失败，需要把这些字体改成本地自托管字体文件。

## 必须一起保留的文件

`portfolio.html` 当前实际引用了以下本地资源，已经按原相对路径复制到本文件夹：

- `关键词_bertopic/nature_redraw/fig6_risk_semantic_space_nature.svg`
- `关键词_bertopic/nature_redraw/fig2_topic_keywords_nature.svg`
- `关键词_bertopic/nature_redraw/fig1_topic_distribution_nature.svg`
- `关键词_bertopic/fig_sankey_flow.png`
- `关键词_bertopic/enhanced_figures/fig8_comprehensive_dashboard.svg`
- `关键词_bertopic/nature_redraw/fig5_keyword_landscape_nature.svg`
- `关键词_bertopic/enhanced_figures/fig6_semantic_expansion_network.svg`

## 接入方式

把整个 `portfolio_embed_package` 文件夹复制到个人网站中，保持内部目录结构不变。然后把网站导航或作品集入口链接到：

```text
portfolio_embed_package/portfolio.html
```

如果你只复制 `portfolio.html`，页面里的图表会因为相对路径缺失而无法显示。
