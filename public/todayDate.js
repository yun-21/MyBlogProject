function todayDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  let result = year + "-" + month + "-" + day + "-" + hour + "-" + min + "-" + sec;
  return result;
}
module.exports=todayDate;