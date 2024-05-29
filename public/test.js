const fs = require('fs');
const todayDate = require('./todayDate');
const jsonArr = fs.readdir("./public/data",(error,file)=>{
  for(let i=0; i<file.length; i++){
    const jsonData = JSON.parse(fs.readFileSync(`./public/data/${file[i]}`,"utf8"));
    for(let key in jsonData){
      if(key==="title"){
        var a = `<h1>${jsonData[key]}</h1>`;
      }
      else if(key==="content"){
        var b = `<h3>${jsonData[key]}</h3>`;
      }
    }
    const all = a+b;
    console.log(all);
    fs.writeFileSync(`./public/dataHtml/${todayDate()}-data.html`, all, "utf-8");
  }
});
module.exports = jsonArr;