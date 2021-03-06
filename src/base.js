import resource from './resource'
import { bus } from './bus'
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
        },
        certificateCode(type, value) {
            if (type == "身份证") return /^\d{15}$|^\d{17}([0-9]|[xX])$/.test(value)
            if (type == "军官证") return /^\d{6,8}$/.test(value)
            if (type == "台胞证") return /^\d{8}$/.test(value)
        }
    },
    uglyImage(path, obj, callback) {
        var img = new Image();
        img.src = path;
        img.onload = function () {
            var that = this;
            // 默认按比例压缩
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
            var quality = 0.5;  // 默认图片质量为0.7
            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // 创建属性节点
            var anw = document.createAttribute("width");
            anw.nodeValue = w;
            var anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            // 图像质量
            if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                quality = obj.quality;
            }
            // quality值越小，所绘制出的图像越模糊
            var base64 = canvas.toDataURL('image/jpeg', quality);
            // 回调函数返回base64的值
            callback(base64);
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
                    window.localStorage.setItem('openid', openId)
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
    },
    initIm(appid) {
        RongIMLib.RongIMClient.init(appid);
    },
    watchIM() {
        // 设置连接监听状态 （ status 标识当前连接状态 ）
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
            onChanged: function (status) {
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功');
                        break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接');
                        break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接');
                        break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登录');
                        break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        console.log('域名不正确');
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用');
                        break;
                }
            }
        });
    },
    connectIM(token, cb) {
        RongIMClient.connect(token, {
            onSuccess: function (userId) {
                console.log("Login successfully." + userId);
                cb()
            },
            onTokenIncorrect: function () {
                console.log('token无效');
            },
            onError: function (errorCode) {
                var info = '';
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                        info = '不可接受的协议版本';
                        break;
                    case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                        info = 'appkey不正确';
                        break;
                    case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                        info = '服务器不可用';
                        break;
                }
                console.log(errorCode);
            }
        });
    },
    receiveMsg() {
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: function (message) {
                console.log(message)
                bus.$emit('receiveMsg', message)
                // 判断消息类型
                switch (message.messageType) {
                    case RongIMClient.MessageType.TextMessage:
                        // 发送的消息内容将会被打印
                        break;
                    case RongIMClient.MessageType.VoiceMessage:
                        // 对声音进行预加载                
                        // message.content.content 格式为 AMR 格式的 base64 码
                        RongIMLib.RongIMVoice.preLoaded(message.content.content);
                        break;
                    case RongIMClient.MessageType.ImageMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.LocationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.RichContentMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.UnknownMessage:
                        // do something...
                        break;
                    default:
                    // 自定义消息
                    // do something...
                }
            }
        });
    },
    recordList() {
        RongIMClient.getInstance().getConversationList({
            onSuccess: function (list) {
                console.log(list)
                // list => 会话列表集合。
            },
            onError: function (error) {
                // do something...
            }
        }, null);
    },
    getUnReceiveMessage(token, cb) {
        //此接口必须在init()方法之后调用。
        RongIMClient.getInstance().hasRemoteUnreadMessages(token, {
            onSuccess: function (hasMessage) {
                if (hasMessage) {
                    cb(hasMessage)
                    // 有未读的消息
                } else {
                    cb(hasMessage)
                    // 没有未读的消息
                }
            }, onError: function (err) {
                // 错误处理...
            }
        });
    },
    formatEventDate(time) {
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day

        return `${year}/${month}/${day}`
    }

}
