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
blogTitle.innerHTML=`<h1 style="marin-top:20px"><a href="../" style="text-decoration:none; color:black;">나만의 블로그</a></h1>`;

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

elementCreate(blogContent, "form", "form", "form");
elementCreate(form, "allInputDiv", "div", "allInputDiv");
elementCreate(allInputDiv, "inTitle", "input", "inTitle");
elementCreate(allInputDiv, "inContent", "textarea", "inContent");
elementCreate(allInputDiv, "buttonDiv", "div", "buttonDiv");
elementCreate(buttonDiv, "insubmit", "input", "insubmit");
elementCreate(buttonDiv, "inreset", "input", "inreset");
const inTitle = document.getElementById("inTitle");
const inContent = document.getElementById("inContent");
const insubmit = document.getElementById("insubmit");
const inreset = document.getElementById("inreset");

allInputDiv.style.display="flex";
allInputDiv.style.flexDirection="column";
allInputDiv.style.alignItems="center";
allInputDiv.style.gap="20px";

form.action='/create';
form.method='post';

inTitle.name="title";
inTitle.type="text";
inTitle.size="60";
inTitle.placeholder="제목을 적어주세요";
inContent.style.height="300px";
inContent.style.width="600px";
inContent.placeholder="내용을 적어주세요";
inContent.name="content";

buttonDiv.style.display="flex";
buttonDiv.style.gap="20px";
insubmit.type="submit";
insubmit.name="submit";
insubmit.value="저장하기";
inreset.type="reset";
inreset.name="reset";
inreset.value="취소하기";
