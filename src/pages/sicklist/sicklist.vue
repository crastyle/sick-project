<template>
    <div class="sicklistPage">
        <mt-header title="患者">
           
            <mt-button slot="left" v-if="isActiveGroup" @click="cancelActiveGroup">取消</mt-button>
            <mt-button slot="right" @click="showGroup" v-if="!isActiveGroup">群发</mt-button>
            <mt-button slot="right" v-if="isActiveGroup" @click="sendAll">发给所有人</mt-button>
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
                <div class="item-list" v-for="(key, index) in item.list" @click="patientCalendar(key, index)">
                    <div class="item">
                        <div class="group" v-bind:class="{'show': isActiveGroup}">
                            <input type="checkbox" v-model="key.isActive" class="mint-checkbox-input">
                            <span class="mint-checkbox-core"></span>
                        </div>
                        <img :src="key.headImg" alt="">
                        <span class="username">{{key.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="list" v-if="isSearch" v-infinite-scroll="paginationSearch" infinite-scroll-disabled="searchLoad" infinite-scroll-distance="10">
            <div class="crumb" v-for="item in searchLocalData">
                <div class="list-header">{{item.item}}</div>
                <div class="item-list" v-for="(key, index) in item.list" @click="patientCalendar(key, index)">
                    <div class="item" >
                        <div class="group" v-bind:class="{'show': isActiveGroup}">
                            <input type="checkbox" v-model="key.isActive" class="mint-checkbox-input">
                            <span class="mint-checkbox-core"></span>
                        </div>
                        <img :src="key.headImg" alt="">
                        <span class="username">{{key.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="send-part" v-if="selected">
            <mt-button type="primary" size="large" @click="sendInfoGroup">发送消息</mt-button>
        </div>
     
    </div>
</template>

<style scoped lang="scss">
    @import './sicklist.scss';
</style>

<script src="./sicklist">

</script>
