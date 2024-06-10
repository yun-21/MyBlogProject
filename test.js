let count = 1;
const time = setInterval(()=>{
  console.log(count);
  if(count === 5){
    clearInterval(time);
  }
  count++
},1000)