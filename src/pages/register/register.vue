<template>
  <div class="root">
    <div class="registerPage">
      <mt-field label="手机号" placeholder="输入手机号" type="tel" v-model="userInfo.mobile"></mt-field>
      <mt-field label="验证码" placeholder="输入验证码" v-model="userInfo.smsCode">
        <button class="valid-button" @click="getCode" v-bind:class="{'disabled': buttonStatus}">{{validButtonText}}</button>
      </mt-field>
      <div class="section-button">
        <mt-button type="primary" size="large" @click="login">登录</mt-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './register.scss';
</style>

<script src="./register"></script>
