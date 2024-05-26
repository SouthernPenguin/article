import * as fs from 'fs';
import * as path from 'path';

(async () => {
  try {
    const filePath = path.resolve(__dirname, 'bigSql.sql');
    const writeFilePath = path.resolve(__dirname, '2024-05-09-write.log');

    // 判断文件是否已经被复制
    if (fs.existsSync(writeFilePath)) {
      console.log('文件已被复制');
      return;
    }

    // 创建读流
    const readStream = fs.createReadStream(filePath, {
      encoding: 'utf8',
      highWaterMark: 1024 * 4, // 设置每次读取的大小
    });

    // 总文件大小
    let originalSqlSize = 0;
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      originalSqlSize = stats.size * 1;
    });

    // 创建写流
    const writeStream = fs.createWriteStream(writeFilePath, {
      encoding: 'utf8',
      flags: 'a+',
      autoClose: true,
    });
    // 进度条
    let str0 = '当前进度写入: ';
    let str02 = '';
    let str03 = '';

    readStream.on('data', async (chunk) => {
      writeStream.write(chunk, async () => {
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
    });

    readStream.on('close', () => {
      writeStream.end();
    });

    writeStream.on('close', () => {
      console.log('\n' + '大文件内容复制完成！');
    });
  } catch (error) {}
})();
