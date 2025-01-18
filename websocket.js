const server_address='wss://frp-now.top:34939'
let socket = new WebSocket(server_address);

let connectionOpened=false


class ServerEvents{
    static onLoginResult=(msg)=>{}
    static onWSOpen=(event)=>{}
    static onServerStatus=msg=>{}
    static onErrorMsg=msg=>{
        switch(msg.error){
            //未登录会导致跳转至登录界面
            case "user_not_logged_in":location.href="login.html";break;
        }
    }
    static serverMsgHandler(msg){
        const {type}=msg
        switch(type){
            //服务端发来了登录结果
            case "login_result":{
                ServerEvents.onLoginResult(msg)
                break;
            }
            case "server_status":{
                ServerEvents.onServerStatus(msg)
                break;
            }
            case "error":{
                ServerEvents.onErrorMsg(msg)
            }
        }        
    }
}
socket.onerror=event=>{
    console.log("无法连接")
    console.log(event) 
    console.log('Error type:', event.type); 
    console.log('WebSocket state:', event.target.readyState);
    showBrowserCertificateBlockedPopup()
    /*
    checkIPv6().then(result =>{
        if(result){
            alert("当前无法连接到服务器。如果正在使用代理（例如梯子），请关闭代理后再试，如果仍然无法连接服务器，请联系管理员。")
        }
        else{
            alert("当前网络环境不支持ipv6，请换用手机流量访问本站，然后再试一次")
        }
    });
    */
}
//连接建立成功时触发此函数
socket.onopen =event=> {
    connectionOpened=true
    console.log('Connection opened');
    //alert("websocket成功，连接已建立")
    // 接收到后端消息时触发
    socket.addEventListener("message", e=> {
        if(new RegExp(/username/).test(e.data.toString()))alert(e.data)
        let parsedResult={}
        try{
            parsedResult=JSON.parse(e.data)
        }
        catch(e){
            console.log("服务器发送了破损的数据："+e)
            return
        }
        ServerEvents.serverMsgHandler(parsedResult)
    });
    ServerEvents.onWSOpen(event)
};
/*
{
    "token":"1919810",
    "type":"auth",
    "username":"Minimouse48",
    "password":"1*minimouse*1"
}
{
    "token":"1919810",
    "type":"start_server",
    "username":"Minimouse48",
    "server_name":"2qu"
}
*/
function sendData(data){
    if(!connectionOpened){
        console.error("发送"+data+"时websocket还没有建立连接")
        return
    }
    try{
        const parsedData=JSON.parse(data)
        if(typeof parsedData!="object")throw new Error("发送的数据不是对象")
    }
    catch(e){
        console.error("json解析错误："+e)
        return
    }
    socket.send(data)    
}

// 在浏览器中使用简单的随机数生成器
function generateToken() {
    return 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function submitRawJSON(){
    const rawStr=document.getElementById("sendRawJSON").value
    sendData(rawStr)
}
//当没有token时生成token
if(parseCookie("token")==undefined){
    const token=generateToken()
    document.cookie="token="+token+"; SameSite=Lax;"
}

async function checkIPv6() {
    try {
        const response = await fetch('https://6.ipw.cn');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const ipv6Address = await response.text();
        
        // 这里假设返回的内容是一个有效的IPv6地址，可以根据需要进一步验证地址格式
        const ipv6Pattern = /^[0-9a-fA-F:]{2,39}$/;
        return ipv6Pattern.test(ipv6Address);

    } catch (error) {
        //console.error('Error fetching IPv6 address:', error);
        return false;
    }
}
async function checkTarget() {
    try {
        const response = await fetch(server_address.replace("wss","https"));
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.text();
        console.log(result)
        return true

    } catch (error) {
        //console.error('Error fetching IPv6 address:', error);
        return false;
    }
}
function isSafari() { 
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent); 
}
// if (isSafari()) { 
    //alert('本站暂不支持safari，请使用其他浏览器访问'); 
// }
// 使用函数


function showBrowserCertificateBlockedPopup(){
    // 创建遮罩层
    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'none';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    document.body.appendChild(overlay);

    // 创建浮窗
    var popup = document.createElement('div');
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '20px';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    popup.style.position = 'relative';
    overlay.appendChild(popup);

    // 创建关闭按钮
    // var closeButton = document.createElement('span');
    // closeButton.innerHTML = '×';
    // closeButton.style.position = 'absolute';
    // closeButton.style.top = '10px';
    // closeButton.style.right = '10px';
    // closeButton.style.cursor = 'pointer';
    // closeButton.onclick = function() {
    //     overlay.style.display = 'none';
    // };
    // popup.appendChild(closeButton);

    // 添加浮窗内容
    var popupContent = document.createElement('div');
    popupContent.innerHTML = `无法连接至服务器，这可能是您的网页设置有问题，或服务器网络出现问题<br>
请进入这个网页：<a href='https://frp-now.top:34939'>https://frp-now.top:34939</a><br>
跳转之后，如果一直完全打不开，证明服务器出现问题<br>
如果显示当前网页有安全风险，证书无效过期等，无视风险继续访问，这个危险仅仅是警告网站的内容没有加密<br>
如果加载成功，但是左上角只有一行不起眼的小字Upgrade Required，证明一切正常，返回本站刷新页面即可<br>
如果都显示出了Upgrade Required但是还是有此弹窗，证明是网站源代码有bug，请加群716834424，说明你遇到的问题来寻求帮助<br>
`;
    popup.appendChild(popupContent);

    // 显示浮窗
    overlay.style.display = 'flex';

}