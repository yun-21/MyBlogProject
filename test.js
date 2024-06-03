const jsonData = {
    title: "제목이",
    content: "내용이"
};
function check(jsonData){
    for (let key in jsonData) {
        if (key === "title") {
            const a = `<h1>${jsonData[key]}</h1>`;
            return a
        }
        else if (key === "content") {
            const b = `<h3>${jsonData[key]}</h3>`;
            return b
        }
    }
}
console.log(check(jsonData))