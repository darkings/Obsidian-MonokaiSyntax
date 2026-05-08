# 错误记录

## 2026-05-06：Vite 构建读取 `dist/theme.css` 失败

### 触发命令

```powershell
npm run build
```

### 错误信息

```text
Error: ENOENT: no such file or directory, open 'D:\Projects\Monokai Syntax\dist\theme.css'
plugin: obsidian-theme-bundle
hook: closeBundle
```

### 根因分析

`vite.config.js` 中的自定义插件在 `closeBundle` 钩子里读取 `dist/theme.css`。当前 Vite/Rolldown 构建流程中，该钩子执行时不能保证 `dist/theme.css` 已经写入磁盘，因此读取文件失败，并导致整个构建中断。

### 解决方案

将插件逻辑从 `closeBundle` 改为 `generateBundle`：直接在 Vite/Rolldown 的内存 bundle 中寻找 CSS 资产，修改其内容并强制输出为 `theme.css`，同时拼接许可证头部与 Style Settings 元数据。

### 后续发现

第一次修复后再次运行 `npm run build`，构建失败并提示：

```text
[plugin obsidian-theme-bundle]
Error: 未找到可写入的 CSS 构建资产。
```

这说明当前 Vite 版本在将纯 `.scss` 文件作为构建入口时，没有在 `generateBundle` 阶段生成可供插件处理的 CSS 资产。进一步修复方向是改用标准 JS 入口导入 SCSS，让 Vite 正常生成 CSS 资产，然后在插件中删除 Obsidian 不需要的 JS chunk。

### 最终修复

最小隔离构建显示，改用 JS 入口后 Vite 会生成 `dist/theme.css`，但该 CSS 资产仍不会出现在自定义插件的 `generateBundle` 参数中。最终方案改为：

1. 使用 `src/main.js` 导入 `src/scss/index.scss`，保证 Vite 完整执行 SCSS 构建。
2. 在 `closeBundle` 阶段读取已经落盘的 `dist/theme.css`。
3. 拼接 `src/css/license.css`、主题 CSS 与 Style Settings 元数据。
4. 删除 Obsidian 主题不需要的空 JS 构建产物。

## 2026-05-06：SCSS 架构初始模块验证失败

### 触发命令

```powershell
npm run lint:css
npm run build
```

### 错误信息

Stylelint 报错：

```text
src/scss/_variables.scss
Unexpected empty line before $-variable
Expected "Arial" to be "arial"
Expected "Consolas" to be "consolas"

src/scss/components/_editor.scss
Empty source
```

Sass 构建报错：

```text
Error: [sass] Undefined variable.
src\scss\_base.scss 2:24
```

### 根因分析

Sass `@use` 采用模块作用域，`index.scss` 中先 `@use "variables"` 并不会把变量自动暴露给 `_base.scss`。因此 `_base.scss` 必须显式 `@use "variables" as *;` 或使用命名空间访问变量。

Stylelint 报错来自标准 SCSS 规则：变量声明之间默认不允许空行，空的占位模块也会触发 `no-empty-source`。

### 解决方案

1. 在 `_base.scss` 中显式引入 `variables` 模块。
2. 移除 `_variables.scss` 中变量分组之间的空行，并将字体回退名写为字符串。
3. 为暂未实现的组件和插件模块添加 Sass placeholder，避免空源文件。

## 2026-05-06：浅色模式链接色对比度不足

### 触发命令

```powershell
npm run check:contrast
```

### 错误信息

```text
浅色链接: 3.73:1，要求 >= 4.5:1
```

### 根因分析

浅色模式链接色 `#1c8ca8` 在暖白背景 `#fdf9f3` 上对比度不足，无法达到正文级链接文本推荐的 `4.5:1` 对比度要求。

### 解决方案

将浅色模式链接主色压暗为 `#14748a`，并同步更新对比度检查脚本中的浅色链接基准值。

## 2026-05-06：编辑器样式未通过 Stylelint

### 触发命令

```powershell
npm run lint:css
```

### 错误信息

```text
Expected shorthand property "margin-block"
Expected class selector ".HyperMD-codeblock" to be kebab-case
```

### 根因分析

`_editor.scss` 中标题上下边距使用了可合并的 longhand 写法；同时 Obsidian 内部类名 `.HyperMD-codeblock` 不符合项目启用的 `selector-class-pattern` kebab-case 规则。

### 解决方案

使用 `margin-block` 简写替代上下 longhand，并移除对 `.HyperMD-codeblock` 的直接选择，改为保留对阅读视图 `pre` 的等宽字体设置。
