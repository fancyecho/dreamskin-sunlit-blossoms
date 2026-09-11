# DreamSkin Themes & macOS Refinements

为 Dream Skin 1.5.16 制作的独立主题源文件与 macOS 引擎精修。当前包含 Sunlit White Blossoms 和 Roseblade Reverie，两个主题使用不同 ID、背景和配色，不会相互覆盖。

## 当前源码

### Roseblade Reverie · 蔷薇刃梦

![Roseblade Reverie 背景预览](themes/roseblade-reverie/background.jpg)

- 主题 ID：`preset-roseblade-reverie`
- 主题源文件：[`themes/roseblade-reverie`](themes/roseblade-reverie)
- 当前更新为源码版，按要求未重新打包 ZIP。

### Sunlit White Blossoms

![主题背景预览](theme/background.jpg)

## 已有下载

- Sunlit White Blossoms macOS 精修包：[`dist/Tsuyoshi-Kozu-Sunlit-Blossoms-DreamSkin-1.5.16-Refined-v3-macOS.zip`](dist/Tsuyoshi-Kozu-Sunlit-Blossoms-DreamSkin-1.5.16-Refined-v3-macOS.zip)
- 仅主题导入包：[`dist/Tsuyoshi-Kozu-Sunlit-Blossoms.theme.zip`](dist/Tsuyoshi-Kozu-Sunlit-Blossoms.theme.zip)

完整包 SHA-256：

```text
00d1404efe3f6301aadd3f6531c9fd0c91d0931f11c90f636fe7517a4f7ce3de
```

## Roseblade 当前精修

- 保留蔷薇、手部与刀刃细节，长文区域使用柔和羽化磨砂阅读层。
- 输入框、用户消息、代码块、写作卡片和右上角输出面板统一为暖粉玻璃质感。
- 会话详情、项目详情、额度提醒和账户菜单采用不同透明度与色调，保留层次。
- 浮层从首帧开始即匹配主题配色，修复原生冷白背景短暂闪现。
- 发送按钮、滚动到底部按钮、顶部聊天/工作切换器和各类悬停状态与主题协调。

## Sunlit White Blossoms 精修

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
theme/                       Sunlit White Blossoms 可编辑源文件
themes/roseblade-reverie/    Roseblade Reverie 独立源文件
engine-patch/                Dream Skin 1.5.16 共享引擎与主题限定精修
tools/                       Roseblade 背景可复现处理工具
dist/                        已生成的分发包
```

## 验证

- `theme/` 与独立主题 ZIP 均通过 Dream Skin 1.5.16 简化格式验证。
- Safe CSS 校验通过：9 条规则、48 项声明。
- 完整包经过 ZIP 完整性、内置 SHA-256 和 macOS 应用签名复验。
- Roseblade 当前源文件通过 Dream Skin 1.5.16 格式、Safe CSS、资源路径和实机载荷验证。

## 来源与许可

背景摄影：[Tsuyoshi Kozu — White blossoms are illuminated by the sunlight](https://unsplash.com/photos/white-blossoms-are-illuminated-by-the-sunlight-xDhSwX9iVxY)，依据 [Unsplash License](https://unsplash.com/license) 使用。

软件代码与 CSS 修改按 [MIT License](LICENSE) 发布。Sunlit 照片仍遵循 Unsplash License；Roseblade 背景为用户提供的美术素材，不适用于 MIT 软件许可。

Codex Dream Skin 是非官方自定义项目，与 OpenAI 无隶属、授权或背书关系。
