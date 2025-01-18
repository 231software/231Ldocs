const username=parseCookie("username")
const token=parseCookie("token")
//如果用户从有过数据，直接跳转至登录
if(username==undefined||token==undefined)location.href="login.html"
function queryServerStatus(){
    sendData(JSON.stringify({
        username,
        token,
        type:"server_status"
    }))
}
//页面加载时立即请求一次服务器状态
ServerEvents.onWSOpen=event=>{
    queryServerStatus()
}
setInterval(queryServerStatus,6000)
ServerEvents.onServerStatus=msg=>{
    const {status}=msg
    for(let server_name of Object.keys(status)){
        if(server_name=="1qu")document.getElementById("1qu_status").innerHTML=serverStatusToString(status[server_name])
        if(server_name=="2qu")document.getElementById("2qu_status").innerHTML=serverStatusToString(status[server_name])
    }
    
}
function startServer(server_name){
    sendData(JSON.stringify({
        username,
        token,
        type:"start_server",
        server_name
    }))
    //向服务器密集发送几次请求
    const fastQueryServerStatus=setInterval(()=>{queryServerStatus()},900)
    //请求几次后再停止
    setTimeout(()=>{clearInterval(fastQueryServerStatus)},5600)
}
function serverStatusToString(status){
    switch(status){
        case 0:return "正在运行"
        case 1:return "正在休眠"
        case 2:return "离线"
    }
}