import { promises as fsPromises } from 'fs';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  try {
    // 取个名字
    const newFileName = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}.log`;
    const neFIlePath = path.resolve(__dirname, newFileName);

    // 打开文件
    const fsOpen = await fsPromises.open(neFIlePath, 'a+');
    // 开始写入
    const writeText = { timer: new Date().getTime() };
    fs.write(fsOpen.fd, JSON.stringify(writeText) + '\n', (err) => {
      console.log(err);
    }); // 将新的内容追加到最后面

    // 关闭文件
    await fsOpen.close();
  } catch (error) {
    console.error(error);
  }
})();
