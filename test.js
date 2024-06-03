const jsonData = [
    "제목이",
    "내용이"
];

const array =[]
jsonData.forEach((element,index) => {
    if (index === 0){
        array.push(`<h1>${element}</h1>`)
    } 
    else if(index === 1){
        array.push(`<h3>${element}</h3>`)
    }
});
console.log(array);

