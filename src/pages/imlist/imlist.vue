<template>
    <div class="imlistPage">
        <div class="item-list">
            <div class="item" @click="goChat(chat)" v-for="chat in chatList" v-if="chatList.length > 0">
                <div class="avatar">
                  <i class="newMsg" v-if="chat.isNewMessage"></i>
                  <img :src="chat.userInfo.headImg" alt="">
                </div>
                <div class="username">{{chat.userInfo.name}}</div>
                <div class="timer">{{chat.sendTime}}</div>
                <div class="content">{{chat.content}}</div>
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
    @import './imlist.scss';
</style>

<script src="./imlist">

</script>
