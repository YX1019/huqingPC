
let apiUrl = '/api/hbb-biz/' // '/api/mockjsdata/'
let url = {
    domain: {
        test: {
            car: 'http://wxxtest.jbx188.com',
            mall: 'http://wxxtest.jbx188.com:8390',
            hxPhone: 'http://wxxtest.jbx188.com:8391'
        },
        product: {
            car: 'https://product.haibaobaoxian.com',
            mall: 'https://mall.haibaobaoxian.com',
            hxPhone: ''
        },
        dev: {
            car: 'http://localhost:9001',
            mall: 'http://localhost:9003',
            hxPhone: 'http://localhost:9004'
        }
    },
    path: {
        car: {
            appIndex: '/app/index',
            me: '/me',
            clause: '/clause'
        },
        mall: {
            index: '/index'
        }
    },
    api: {
        login: apiUrl + 'sys/user/login', // 登录
        getTravelCountry: '/api/v1/mall/getTravelCountry',
        getGeo: apiUrl + 'api/v1/city/getGeo' // 定位
    }
}

export {url}
