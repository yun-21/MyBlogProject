// const fs = require('fs');
const root = document.getElementById("root");
root.style.width = "100vw";
root.style.height = "100vh";
function elementCreate(parent, elementName, elementType, elementId) {
  elementName = document.createElement(elementType);
  parent.appendChild(elementName);
  elementName.id = elementId;
}
elementCreate(root, "blogTitle", "div", "blogTitle");
blogTitle.style.textAlign = "center";
blogTitle.style.marginTop = "20px";
blogTitle.innerHTML = `<h1 style="marin-top:20px"><a href="./" style="text-decoration:none; color:black;">나만의 블로그</a></h1>`;

elementCreate(root, "blogContentDiv", "div", "blogContentDiv");
const blogContentDiv = document.getElementById("blogContentDiv");
blogContentDiv.style.height = "100%";
blogContentDiv.style.display = "grid";
blogContentDiv.style.gridTemplateRows = "repeat(4,1fr)"
blogContentDiv.style.gridTemplateColumns = "repeat(4,1fr)"
elementCreate(blogContentDiv, "blogContent", "div", "blogContent");
elementCreate(blogContentDiv, "blogleft", "div", "blogleft");
elementCreate(blogContentDiv, "blogright", "div", "blogright");
elementCreate(blogContentDiv, "blogfooter", "div", "blogfooter");

const blogContent = document.getElementById("blogContent");
blogContent.style.display = "flex";
blogContent.style.flexDirection = "column";
blogContent.style.justifyContent = "center";
blogContent.style.alignItems = "center";

elementCreate(blogContent, "writePage", "a", "writePage");
writePage.href = "write.html";
writePage.innerHTML = "글쓰기";

const blogleft = document.getElementById("blogleft");
elementCreate(blogleft, "blogList", "div", "blogList");
elementCreate(blogleft, "blogListContent", "div", "blogListContent");

const blogList = document.getElementById('blogList');
blogList.style.textAlign = "center"
blogList.innerHTML = "목록"

//Post방식으로 페이지 이동할 수 있는 함수
function goPost(){
  //폼태그를 만들어줬음
  let form=document.createElement('form');
  blogListContent.appendChild(form);
  form.method='post';
  //submit()메서드는 동적으로 폼을 생성하고 서버에 보내고자 할 때 사용합니다.
  form.submit();
}

const blogListContent = document.getElementById('blogListContent');
//자바스크립트 함수호출을 통해 POST방식으로 페이지 이동하는 방법.
blogListContent.innerHTML = "<li><a href='javascript:goPost();'>게시물 보기</a></li><li><a href='write.html'>글 쓰기</a></li>"
blogListContent.style.position = "absolute"
blogListContent.style.left = "-120px";

let count = 0;
blogList.addEventListener('click', () => {
  if (count === 0) {
    const a = setInterval(() => {
      blogListContent.style.left = count + "px";
      count++
      if (count === 100) {
        clearInterval(a)
      }
    }, 0)
  }
  else if(count === 100){
    const a = setInterval(() => {
      blogListContent.style.left = count + "px";
      count--
      if (count === -120) {
        clearInterval(a)
        count = 0;
      }
    }, 0)
  }
})
// blogList.addEventListener('mouseout',()=>{
//   const b = setInterval(()=>{
//     blogListContent.style.left="-10px";
//     if(count==='-10px'){
//       clearInterval(b)
//     }
//   },0)
// })

