//Node.js에 기본 내장되어 있는 모듈을 로드하였다.
const http = require('http'); //웹 브라우저의 요청을 처리할 수 있게 해주는 모듈
const fs = require('fs');
const path = require('path');


//확장자 타입을 구분하여 content-Type을 객체로 작성했다.
const mimeType = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon; charset=utf-8"
};

//파일경로, 파일 확장자, mimeType지정 함수들을 객체로 지정해줌. 
const fileUtils = {
  getFilePath: function (url) {
    let filePath;
    if (url === "/") {
      filePath = "./public/main.html";
    }
    else {
      filePath = "./public" + url;
    }
    //파일요청이 들어오면 디코딩해서 return해준다.
    return decodeURI(filePath);
  },
  getFileExtension: function (filePath) {
    //path.extname()메서드는 파일 경로의 확장자 부분을 가져온다. (.html)
    let ext = path.extname(filePath);
    //확장자부분을 소문자로 변환하여 return
    return ext.toLowerCase();
  },
  getContentType: function (ext) {
    //확장자가 mimeType이 있다면(ture)
    if (mimeType.hasOwnProperty(ext)) {
      //확장자키값을 return해준다.
      return mimeType[ext];
    }
    //확장자가 mimeType이 없다면(false)
    else {
      //메모장처럼 기본 문자열만 출력되는 Content-Type을 return해준다.
      return "text/plain";
    }
  }
};

//서버를 만드는 함수로 server변수에 할당. 사용자가 요청한 정보를 담는 곳은 request, 사용자의 요청을 응답해 줄 정보를 담는 곳은 response
const server = http.createServer((request, response) => {
  console.log("URL 요청 데이터:", request.url);
  //fileUtils객체안의 파일경로함수이고 매개변수로는 요청url를 넣어주고 디코딩된 파일경로를 filePath변수에 할당했다.
  let filePath = fileUtils.getFilePath(request.url);
  //fileUtils객체안의 파일확장자함수이고 매개변수로는 디코딩된 파일경로를 가져와 확장자만 잘라내 ext변수에 할당했다.
  let ext = fileUtils.getFileExtension(filePath);
  //fileUtils객체안의 Content-Type지정함수이고 매개변수로는 확장자가 들어있는 변수이고 확장자가 mimeType객체안에 있다면 content-Type값을 가져온 데이터를 contentType변수에 할당
  let contentType = fileUtils.getContentType(ext);
  //요청 메서드가 get일때
  if (request.method === 'GET') {
    //파일경로를 읽는 filePath와 콜백함수를 인수로 지정. => readFile은 비동기식으로 동작함으로 콜백함수로 메서드 결과를 받는다. 에러라면 콜백함수 첫 번째 파라미터를 통해 에러 내용을 확인할 수 있다. 데이터를 성공적으로 가져왔다면 두 번째 파라미터를 통해 파일내용을 읽어올 수 있다.
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          //응답에 대한 정보를 기록하는 메서드이다. 파일을 찾지 못했을 때 404응답 코드인수와 응답에 대한 정보를 보내는데 콘텐츠의 형식이 HTML임을 알리는 인수
          response.writeHead(404, { "Content-Type": "text/html" });
          //페이지를 찾을 수 없다는 글을 보낸 후 응답을 종료하는 메서드
          response.end("페이지를 찾을 수 없습니다.");
        }
        else {
          //예외적인 또는 예측하지 못한 에러 500응답 코드인수
          response.writeHead(500);
          //에러코드를 클라이언트로 보낸 후 응답을 종료.
          response.end(`서버 오류: ${err.code}`);
        }
      }
      else {
        //성공적인 요청임을 의미하는 200코드와
        //Content-Type함수에서 return 되는 값을 넣어준 인수
        response.writeHead(200, { "Content-Type": contentType });
        //(파일 읽기에 성공하면 매개변수'data'로 파일내용이 전달된다) 파일 내용을 클라이언트로 보낸 후 응답을 종료
        response.end(data);
      }
    });
  }
  //요청 메서드가 post일때
  else if (request.method === 'POST') {
    // if (request.url === '/create') { //지운 이유 : 메인화면 목록에서 게시물 보기 a태그를 포스트 방식으로 넘겨줘서 /create가 있다면 a태그는 post를 들어올 수 없음.

    //클라이언트 성공적인 HTTP요청에 대한 서버의 상태 응답 코드이다.
    response.statusCode = 200;
    //Http응답 헤더를 설정하여 응답 본문에 반환되는 content가 "text/html유형이고 UTF-8문자 인코딩으로 지정한다."
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    //post 데이터를 body에 받아오기 위해 먼저 초기화를 해준다.
    let body = "";
    //request.on을 이용해서 HTTP요청과 관련된 이벤트가 발생했을 때 이벤트를 어떻게 처리할 것인지 정할 수 있다
    //request.on은 두개의 인자를 받는데 하나는 이벤트 이름, 하나는 지정된 이벤트가 발생하였을 때 실행할 콜백함수이다.
    //data는 데이터를 수신할 때 실행할 이벤트
    request.on('data', (data) => {
      body += data;
    });
    //end는 클라이언트로부터 모든 데이터를 수신 완료했을 때 실행할 이벤트
    request.on('end', () => {
      //URL API에서 제공하는 URLSearchParams
      //이름-값 문자열 쌍의 리터럴 시퀀스 또는 문자열 쌍 시퀀스를 생성하는 반복기가 있는 객체입니다.
      //console에 찍어보면 URLSearchParams { 'title' => 'asdasd', 'content' => 'adsdsa', 'submit' => '저장하기' } 이렇게 키와 값으로 되어있는 객체로 나옵니다.
      const parseData = new URLSearchParams(body);
      //.get()은 첫 번째 값만 반환합니다. .getAll()메서드도 있는데 이는 모든 값을 배열로 반환합니다.
      const title = parseData.get("title");
      const content = parseData.get("content");
      //괜히 객체를 하나 만들어줬습니다.
      const jsonData = {
        title: title,
        content: content
      };
      //callback 함수를 사용하기 위해서 비동기 처리로 디렉터리를 읽었습니다.
      fs.readdir("./public/dataHtml", (err, filel) => {
        //./public/dataHtml 폴더 안의 파일 중에 title.html가 있을때 true값이면
        //includes메서드는 배열 항목 중 특정 값을 포함하는지 boolean으로 표시해줍니다.
        if (filel.includes(`${jsonData.title}.html`) === true) {
          //html을 작성한 템플릿 리터럴을 htmlcontent라는 변수에 할당해줍니다.
          const htmlcontent =
            `<h1>이 제목의 파일이 이미 있습니다.</h1><h4><a href="../">돌아가기</a></h4>`
          //htmlcontent를 클라이언트에 보내줍니다.
          response.write(htmlcontent);
          //응답 후 종료해줍니다.
          response.end();
        }
        //특정한 파일이 없다면 들어오는 곳입니다.
        else if (filel.includes(`${jsonData.title}.html`) === false) {
          //제목과 내용을 작성한 템플릿 리터럴을 all이라는 변수에 할당해줬습니다.
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

          //메인화면(main.html) 목록 -> 게시물보기를 누르면 post방식으로 들어오기때문에 제목 값이 없다. 그래서 if문으로 null일때를 넣어줌
          //(이를 만들어 주지 않으면 제목없는 파일을 하나 생성한다.)
          if (jsonData.title === null) {
            console.log("메인화면 목록에서 게시물 보기를 눌렀을 경우");
          }
          //글쓰기 화면에서 제목을 작성했다면 들어 올 if문
          else if (jsonData.title.length > 0) {
            //제목에 공백있으면 공백구분으로 잘라서 array에 들어감
            //공백구분으로 잘라서 str변수에 할당한 이유는 제목을 공백으로만 만들어 놓을 수도 있었기때문이다. => 이렇게 하면 공백 제목이 만들어지지 않는다.
            let str = title.split(' ');
            if (str.join('').length !== 0) {
              //array에 들어간 제목을 구분없이 붙여서 저장한다.
              fs.writeFileSync(`./public/dataHtml/${str.join('')}.html`, all);
            }
            else {
              console.log("제목을 스페이스바만 눌렀을 경우")
            }
          }
          //글쓰기 화면에서 제목을 작성하지 않았다면 null값은 아니고 length=0값이 들어가는 걸 확인. else문으로 파일이 저장되지않게 함
          else {
            console.log('글쓰기화면에서 아무것도 작성하지 않고 저장하기를 눌렀을 경우');
          }

          //왜 또 readdir를 내부에 사용했냐면 이를 사용하지 않고 외부 콜백함수를 사용하니까
          //파일이 바로 생성되지않아서 새로고침을 하거나(새로고침을 하면 똑같은 파일이 하나 더 생성됐었음 
          //=> 위에서 똑같은 파일이 생성 됐을 경우의 템플릿리터럴을 만들어둬서 그 html이 보이게됨)
          //또는 메인화면 갔다가 다시 돌아와야하는 일이 발생한다.
          fs.readdir("./public/dataHtml", (error, filelist) => {
            //만들어진 파일들을 순회하며 각각의 파일들이 <li>태그 안에 들어가서 만들어지도록 하였다.
            //path.basename은 상위 경로를 제외한 파일명만 반환합니다.
            //path.basename의 두번째 인자로 .을 포함한 확장자를 작성하면 순수 파일이름만 얻을 수 있습니다.
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
            //데이터(청크) 단위로 클라이언트에 데이터를 보낼 때 사용합니다.
            //여러 번 반복해서 보낼 수 있습니다.
            response.write(htmlcontent);
            //HTTP 응답의 종료 또는 클라이언트에게 데이터를 보내고 종료 할 때 사용한다.
            //한 번에 데이터를 보내고 통신을 종료하기 때문에 한 번만 호출할 수 있다.
            response.end();
          });
        }
      })
    });
  }
  // }
});
//HTTP응답 헤더를 설정하기 위해서 setHeader와 writeHead를 사용할 수 있습니다.
//setHeader는 한 번에 하나의 HTTP 응답 헤더를 설정할 수 있습니다. setHeader와 더불어 상태 코드를 설정할 때 res.statusCode=200을 사용합니다.
//writeHead는 한 번에 응답에 대한 상태코드와 헤더를 설정할 수 있습니다. 다만 HTTP 서버 응답 시 한 번만 사용 가능합니다.
//부가적으로 HTTP 헤더 설정이 필요한 경우 setHeader를 사용해야 합니다.

//컴퓨터의 포트 8080에서 수신 대기하는 서버를 만들었습니다.
server.listen(8080, (error) => {
  if (error) {
    console.error(error);
  }
  else {
    console.log("http://localhost:8080");
  }
});
