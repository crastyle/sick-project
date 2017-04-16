import resource from './resource'
export default {
    validate: {
        isTelephone(val) {
            return /^1\d{10}$/.test(val)
        },
        isNumber(val) {
            return /^\d+$/.test(val)
        },
        isUserName(val) {
            return !!val
        },
        isValicode(val) {
            return /^\d{6}$/.test(val)
        },
        isDoctorCard(val) {
            return /^\d+$/.test(val)
        }
    },
    getopenId() {
        let code = this.getUrlparams('code')
        let ls_openId = window.localStorage.getItem('openId')
        // resource.jsApiConfig().then(res => {
        //   console.log(res)
        // })
        /**
         * openId对应的是用户信息，并且是唯一的，时效性为永久
         * 所以保存在本地存储就可以
         * 首先进入程序的时候判断本地存储有没有openId
         * 如果没有的话，则判断是否是微信环境，并且是否已经授权登录
         * 如果是，将得到的code发送给后台换取openId，保存openId到本地，重复以上步骤
         */

        if (!ls_openId || ls_openId === "undefined") {
            if (!code && this.isWechat()) {
                resource.jsApiConfig().then(res => {
                    let redirect_uri = encodeURIComponent(location.href)

                    let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${res.body.result.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect `
                    window.location.href = codeUrl
                })
            } else {
                resource.oath({
                    code: code
                }).then(res => {
                    let openId = res.body.result.openId
                    window.localStorage.setItem('openId', openId)
                })
            }
        }
    },
    getUrlparams(name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (!results) {
            return 0;
        }
        return results[1] || 0;
    },
    isWechat() {
        return window.navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0
    },
    formatDate(time) {
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return `${year}-${month}-${day}`
    },
    formatDate2(time) {
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return `${year}年${month}月${day}日`
    },
    groupBy(db, limit, type) {
        /**
         * 数据库分组方法
         * groupBy(['platform','money'], 'asc')
         * @param  {Array} limit 按照第一个规则分组，按照第二、三、四...个条件排序
         * @param  {string} type {asc||desc} 正序和降序
         * @param  {Object} db 外部的数据集合，默认为数据库
         * @return {Object} result 返回排序之后的数据库
         */
        var result = [];
        var orderLimit = limit[0];
        limit.shift();
        var orderByLimit = limit.length ? limit : [orderLimit];

        var db = db || this.db;
        result = result.concat(this.orderBy(db, orderByLimit, type));

        var map = {};

        for (var i = 0; i < result.length; i++) {
            if (map[result[i][orderLimit]] === undefined) {
                map[result[i][orderLimit]] = [];
            }
            map[result[i][orderLimit]].push(result[i]);
        }

        var _map = [];

        for (let item in map) {
            let _list = {};
            _list.item = item;
            _list.list = map[item];
            _map.push(_list);
        }
        return _map;

    },
    orderBy(db, limit, type) {
        /**
         * 数据库排序方法
         * orderBy(['time','money'], 'asc')
         * @param  {Array} limit 按照什么规则排序 例：['time','money'] 优先级为time，money
         * @param  {string} type {'asc'||'desc'} 正序和降序
         * @param  {Object} db 外部的数据集合，默认为内部数据库
         * @return {Object} result 返回排序之后的数据库
         */
        var that = this;
        var limit = limit.reverse();
        var result = [];
        var record = [];

        function order(limit, type, db) {
            var db = db || that.db;

            db.sort(function (a, b) {
                if (type == 'asc') {
                    if (typeof a[limit[0]] == 'string' && typeof b[limit[0]] == 'string') {
                        return a[limit[0]].localeCompare(b[limit[0]]);
                    } else {
                        return a[limit[0]] - b[limit[0]];
                    }
                } else {
                    if (typeof a[limit[0]] == 'string' && typeof b[limit[0]] == 'string') {
                        return b[limit[0]].localeCompare(a[limit[0]]);
                    } else {
                        return b[limit[0]] - a[limit[0]];
                    }
                }
            });

            limit.shift();

            if (limit.length)
                order(limit, type, db);
            else
                result = result.concat(db);

        }
        order(limit, type, db)
        return result
    }
}