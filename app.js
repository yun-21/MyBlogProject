const http = require('http');
const fs = require('fs');
const todayDate = require("./public/todayDate");

const server = http.createServer((request, response) => {
  if (request.method === 'GET') {
    if (request.url === '/') {
      const main = fs.readFileSync("./public/main.html", "utf8");
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      response.write(main);
      response.end();
    }
    if (request.url === '/mainJs.js') {
      const mainJs = fs.readFileSync("./public/mainJs.js", "utf8");
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
      response.write(mainJs);
      response.end();
    }
    if (request.url === '/mainCss.css') {
      const mainCss = fs.readFileSync("./public/mainCss.css", "utf8");
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/css; charset=utf-8');
      response.write(mainCss);
      response.end();
    }
    if (request.url === '/write.html') {
      const write = fs.readFileSync("./public/write.html", "utf8");
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      response.write(write);
      response.end();
    }
    if (request.url === '/write.js') {
      const write = fs.readFileSync("./public/write.js", "utf8");
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
      response.write(write);
      response.end();
    }
    if (request.url === '/write.css') {
      const write = fs.readFileSync("./public/write.css", "utf8");
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/css; charset=utf-8');
      response.write(write);
      response.end();
    }
    if (request.url === '/writeData.html') {
      const writeData = fs.readFileSync("./public/writeData.html", "utf8");
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      response.write(writeData);
      response.end();
    }
    if (request.url === '/writeData.js') {
      const writeDatajs = fs.readFileSync("./public/writeData.js", "utf8");
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
      response.write(writeDatajs);
      response.end();
    }
  }
  else if (request.method === 'POST') {
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
        let jsonDataString = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync(`./public/data/${todayDate()}-data.json`, jsonDataString, "utf-8");
        // const main = fs.readFileSync("./public/main.html", "utf8");
        // response.write(main);
        var testFolder = "./public/data"
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
              ${filelist.map((file)=>{
                return '<a href="writeData.html"><li>' + file + '</li></a>';
              }).join('')}
            </ul>
            <a href="../">메인화면</a>
          </body>
          </html>`
          // console.log(filelist);
          response.write(htmlcontent);
          response.end();
        });
      });
    }
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