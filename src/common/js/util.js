import {CONST} from '../js/constant'
/**
 * sessionStorage 存值
 * @param key 储存对象的key值
 * @param value 储存对象的value值
 * @param type webStrorage的类型 这个项目中默认值是localStorage
 */
export function saveToLocal(key, value, type) {
    type = type || 'localStorage'
    let HH =  window[type].HH
    if (!HH) {
        HH = {}
    } else {
        HH = JSON.parse(HH)
    }
    HH[key] = value
    window[type].HH = JSON.stringify(HH)
}
/**
 * sessionStorage 取值
 * @param key  要取值对象的key值
 * @param def  取不到值以后给的默认值
 * @param type webStrorage的类型 这个项目中默认值是localStorage
 */
export function getFromLocal(key, def, type) {
    type = type || 'localStorage'
    let HH = window[type].HH
    if (!HH) {
        return HH
    }  
    HH = JSON.parse(HH)
    let ret = HH[key]
    return ret || def
}

/**
 * setCookie 设置cookie
 * @param key  存储对象的key值
 * @param value  存储对象的value值
 * @param expiredays  cookie的有效时间
 */
export function setCookie(key, value, expiredays) {
    let exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = key + "=" + escape(value) + ((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
}

/**
 *  获取指定名称的cookie的值
 *  objName  : cookie key值
 */
export function getCookie(objName) {
    var arrStr = document.cookie.split('; ')
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split('=')
        if (temp[0] === objName) return unescape(temp[1])
    }
}