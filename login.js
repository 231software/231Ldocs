ServerEvents.onLoginResult=(parsedResult)=>{
    switch(parsedResult.result){
        case 0:location.href="userdashboard.html";break;
        case 1:{
            try{
                alert("密码错误")
            }
            catch(e){}
            break;
        }
        case 2:{
            try{
                alert("你还没有注册！请阅读 https://231l.net/docs/#/how_to_register 根据指引进行注册")
            }
            catch(e){}
            break;
        }
        default:{
            console.error("服务端发送了无效的登录结果："+parsedResult)
            break;
        }
    }
}
function login(){
    const username=document.getElementById("username").value
    const password=document.getElementById("password").value
    const token=parseCookie("token")
    document.cookie="username="+username+"; SameSite=Lax;"
    document.cookie="password="+password+"; SameSite=Lax;"
    sendData(JSON.stringify({
        username,
        password,
        token,
        type:"auth"
    }))
}