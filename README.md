# Sunlit White Blossoms · Dream Skin Theme

以 Tsuyoshi Kozu 的阳光白花摄影作品为背景，为 Dream Skin 1.5.16 制作的明亮暖色主题与 macOS 精修包。

![主题背景预览](theme/background.jpg)

## 下载

- 最新完整 macOS 精修包：[`dist/Tsuyoshi-Kozu-Sunlit-Blossoms-DreamSkin-1.5.16-Refined-v3-macOS.zip`](dist/Tsuyoshi-Kozu-Sunlit-Blossoms-DreamSkin-1.5.16-Refined-v3-macOS.zip)
- 仅主题导入包：[`dist/Tsuyoshi-Kozu-Sunlit-Blossoms.theme.zip`](dist/Tsuyoshi-Kozu-Sunlit-Blossoms.theme.zip)

完整包 SHA-256：

```text
00d1404efe3f6301aadd3f6531c9fd0c91d0931f11c90f636fe7517a4f7ce3de
```

## 精修内容

- 减轻 ambient 任务页的全局遮罩，保留明亮背景。
- 发送/停止按钮使用深琥珀底色与高对比白色图标。
- 用户消息使用轻量暖白毛玻璃。
- 宽屏 AI 回复仅在右侧加入羽化暖白阅读层，左侧透明，不改变文字与布局。
- 代码块与标题栏改为暖米色表面。
- “添加到对话”纯文本结果卡改为暖米灰半透明表面与琥珀细边框。
- 顶栏“聊天/工作”切换器使用暖米灰轨道与浅蜂蜜金选中态。
- 移除 ChatGPT/Codex 模式下拉框右侧的额外小点。

## 安装

### 完整精修包

1. 退出 ChatGPT/Codex 和正在运行的 Codex Dream Skin。
2. 解压完整包，把 `Codex Dream Skin.app` 拖入“应用程序”并替换旧版。
3. 在 Finder 中右键该应用，选择“打开”。
4. 在菜单栏 Dream Skin 中选择“修复引擎/重新安装引擎”。
5. 双击包内的 `应用主题.command`。

完整包使用 ad-hoc 临时签名，未经 Apple 公证。安装前请核对 SHA-256。

### 仅导入主题

将 `Tsuyoshi-Kozu-Sunlit-Blossoms.theme.zip` 导入 Dream Skin 1.5.16。该 ZIP 只包含官方 Safe CSS 支持的主题能力，不包含引擎级精修。

## 仓库结构

```text
theme/          可编辑的 theme.json、Safe CSS 与背景图
engine-patch/   Dream Skin 1.5.16 的视觉精修 CSS
dist/           可直接分发的主题 ZIP 与完整 macOS ZIP
```

## 验证

- `theme/` 与独立主题 ZIP 均通过 Dream Skin 1.5.16 简化格式验证。
- Safe CSS 校验通过：9 条规则、48 项声明。
- 完整包经过 ZIP 完整性、内置 SHA-256 和 macOS 应用签名复验。

## 来源与许可

背景摄影：[Tsuyoshi Kozu — White blossoms are illuminated by the sunlight](https://unsplash.com/photos/white-blossoms-are-illuminated-by-the-sunlight-xDhSwX9iVxY)，依据 [Unsplash License](https://unsplash.com/license) 使用。

软件代码与 CSS 修改按 [MIT License](LICENSE) 发布。照片仍遵循 Unsplash License；请勿将单张原照独立出售或用于组建与 Unsplash 类似、竞争的图片库。

Codex Dream Skin 是非官方自定义项目，与 OpenAI 无隶属、授权或背书关系。
