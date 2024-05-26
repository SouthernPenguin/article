import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

(async () => {
  const filePath = path.resolve(__dirname, 'bigSql.sql');

  // 创建读流
  const readerStream = fs.createReadStream(filePath, {
    encoding: 'utf-8',
    highWaterMark: 4028, // 设置每次读取的大小
  });

  // 创建逐行读取
  const readFileLine = readline.createInterface({
    input: readerStream,
    crlfDelay: Infinity,
  });

  for await (const line of readFileLine) {
    // 每个100毫秒打印一次，模拟文件的流动
    await new Promise((res) => setTimeout(res, 100));
    console.log(line);
  }
})();
