// const fs = require('fs');
const root = document.getElementById("root");
root.style.width="100vw";
root.style.height="100vh";
function elementCreate(parent, elementName, elementType,elementId){
  elementName=document.createElement(elementType);
  parent.appendChild(elementName);
  elementName.id=elementId;
}
elementCreate(root, "blogTitle", "div","blogTitle");
blogTitle.style.textAlign="center";
blogTitle.style.marginTop="20px";
blogTitle.innerHTML=`<h1 style="marin-top:20px"><a href="./" style="text-decoration:none; color:black;">나만의 블로그</a></h1>`;

elementCreate(root, "blogContentDiv", "div","blogContentDiv");
const blogContentDiv = document.getElementById("blogContentDiv");
blogContentDiv.style.height="100%";
blogContentDiv.style.display="grid";
blogContentDiv.style.gridTemplateRows="repeat(4,1fr)"
blogContentDiv.style.gridTemplateColumns="repeat(4,1fr)"
elementCreate(blogContentDiv, "blogContent", "div", "blogContent");
elementCreate(blogContentDiv, "blogleft", "div", "blogleft");
elementCreate(blogContentDiv, "blogright", "div", "blogright");
elementCreate(blogContentDiv, "blogfooter", "div", "blogfooter");

const blogContent = document.getElementById("blogContent");
blogContent.style.display="flex";
blogContent.style.flexDirection="column";
blogContent.style.justifyContent="center";
blogContent.style.alignItems="center";

elementCreate(blogContent, "writePage", "a", "writePage");
writePage.href="write.html";
writePage.innerHTML="글쓰기";

const blogleft = document.getElementById("blogleft");
elementCreate(blogleft, "blogList", "div", "blogList");
elementCreate(blogleft, "blogListContent", "div", "blogListContent");

const blogList = document.getElementById('blogList');
blogList.style.textAlign="center"
blogList.innerHTML="목록"

const blogListContent = document.getElementById('blogListContent');
blogListContent.innerHTML="dd"
blogList.addEventListener('mouseover',()=>{
})

