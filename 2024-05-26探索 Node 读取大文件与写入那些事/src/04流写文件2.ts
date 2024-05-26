import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

(async () => {
  try {
    const filePath = path.resolve(__dirname, 'j.js');
    const writeFilePath = path.resolve(__dirname, 'jCopy.js');

    // 判断文件是否已经被复制
    if (fs.existsSync(writeFilePath)) {
      console.log('文件已被复制');
      return;
    }
    // 创建读流
    const readerStream = fs.createReadStream(filePath, {
      encoding: 'utf-8',
      highWaterMark: 4028 * 10, // 设置每次读取的大小
    });

    // 创建写流
    const writeStream = fs.createWriteStream(writeFilePath, {
      encoding: 'utf-8',
      flags: 'a+',
    });

    // 创建逐行读取
    const readFileLine = readline.createInterface({
      input: readerStream,
      crlfDelay: Infinity,
    });

    // 原文件大小
    let originalSqlSize = 0;
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      originalSqlSize = stats.size * 1;
    });

    // 进度条
    let str0 = '当前进度写入: ';
    let str02 = '';
    let str03 = '';

    // 记录写入完成没
    let isWriteEnd = false;

    readFileLine.on('close', () => {
      console.log('正在写入');
    });

    for await (const line of readFileLine) {
      await new Promise((res) => setTimeout(res, 100));
      isWriteEnd = writeStream.write(line + '\n', () => {
        fs.stat(writeFilePath, async (err, stats) => {
          if (err) {
            console.error(err);
            return;
          }
          let progress = (((stats.size * 1) / originalSqlSize) * 100).toFixed(12).toString();
          let progressInt = Math.floor(Number(progress));

          // 防止进度过长
          if (progressInt % 2 === 0) {
            str03 = str0 + str02 + '=> ' + progress + '%';
            await new Promise((res) => setTimeout(res, 500));
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            str02 = '='.repeat(progressInt / 2);
            //不换行打印
            process.stdout.write(str03);
          }
        });
      });
    }

    if (isWriteEnd) {
      // 当所有行都处理完毕，结束写入流
      writeStream.end();
    }

    writeStream.on('close', () => {
      console.log('\n' + '大文件内容复制完成！');
    });
  } catch (error) {
    console.log(error);
  }
})();
