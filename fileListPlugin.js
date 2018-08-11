/* eslint-disable */
class FileListPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
      // 在生成文件中，创建一个头部字符串：
      let filelist = 'In this build:\n\n';

      // 遍历所有编译过的资源文件，
      // 对于每个文件名称，都添加一行内容。
      for (const filename in compilation.assets) {
        filelist += (`- ${filename}\n`);
      }
      let oldHtml = compilation.assets['index.html'].source();
      const newHtml = oldHtml.replace(/\n/g,'');
      compilation.assets['index.html'] = {
          source() {
            return newHtml;
          },
          size() {
            return newHtml.length;
          }
      }
      
      
      // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
      compilation.assets['filelist.md'] = {
        source() {
          return filelist;
        },
        size() {
          return filelist.length;
        },
      };

      callback();
    });
  }
}

module.exports = FileListPlugin;
