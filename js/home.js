console.error("我是home页")

var userId ;

getUser();
// 获取页面的dom节点写入userId
document.getElementById("name").innerText=userId;
document.getElementById("status").innerText=userId;
// document.getElementsByTagName("status").innerText=userId;


function getUser() {
    console.error("获取本地localStorage")
    var user = localStorage.getItem("user");
    userObj = JSON.parse(user);
    userId = userObj.UserId;
    console.log(userId);
}