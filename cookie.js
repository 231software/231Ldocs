function parseCookie(key){
	for(let data of document.cookie.split(";")){
		if(data.match(`${key}=(.+)`)!=null) return data.match(`${key}=(.+)`)[1]
	}
	return undefined
}
/**删除所有cookie */
function deleteAllCookies() {
    // 获取所有cookie
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        // 设置cookie过期时间为过去的时间，来删除它
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}
//测试是否支持cookie
document.cookie="testcookie=true;SameSite=Lax;"
if(parseCookie("testcookie")==undefined)alert("网站目前无法正常工作，因为您当前的浏览器不支持cookie，或已经禁用cookie。")
