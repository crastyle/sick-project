import Vue from 'vue'
import vueResource from 'vue-resource'
import { Toast } from 'mint-ui';
Vue.use(vueResource)
export default {
    interceports() {
        Vue.http.interceptors.push((req, next) => {
            req.method = "POST"
            let u = window.localStorage.getItem('userid')
            let t = window.localStorage.getItem('token')
            if (req.url.indexOf('uploadImageWithCropByBase64') > 0) {
                console.log('xxx')
            } else {
                if (!u || u !== "undefined") {
                    if (!req.body) {
                        req.body = {}
                    }
                    req.body['u'] = u
                    req.body['t'] = t
                    req.body['c'] = window.navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0 ? 'wechat' : 'wechat'
                }
            }


            let toast = Toast({
                message: '请求中...'
            })
            next(res => {
                toast.close()
                if (!res.ok) {
                    Toast({
                        message: res.statusText,
                        duration: 2000
                    })
                    return
                }
                if (res.ok && res.body.code !== 0) {
                    Toast({
                        message: res.body.message,
                        duration: 2000
                    })
                    return
                }
            })
        })
    },
    resource(url, params) {
        // let doUrl = 'http://139.198.11.46:8080/' + url
        let doUrl = 'http://czgy.mbjyy.net/' + url
        return Vue.http.post(doUrl, params)
    },

    getTimestamp() {
        return this.resource('utility/timestamp')
    },

    /**
     * @description 用来获取微信用户的openId
     * @param {*} params {code}
     * @return <promise>
     * @response openid
     */
    oath(params) {
        return this.resource('gateway/doctor/oauth', params)
    },

    /**
     * @description 获取用来js-sdk认证的config参数信息
     * @param {*} params {code}
     * @return <promise>
     * @response code
     */
    jsApiConfig(params) {
        return this.resource('gateway/doctor/jsApiConfig', params)
    },
    /**
     * @description 判断用户是否绑定手机号
     * @return {bind, openid, u, t}
     */
    checkBind(params) {
        return this.resource('doctor/user/checkBind', params)
    },
    checkMobile(params) {
        return this.resource('doctor/user/checkMobile', params)
    },
    hospital(params) {
        return this.resource('doctor/config/hospital', params)
    },
    department(params) {
        return this.resource('doctor/config/department', params)
    },
    checkStatus(params) {
        return this.resource('doctor/user/checkStatus', params)
    },
    /**
     * @description 用户注册接口
     * @return u,t
     */
    register(params) {

        return this.resource('doctor/user/register', params)
    },
    apply(params) {
        return this.resource('doctor/user/applyAgain', params)
    },

    /**
     * @description 判断手机是否已经注册
     */
    mobileUsed(params) {
        return this.resource('doctor/user/register', params)
    },
    /**
     * @description 获取系统当前时间戳
     */
    getSystemTimestamp(params) {
        return this.resource('utility/timestamp', params)
    },
    /**
     * @description 发送手机验证码
     * @params {mobile: string}
     */
    smsCode(params) {
        return this.resource('utility/smsCode', params)
    },
    addPatientToGroup(params) {
        return this.resource('doctor/group/addPatientToGroup', params)
    },
    removePatientFromGroup(params) {
        return this.resource('doctor/group/removeFromGroup', params)
    },
    todoPatientList(params) {
        return this.resource('doctor/group/todoAddPatientList', params)
    },
    bindPatientList(params) {
        return this.resource('doctor/myPatient/bindPatientList', params)
    },
    bindPatientInfo(params) {
        return this.resource('doctor/myPatient/bindPatientInfo', params)
    },
    patientMonthDiary(params) {
        return this.resource('doctor/myPatient/patientMonthDiary', params)
    },
    patientDiaryInfo(params) {
        return this.resource('doctor/myPatient/patientDiaryInfo', params)
    },
    unBindPatient(params) {
        return this.resource('doctor/myPatient/unBindPatient', params)
    },

    uploadImageWithCrop(params) {
        let formData = new FormData();
        for (let key in params) {
            formData.append(key, params[key])
        }
        return this.resource('utility/uploadImageWithCrop', formData)
    },
    uploadImageWithBase64Crop(params, base64) {
        let postStr = ''
        if (params.width != undefined) {
            postStr += `width=${params.width}&`
        }
        if (params.height != undefined) {
            postStr += `height=${params.height}&`
        }
        if (params.x != undefined) {
            postStr += `x=${parmas.x}&`
        }
        if (params.y != undefined) {
            postStr += `y=${params.y}&`
        }
        return this.resource(`utility/uploadImageWithCropByBase64?bucket=doctor&${postStr}`, base64)
    },
    userInfo(params) {
        return this.resource('doctor/user/userInfo', params)
    },
    updateUserInfo(params) {
        return this.resource('doctor/user/updateUserSelective', params)
    },
    rongyunAppKey() {
        return this.resource('rongyun/gateway/rongyunAppKey')
    },
    newtoken(params) {
        params.app = 'doctor'
        return this.resource('rongyun/gateway/doctor/newToken', params)
    },
    getGroupList(params) {
        return this.resource('doctor/group/groupList', params)
    },
    addGroup(params) {
        return this.resource('doctor/group/addGroup', params)
    },
    getGroupDetail(params) {
        return this.resource('doctor/group/groupPatientList', params)
    },

    getPatientListByIds(params) {
        return this.resource('doctor/myPatient/patientList', params)
    },
    sendToSpecifiedPatient(params) {
        return this.resource('doctor/myPatient/sendToSpecifiedPatient', params)
    },
    sendToAllPatient(params) {
        return this.resource('doctor/myPatient/sendToAllPatient', params)
    },
    sendToGroupPatient(params) {
        return this.resource('doctor/myPatient/sendToGroupPatient', params)
    }
}
