import { promises as fs } from 'fs';
import * as path from 'path';

// 读取文件
(async () => {
  const filePath = path.resolve(__dirname, '2024-05-09.log');
  const readFileDate = await fs.readFile(filePath, 'utf-8').catch((err: NodeJS.ErrnoException) => console.log(err));
  console.log(readFileDate);
})();
