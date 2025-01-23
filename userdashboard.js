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
//收到服务器发来的服务器状态列表
ServerEvents.onServerStatus=msg=>{
    const {status}=msg
    const html_container=document.getElementById("server_status_container")
    for(let server_name of Object.keys(status)){
        const server_status=status[server_name]
        const {result,online,name}=server_status
        const server_started_status_indicator=document.getElementById(server_name+"_status")
        //初始化服务器列表HTML
        if(server_started_status_indicator==null){
            const server_indicator=document.createElement("p")
            server_indicator.style.display="inline"
            server_indicator.innerHTML=name+"：<span id=\""+server_name+"_status\">加载中</span>     "
            const start_button=document.createElement("button")
            start_button.innerHTML="点击开服"
            start_button.onclick=()=>startServer(server_name)
            html_container.appendChild(server_indicator)
            html_container.appendChild(start_button)
            html_container.appendChild(document.createElement("br"))
        }
        //添加好对应元素后，删除原来的占位符
        const oldPlaceholder=document.getElementById("wait_response_placeholder")
        if(oldPlaceholder)oldPlaceholder.parentNode.removeChild(oldPlaceholder)
        //等待DOM更新并更新服务器状态对应指示器
        waitForDedicatedDOMElement(server_name+"_status").then(elementWaitedFor=>{
            elementWaitedFor.innerHTML=serverStatusToString(result)
        })
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
async function waitForDedicatedDOMElement(id){
    let targetElement=document.getElementById(id)
    while(targetElement==null){
        //获取元素失败的话，就等待一会再次获取
        await new Promise(resolve=>setTimeout(resolve,100))
        targetElement=document.getElementById(id)
    }
    return targetElement
}
/*
<div class="server-status">
    <p>服务器一区：<span id="1qu_status">等待服务器响应</span></p>
    <button onclick="startServer('1qu')">点击开服</button>
</div>
<div class="server-status">
    <p>服务器二区：<span id="2qu_status">等待服务器响应</span></p>
    <button onclick="startServer('2qu')">点击开服</button>
</div>
*/