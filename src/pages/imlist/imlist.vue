<template>
    <div class="imlistPage">
        <div class="item-list">
            <div class="item" @click="chat">
                <img src="../../assets/image/demo-avatar.png" alt="">
                <div class="username">安跑</div>
                <div class="timer">3-25</div>
                <div class="content">今晚吃药啊</div>
            </div>
            <div class="item">
                <img src="../../assets/image/demo-avatar.png" alt="">
                <div class="username">安跑</div>
                <div class="timer">3-25</div>
                <div class="content">[3条] 我觉得你还可以抢救一下觉得你还可以抢救一下觉得你还可以抢救一下</div>
            </div>

            <div class="item" >
                <img src="../../assets/image/demo-avatar.png" alt="">
                <div class="username">安跑</div>
                <div class="timer">3-25</div>
                <div class="content unread">[语音]</div>
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
