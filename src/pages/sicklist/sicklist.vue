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
                    <input type="search" placeholder="搜索" class="mint-searchbar-core">
                </div>
                <a class="mint-searchbar-cancel" style="display: none;">取消</a>
            </div>
        </div>
    
    
        <div class="list">
            <div class="list-header">A</div>
            <div class="item-list">
                <div class="item" @click="cons">
                    <img src="../../assets/image/demo-avatar.png" alt="">
                    <span class="username">啊的</span>
                </div>
                <div class="item">
                    <img src="../../assets/image/demo-avatar.png" alt="">
                    <span class="username">安跑</span>
                </div>
                <div class="item">
                    <img src="../../assets/image/demo-avatar.png" alt="">
                    <span class="username">安徽</span>
                </div>
            </div>
            <div class="list-header">B</div>
            <div class="item-list">
                <div class="item">
                    <img src="../../assets/image/demo-avatar.png" alt="">
                    <span class="username">北京患者</span>
                </div>
                <div class="item">
                    <img src="../../assets/image/demo-avatar.png" alt="">
                    <span class="username">比利</span>
                </div>
                <div class="item">
                    <img src="../../assets/image/demo-avatar.png" alt="">
                    <span class="username">比例减</span>
                </div>
            </div>
    
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './sicklist.scss';
</style>

<script src="./sicklist">
    
</script>