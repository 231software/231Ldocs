ServerEvents.onLoginResult=(parsedResult)=>{
    if(parsedResult.result===true){
        location.href="userdashboard.html"
    }
    else if(parsedResult.result===false){
        try{
            alert("登录失败")
        }
        catch(e){}
    }
    else{
        console.error("服务端发送了无效的登录结果："+parsedResult)
    }
}
function login(){
    const username=document.getElementById("username").value
    const password=document.getElementById("password").value
    const token=parseCookie("token")
    document.cookie="username="+username+";SameSite=None;Secure=false"
    document.cookie="password="+password+";SameSite=None;Secure=false"
    sendData(JSON.stringify({
        username,
        password,
        token,
        type:"auth"
    }))
}