const GenBuildInfoWebpackPlugin = require('./src/index');
const fs = require('fs');
const path = require('path');

jest.mock('child_process');
jest.mock('fs');

describe('GenBuildInfoWebpackPlugin', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    
    // 模拟 package.json 内容
    fs.readFileSync.mockReturnValue(JSON.stringify({
      name: 'test-project',
      version: '1.0.0'
    }));

    // 模拟 Git 命令输出
    require('child_process').execSync
      .mockReturnValueOnce('master') // branch
      .mockReturnValueOnce('abcdef1234567890') // hash
      .mockReturnValueOnce('John Doe') // author
      .mockReturnValueOnce('john@example.com') // email
      .mockReturnValueOnce('Latest commit message'); // content
  });

  test('生成版本信息文件', () => {
    const plugin = new GenBuildInfoWebpackPlugin();
    const mockCompiler = {
      hooks: {
        afterPlugins: {
          tap: jest.fn((name, callback) => callback()),
        },
      },
    };

    plugin.apply(mockCompiler);

    expect(fs.writeFileSync).toHaveBeenCalled();
    const [filePath, content] = fs.writeFileSync.mock.calls[0];
    expect(filePath).toContain('version.json');
    
    const versionInfo = JSON.parse(content);
    expect(versionInfo).toMatchObject({
      name: 'test-project',
      version: '1.0.0',
      branch: 'master',
      hash: 'abcdef1234567890',
      commitUser: 'John Doe (john@example.com)',
      commitContent: 'Latest commit message',
    });
    expect(versionInfo.time).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });
});