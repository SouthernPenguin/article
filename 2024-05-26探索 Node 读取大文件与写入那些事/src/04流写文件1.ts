import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

(async () => {
  const filePath = path.resolve(__dirname, 'j.js');
  const writeFilePath = path.resolve(__dirname, 'jCopy.js');

  // 创建读流
  const readerStream = fs.createReadStream(filePath, {
    encoding: 'utf-8',
    highWaterMark: 4028 * 10, // 设置每次读取的大小
  });

  // 创建写流
  const writeStream = fs.createWriteStream(writeFilePath, {
    encoding: 'utf-8',
    flags: 'a+',
    autoClose: true,
  });

  // 创建逐行读取
  const readFileLine = readline.createInterface({
    input: readerStream,
    crlfDelay: Infinity,
  });

  try {
    for await (const line of readFileLine) {
      await new Promise((res) => setTimeout(res, 100));
      writeStream.write(line + '\n');
    }
    console.log('写入完成');
  } catch (error) {
    console.log(error);
  }
})();
