<template>
    <div class="sicklistPage">
        <mt-header title="添加成员">
            <mt-button slot="left" @click="cancel">返回</mt-button>
            <mt-button slot="right" @click="complete">完成（{{selectedUsers.length}}）</mt-button>
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
                <div class="item-list" v-for="(user, index) in item.list" @click="selectUser(user, $event)" :key="index">
                    <div class="item">
                        <div class="group show">
                            <span class="mint-checkbox-core " v-bind:class="{'checked': user.isActive}"></span>
                        </div>
                        <img :src="user.headImg" alt="">
                        <span class="username">{{user.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="list" v-if="isSearch" v-infinite-scroll="paginationSearch" infinite-scroll-disabled="searchLoad" infinite-scroll-distance="10">
            <div class="crumb" v-for="item in searchLocalData">
                <div class="list-header">{{item.item}}</div>
                <div class="item-list" v-for="(user, index) in item.list" @click="selectUser(user, index)">
                    <div class="item">
                        <div class="group show">
                            <span class="mint-checkbox-core " v-bind:class="{'checked': user.isActive}"></span>
                        </div>
                        <img :src="user.headImg" alt="">
                        <span class="username">{{user.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import './member.scss';
</style>

<script src="./member">

</script>
