const username=parseCookie("username")
const token=parseCookie("token")
//如果用户从有过数据，直接跳转至登录
if(username==undefined||token==undefined)location.href="login.html"
function queryServerStatus(){
    console.log("请求")
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
    for(let server_status of status){
        if(server_status.name=="1qu")document.getElementById("1qu_status").innerHTML=server_status.status
        if(server_status.name=="2qu")document.getElementById("2qu_status").innerHTML=server_status.status
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