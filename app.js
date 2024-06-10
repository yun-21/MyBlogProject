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
    else {
      filePath = "./public" + url;
    }
    return decodeURI(filePath);
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

  let filePath = fileUtils.getFilePath(request.url);
  let ext = fileUtils.getFileExtension(filePath);
  let contentType = fileUtils.getContentType(ext);
  if (request.method === 'GET') {
    fs.readFile(filePath, (err, data) => {
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
    });
  }
  else if (request.method === 'POST') {
    // if (request.url === '/create') { //지운 이유 : 메인화면 목록에서 게시물 보기 a태그를 포스트 방식으로 넘겨줬기때문에
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
      fs.readdir("./public/dataHtml", (err, filel) => {
        console.log("Dd")
        if (filel.includes(`${jsonData.title}.html`) === true) {
          console.log("파일있을때")
          const htmlcontent =
            `<h1>이 제목의 파일이 이미 있습니다.</h1><h4><a href="../">돌아가기</a></h4>`
          response.write(htmlcontent);
          response.end();
        }
        else if (filel.includes(`${jsonData.title}.html`) === false) {
          console.log("파일없을때")
          const all = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                </head>
                <body>
                <h1>${jsonData.title}</h1>
                <h3>${jsonData.content}</h3>
                <a href="./../">메인화면</a>
                </body>
                </html>`;

          //메인화면 목록 게시물보기를 누르면 post방식으로 들어오기때문에 제목값이 없다. 그래서 if문으로 null일때를 넣어줌
          if (jsonData.title === null) {
            console.log("메인화면 목록에서 게시물 보기를 눌렀을 경우");
          }
          //글쓰기 화면에서 제목을 작성했다면 들어 올 if문
          else if (jsonData.title.length > 0) {
            //제목에 공백있으면 공백구분으로 잘라서 array에 들어감
            let str = title.split(' ');
            if(str.join('').length!==0){
              //array에 들어간 제목을 구분없이 붙여서 저장한다.
              fs.writeFileSync(`./public/dataHtml/${str.join('')}.html`, all);
            }
            else{
              console.log("제목을 스페이스만 적었을 경우")
            }
          }
          //글쓰기 화면에서 제목을 작성하지 않았다면 null값은 아니고 length=0값이 들어가는 걸 확인. else문으로 파일이 저장되지않게 함
          else {
            console.log('글쓰기화면에서 아무것도 작성하지 않고 저장하기를 눌렀을 경우');
          }
          fs.readdir("./public/dataHtml", (error, filelist) => {
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
              return `<li><a href=./dataHtml/${file}>${path.basename(file, ".html")}<a/></li>`
            }).join('')}
                  </ul>
                  <a href="../">메인화면</a>
                </body>
                </html>`
            response.write(htmlcontent);
            response.end();
          });
        }
      })
    });
  }
  // }
});

server.listen(8080, (error) => {
  if (error) {
    console.error(error);
  }
  else {
    console.log("http://localhost:8080");
  }
});