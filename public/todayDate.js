function todayDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let result = year + "-" + month + "-" + day;
  return result;
}
module.exports=todayDate;