function createXHR() {
    console.log("serve.js");
    // IE7+,Firefox, Opera, Chrome ,Safari
    if (typeof XMLHttpRequest != "undefined") {
        return xhr = new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        //IE6
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXMLHttp"],
                i, len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    alert("请升级浏览器版本");
                }
            }
        }
        return arguments.callee.activeXString;
    } else {
        throw new Error("XHR对象不可用！");
    }
}

// 定义xhr对象的请求响应事件
var xhr = createXHR();
xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
        case 0:
            console.error("请求未初始化!");
            break;
        case 1:
            console.error("请求启动，尚未发送!");
            break;
        case 2:
            console.error("请求发送，尚未得到响应!");
            break;
        case 3:
            console.error("请求开始响应，收到部分数据!");
            break;
        case 4:
            console.error("请求响应完成得到全部数据!");
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                data = xhr.responseText;
                console.error(data);
            } else {
                console.error("请求失败 : " + xhr.status + " " + xhr.statusText)
            }
            break;
    }
};
// 请求API
function gotohome() {
    console.log("+++++++gotohome++++++++");
    var url = 'https://imoocqa.gugujiankong.com/api/account/login';
    // 获取前台输入内容
    var mobval = getId("mobile");
    var pasval = getId("password");
    url = urlParam(url, "mobile", mobval);
    url = urlParam(url, "password", pasval);
    xhr.open("get", url, true);
    xhr.send(null);

    storage();

    // 跳转页面
    function storage() {
        // data = xhr.responseText;
        // alert(data);
        // 存储返回数据 data
        setTimeout(() => {
            // alert(data);
            // let data = JSON.parse(data);
            localStorage.setItem("user", JSON.parse(data));
            // 获取本地user
            let getUser = localStorage.getItem("user");
            // console.log(JSON.parse(JSON.parse(getUser)));
            let userObj = JSON.parse(getUser);
            if(userObj.Status === "OK"){
                location.href = "../pages/home.html";    
            }else {
                throw userSto.StatusContent;
            }
        }, 2000);
    }

    // 获取id的工厂
    function getId(d) {
        var getid = document.getElementById(d).value;
        console.log("getId= " + getid)
        return getid;
    }

    //整合请求URL（参数）
    function urlParam(url, name, value) {
        url += (url.indexOf('?') == -1) ? '?' : '&';
        url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        return url;
    }
}