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
        console.log(msg)
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
//连接建立成功时触发此函数
socket.onopen =event=> {
    connectionOpened=true
    console.log('Connection opened');
    // 接收到后端消息时触发
    socket.addEventListener("message", e=> {
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
    document.cookie="token="+token+";SameSite=None;Secure=false"
}


