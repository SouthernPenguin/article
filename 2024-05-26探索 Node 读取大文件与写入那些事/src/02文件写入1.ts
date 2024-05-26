import { promises as fs } from 'fs';
import * as path from 'path';

(async () => {
  try {
    // 取个名字
    const newFileName = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}.log`;
    const neFIlePath = path.resolve(__dirname, newFileName);

    // 打开文件
    const fsOpen = await fs.open(neFIlePath, 'a+');

    // 开始写入
    const writeText = { timer: new Date().getTime() };
    // await fs.writeFile(neFIlePath, JSON.stringify(writeText) + '\n'); // 覆盖之前的写入
    await fs.appendFile(neFIlePath, JSON.stringify(writeText) + '\n'); // 将新的内容追加到最后面

    // 关闭文件
    await fsOpen.close();
  } catch (error) {
    console.error(error);
  }
})();
