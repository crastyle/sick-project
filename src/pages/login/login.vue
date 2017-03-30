<template>
  <div class="root">
    <mt-field label="手机号" placeholder="输入手机号" type="tel"></mt-field>
    <mt-field label="验证码" placeholder="输入验证码">
      <button class="valid-button" @click="getCode" v-bind:class="{'disabled': buttonStatus}">{{validButtonText}}</button>
    </mt-field>
    <div class="section-button">
      <mt-button type="primary" size="large">登录</mt-button>
    </div>

    <p>
      没有账号？
      <router-link to="/register">
      <a>立即注册</a>
    </router-link>
    </p>
  </div>
</template>

<style scoped lang="scss">
  @import './login.scss';
</style>

<script src="./login">

</script>
