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
                <li v-for="item in data" @click="choseItem">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { Search } from 'mint-ui';
    import Vue from 'vue'
    Vue.component(Search.name, Search);
    export default {
        name: 'Panel',
        data() {
            return {
                searchValue: ''
            }
        },
        props: {
            data: Array,
            visible: Boolean,
            type: String
        },
        
        methods: {
            hidePanel() {
                this.$parent.visible = false
            },
            choseItem(e) {
                if (this.type === 'department') {
                    this.$parent.userInfo.department = e.target.innerText
                }
                if (this.type === 'hospital') {
                    this.$parent.userInfo.hospital = e.target.innerText
                }
                this.$parent.visible = false
            },
            search(e) {
                let val = e.target.value
                this.$parent.data = this.$parent.data.filter((item) => {
                    return (item['name'].toLowerCase().indexOf(val.toLowerCase()) > -1)
                })
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
        li {
            padding: 10px 0;
            font-size: 16px;
            color: #666;
            border-bottom: 1px solid #e5e5e5;
        }
    }
</style>