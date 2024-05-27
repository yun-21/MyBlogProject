const http = require('http');
const fs = require('fs');

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
        const jsonDataString = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync("./public/data.json", jsonDataString);
        const dataJson = fs.readFileSync("./public/data.json");
        const parseDataJson = JSON.parse(dataJson);
        const array=[];
        for(let key in parseDataJson){
          array.push(parseDataJson[key]);
        }
        response.write(JSON.stringify(array));
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