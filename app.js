const http = require('http');
const fs = require('fs');
const todayDate = require("./public/todayDate");
const path = require('path');

const mimeType = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon; charset=utf-8"
};

const fileUtils = {
  getFilePath: function (url) {
    let filePath;
    if (url === "/") {
      filePath = "./public/main.html";
    }
    else if (url === "./public/dataHtml") {
      filePath = url;
    }
    else if (url === "./create") {
      request.method = "POST";
    }
    else {
      filePath = "./public" + url;
    }
    return filePath;
  },
  getFileExtension: function (filePath) {
    let ext = path.extname(filePath);
    return ext.toLowerCase();
  },
  getContentType: function (ext) {
    if (mimeType.hasOwnProperty(ext)) {
      return mimeType[ext];
    }
    else {
      return "text/plain";
    }
  }
};

const server = http.createServer((request, response) => {
  console.log("URL 요청 데이터:", request.url);
  console.log("URL 요청 메서드:", request.method);

  let filePath = fileUtils.getFilePath(request.url);
  let ext = fileUtils.getFileExtension(filePath);
  let contentType = fileUtils.getContentType(ext);
  fs.readFile(filePath, (err, data) => {
    if (request.url === filePath) {
      if (err) {
        if (err.code === "ENOENT") {
          response.writeHead(404, { "Content-Type": "text/html" });
          response.end("페이지를 찾을 수 없습니다.");
        }
        else {
          response.writeHead(500);
          response.end(`서버 오류: ${err.code}`);
        }
      }
      else {
        response.writeHead(200, { "Content-Type": contentType });
        response.end(data);
      }
    }
  });
  if (request.url === '/create') {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  let body = "";
  request.on('data', (chunk) => {
    body += chunk;
  });
  request.on('end', () => {
    const parseData = new URLSearchParams(body);
    const title = parseData.get("title");
    const content = parseData.get("content");
    const jsonData = {
      title: title,
      content: content
    };
    for (let key in jsonData) {
      if (key === "title") {
        var a = `<h1>${jsonData[key]}</h1>`;
      }
      else if (key === "content") {
        var b = `<h3>${jsonData[key]}</h3>`;
      }
    }
    const all = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            </head>
            <body>
            ${a + b}
            <a href="../">메인화면</a>
            </body>
            </html>`;
    console.log(all);
    fs.writeFileSync(`./public/dataHtml/${todayDate()}-data.html`, all, "utf-8");
    var testFolder = "./public/dataHtml";
    fs.readdir(testFolder, function (error, filelist) {
      const htmlcontent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          </head>
          <body>
            <ul>
              ${filelist.map((file) => {
        console.log(file);
        return `<li><a href=./dataHtml/${file}>${path.basename(file, ".html")}<a/></li>`
      }).join('')}
            </ul>
            <a href="../">메인화면</a>
          </body>
          </html>`
      response.write(htmlcontent);
      response.end();
    });
  });
}
});

server.listen(8080, (error) => {
  if (error) {
    console.error(error);
  }
  else {
    console.log("http://localhost:8080");
  }
});