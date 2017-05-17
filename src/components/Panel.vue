<template>
    <div class="panel-root" :data="data" :visible="visible" v-if="visible">
        <div class="panel-control">
            <div class="mint-search">
                <div class="mint-searchbar">
                    <div class="mint-searchbar-inner">
                        <i class="mintui mintui-search"></i>
                        <input type="search" placeholder="搜索" @input="search" class="mint-searchbar-core">
                    </div>
                    <a class="mint-searchbar-cancel" href="javascript:;" @click="hidePanel">取消</a>
                </div>
            </div>
            <ul class="list">
                <li v-for="item in searchResultData" @click="choseItem" v-if="type !== 'province' && type !== 'city' && type !=='updateProvince' && type!=='updateCity'">{{item.name}}</li>
                <li v-for="item in searchResultData" @click="choseItem" v-if="type === 'province' || type=== 'city' || type==='updateProvince' || type=='updateCity'">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Search } from 'mint-ui';
import Vue from 'vue'
import resource from '../resource'
Vue.component(Search.name, Search);
export default {
    name: 'Panel',
    data() {
        return {
            searchValue: '',
            searchResultData: [],
            searching: false
        }
    },
    props: {
        data: Array,
        visible: Boolean,
        type: String
    },
    watch: {
        '$parent.visible': function (n, o) {
            if (n === true) {
                console.log(this.$parent.data)
                this.searchResultData = this.$parent.data
            }
        }
    },
    methods: {
        hidePanel() {
            this.$parent.visible = false
            this.searching = false
            this.$parent.data = []
        },
        choseItem(e) {
            let _this = this
            if (this.$parent.type === 'department') {
                this.$parent.userInfo.department = e.target.innerText
            }
            if (this.$parent.type === 'hospital') {
                this.$parent.userInfo.hospital = e.target.innerText
            }
            if (this.$parent.type === 'UpdateDepartment') {
                resource.updateUserInfo({
                    department: e.target.innerText
                }).then(res => {
                    if (res.body.code == 0) {
                        _this.$parent.userInfo.department = e.target.innerText
                        _this.$parent.visible = false
                    }
                })
            }
            if (this.$parent.type === 'UpdateHospital') {
                resource.updateUserInfo({
                    hospital: e.target.innerText
                }).then(res => {
                    _this.$parent.userInfo.hospital = e.target.innerText
                    _this.$parent.visible = false
                })
            }
            if (this.$parent.type === 'province') {
                this.$parent.userInfo.hospitalProvince = e.target.innerText
                this.$parent.userInfo.hospitalCity = ''
            }
            if (this.$parent.type === 'city') {
                this.$parent.userInfo.hospitalCity = e.target.innerText
            }
            if (this.$parent.type === 'updateProvince') {
                resource.updateUserInfo({
                    hospitalProvince: e.target.innerText
                }).then(res => {
                    if (res.body.code == 0) {
                        _this.$parent.userInfo.hospitalProvince = e.target.innerText
                        _this.$parent.visible = false
                    }
                })
            }
            if (this.$parent.type === 'updateCity') {
                resource.updateUserInfo({
                    hospitalCity: e.target.innerText
                }).then(res => {
                    if (res.body.code == 0) {
                        _this.$parent.userInfo.hospitalCity = e.target.innerText
                        _this.$parent.visible = false
                    }
                })
            }
            this.$parent.visible = false
        },
        search(e) {
            let val = e.target.value
            let _this = this
            if (this.$parent.type == 'hospital' || this.$parent.type === 'UpdateHospital') {
                resource.hospital({ namePrefix: val }).then(res => {
                    if (res.body.code == 0) {
                        _this.searchResultData = res.body.result
                    }
                })
            }
            if (this.$parent.type === 'department' || this.$parent.type === 'updateDepartment') {
                this.searchResultData = this.$parent.data.filter((item) => {
                    return (item['name'].toLowerCase().indexOf(val.toLowerCase()) > -1)
                })
            }
            if (this.$parent.type === 'province' || this.$parent.type === 'city') {
                this.searchResultData = this.$parent.data.filter((item) => {
                    return (item.toLowerCase().indexOf(val.toLowerCase()) > -1)
                })
            }
        }
    }
}
</script>

<style lang="scss" scope>
.panel-root {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .8);
    z-index: 555;
}

.panel-control {
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6rem;
    transition: all .5s;
    &.hide {
        width: 0;
    }
}

ul.list {
    padding-left: 10px;
    height: 10rem;
    overflow: auto;
    li {
        padding: 10px 0;
        font-size: 16px;
        color: #666;
        border-bottom: 1px solid #e5e5e5;
    }
}
</style>