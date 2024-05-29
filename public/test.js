const fs = require('fs');
const jsonArr = fs.readdir("./public/data",(error,file)=>{
  for(let i=0; i<file.length; i++){
    const jsonData = JSON.parse(fs.readFileSync(`./public/data/${file[i]}`,"utf8"));
    console.log(jsonData);
    for(let key in jsonData){
      if(key==="title"){
        console.log(`<h1>${jsonData[key]}</h1>`);
      }
      else if(key==="content"){
        console.log(`<h3>${jsonData[key]}</h3>`);
      }
    }
  }
});
