好的，我会为您优化 README 文件，并说明如何在 Vue CLI 项目中使用这个插件。以下是修改后的 README 内容：

# vue-cli-plugin-git-version

[![version][npm-img]][npm-url]
[![license][mit-img]][mit-url]
[![size][size-img]][size-url]
[![download][download-img]][download-url]

为 Vue CLI 项目生成 version.json 文件，包含项目版本和 Git 信息。

## 安装

```sh
# 使用 npm
npm install -D vue-cli-plugin-git-version

# 使用 yarn
yarn add -D vue-cli-plugin-git-version

# 使用 pnpm
pnpm add -D vue-cli-plugin-git-version
```

## 使用方法

### Vue CLI 项目

在您的 Vue CLI 项目的 `vue.config.js` 文件中添加以下配置：

```javascript
const GenBuildInfoWebpackPlugin = require('vue-cli-plugin-git-version');

module.exports = {
  configureWebpack: {
    plugins: [
      new GenBuildInfoWebpackPlugin()
    ]
  }
}
```

这将在构建过程中自动生成 `version.json` 文件。

### 自定义选项

您可以自定义输出文件的目录和文件名：

```javascript
new GenBuildInfoWebpackPlugin({
  fileDir: 'path/to/custom/directory',
  fileName: 'custom-version.json'
})
```

## 输出示例

生成的 `version.json` 文件内容示例：

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "branch": "main",
  "hash": "abcdef1234567890",
  "commitUser": "John Doe (john@example.com)",
  "commitContent": "Latest commit message",
  "time": "2023-04-10 15:30:45"
}
```

## 在项目中使用生成的信息

您可以在项目中读取生成的 `version.json` 文件来使用这些信息：

```javascript
import versionInfo from 'public/version.json';

console.log('当前版本:', versionInfo.version);
console.log('构建时间:', versionInfo.time);
```

## 许可证

MIT © [Jason Feng][author-url]

<!-- badges -->

[author-url]: https://github.com/xkloveme

[mit-img]: https://img.shields.io/npm/l/vue-cli-plugin-git-version.svg?style=flat&colorA=000000&colorB=000000
[mit-url]: ./LICENSE

[npm-img]: https://img.shields.io/npm/v/vue-cli-plugin-git-version?style=flat&colorA=000000&colorB=000000
[npm-url]: https://www.npmjs.com/package/vue-cli-plugin-git-version

[size-img]: https://img.shields.io/bundlephobia/minzip/vue-cli-plugin-git-version?label=bundle&style=flat&colorA=000000&colorB=000000
[size-url]: https://www.npmjs.com/package/vue-cli-plugin-git-version

[download-img]: https://img.shields.io/npm/dt/vue-cli-plugin-git-version.svg?style=flat&colorA=000000&colorB=000000
[download-url]: https://www.npmjs.com/package/vue-cli-plugin-git-version

[build-img]: https://github.com/SolidZORO/vue-cli-plugin-git-version/workflows/badge.svg
[build-url]: https://github.com/SolidZORO/vue-cli-plugin-git-version/actions
```
