<template>
    <div class="sicklistPage">
        <mt-header title="患者">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button slot="right">群发</mt-button>
        </mt-header>
        <div class="search-bar">
            <div class="mint-searchbar">
                <div class="mint-searchbar-inner">
                    <i class="mintui mintui-search"></i>
                    <input type="search" placeholder="搜索" @input="search" v-model="namePrefix" class="mint-searchbar-core">
                </div>
                <a class="mint-searchbar-cancel" style="display: none;">取消</a>
            </div>
        </div>
        <div class="list" v-if="!isSearch" v-infinite-scroll="paginationData" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <div class="crumb" v-for="item in localData">
                <div class="list-header">{{item.item}}</div>
                <div class="item-list" v-for="key in item.list" @click="patientCalendar(key.patientUserGid)">
                    <div class="item" >
                        <img :src="key.headImg" alt="">
                        <span class="username">{{key.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="list" v-if="isSearch" v-infinite-scroll="paginationSearch" infinite-scroll-disabled="searchLoad" infinite-scroll-distance="10">
            <div class="crumb" v-for="item in searchLocalData">
                <div class="list-header">{{item.item}}</div>
                <div class="item-list" v-for="key in item.list" @click="patientCalendar(key.patientUserGid)">
                    <div class="item" >
                        <img :src="key.headImg" alt="">
                        <span class="username">{{key.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <router-link to="/imlist" exact>
                <i class="footer_icon"></i>
                <p>对话</p>
            </router-link>
            <router-link to="/sicklist" exact>
                <i class="footer_icon"></i>
                <p>患者</p>
            </router-link>
            <router-link to="/userinfo" exact>
                <i class="footer_icon"></i>
                <p>我的</p>
            </router-link>
        </footer>
    </div>
</template>

<style scoped lang="scss">
    @import './sicklist.scss';
</style>

<script src="./sicklist">
    
</script>
