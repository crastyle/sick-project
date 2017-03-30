<template>
  <div class="root">
    <div class="loginPage">
      <div class="cell_left">头像</div>
      <div class="cell-right">
        <img src="../../assets/image/demo-avatar.png" alt="">
      </div>
    </div>
    <mt-field label="姓名" placeholder="输入真实姓名"></mt-field>
    <mt-field label="医院" placeholder="输入医院名称搜索"></mt-field>
    <a data-v-6e328512="" class="mint-cell mint-field">
      <div class="mint-cell-left"></div>
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title"><span class="mint-cell-text">科室</span>
        </div>
        <div class="mint-cell-value">
          <div class="department-value">选择科室</div>
        </div>
      </div>
      <div class="mint-cell-right"></div>
    </a>
    <mt-field label="手机号" placeholder="输入手机号" type="tel"></mt-field>
    <mt-field label="验证码" placeholder="输入验证码">
      <button class="valid-button" @click="getCode" v-bind:class="{'disabled': buttonStatus}">{{validButtonText}}</button>
    </mt-field>
    <div class="section-button">
      <mt-button type="primary" size="large" @click="register">注册</mt-button>
    </div>

    <p>
      已有账号？
      <router-link to="/login">
      <a>立即登录</a>
    </router-link>
    </p>
  </div>
</template>

<style scoped lang="scss">
  @import './register.scss';
</style>

<script src="./register"></script>
