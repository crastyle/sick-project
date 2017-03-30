<template>
    <div class="sickerPage">
        <mt-header title="宋宝强先生日历">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button slot="right">删除</mt-button>
        </mt-header>
        <div class="sicker-info">
            <div class="avatar">
                <img src="../../assets/image/demo-avatar.png" alt="">
            </div>
            <div class="info">
                <div class="name">宋宝强</div>
                <div class="sexage">
                    <span>男</span><span>35岁</span>
                </div>
                <div class="leavedate">
                    出院日期：2017-03-25
                </div>
            </div>
        </div>
        <div class="calendar-card">
            <vue-event-calendar :events="demoEvents"></vue-event-calendar>
        </div>
        <router-link to="chat">
          <div class="section-button">
                      <mt-button type="primary" size="large">发消息</mt-button>
                  </div>
        </router-link>

    </div>
</template>

<style scoped lang="scss">
    @import './sicker.scss';
</style>

<script src="./sicker">

</script>
