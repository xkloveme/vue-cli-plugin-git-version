const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PLUGIN_NAME = 'GenBuildInfoWebpackPlugin';

function getNowTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const getBuildInfo = () => {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const command = 'git log -1 --pretty=format:';
  const commandContent = 'git log -3 --pretty=format:%s';

  const name = pkg.name || '-';
  const version = pkg.version || '0.0.0';
  const branch = execSync(`${command}%d`).toString().trim();
  const hash = execSync(`${command}%H`).toString().trim();
  const author = execSync(`${command}%cn`).toString().trim();
  const email = execSync(`${command}%ce`).toString().trim();
  const content = execSync(commandContent).toString().trim();

  return {
    name,
    version,
    branch,
    hash,
    commitUser: `${author} (${email})`,
    commitContent: content,
    time: getNowTime(),
  };
};

class GenBuildInfoWebpackPlugin {
  constructor(opts = {}) {
    const PROJECT_ROOT_DIR = process.cwd();
    const PROJECT_PUBLIC_DIR = path.join(PROJECT_ROOT_DIR, 'public');

    this.opts = {
      fileDir: PROJECT_PUBLIC_DIR,
      fileName: 'version.json',
      ...opts,
    };
  }

  apply(compiler) {
    compiler.hooks.afterPlugins.tap(PLUGIN_NAME, () => {
      const buildInfo = getBuildInfo();

      const { fileDir, fileName } = this.opts;

      fs.writeFileSync(
        path.resolve(fileDir, fileName),
        JSON.stringify(buildInfo, null, 2),
      );
    });
  }
}
// 创建一个工厂函数
function createGenBuildInfoWebpackPlugin(opts = {}) {
  return new GenBuildInfoWebpackPlugin(opts);
}

// 为工厂函数添加 apply 方法
createGenBuildInfoWebpackPlugin.apply = function(compiler) {
  return new GenBuildInfoWebpackPlugin().apply(compiler);
};

// 导出工厂函数作为默认导出和命名导出
module.exports = createGenBuildInfoWebpackPlugin;
module.exports.default = createGenBuildInfoWebpackPlugin;

// 为了向后兼容，保留类的导出
module.exports.GenBuildInfoWebpackPlugin = GenBuildInfoWebpackPlugin;