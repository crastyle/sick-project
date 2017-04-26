<template>
  <div class="root">
    <Panel :data="data" :visible="visible" :type="type"></Panel>
    <div class="loginPage">
      <div class="cell_left">头像</div>
      <div class="cell-right" @click="upHeadImg">
        <img :src="userInfo.headImg" alt="" class="avatar">
      </div>
    </div>
    <mt-field label="姓名" placeholder="输入真实姓名" v-model="userInfo.name"></mt-field>
    <a data-v-6e328512="" class="mint-cell mint-field">
      <div class="mint-cell-left"></div>
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title"><span class="mint-cell-text">医院</span>
        </div>
        <div class="mint-cell-value" @click="showHospital">
          <div class="department-value">{{userInfo.hospital ? userInfo.hospital: '请选择医院或搜索'}}</div>
        </div>
      </div>
      <div class="mint-cell-right"></div>
    </a>
    <a data-v-6e328512="" class="mint-cell mint-field">
      <div class="mint-cell-left"></div>
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title"><span class="mint-cell-text">科室</span>
        </div>
        <div class="mint-cell-value" @click="showDepartment">
          <div class="department-value">{{userInfo.department ? userInfo.department: '请选择科室'}}</div>
        </div>
      </div>
      <div class="mint-cell-right"></div>
    </a>

    <mt-field label="手机号" placeholder="输入手机号" type="tel" v-model="userInfo.mobile"></mt-field>
    <mt-field label="验证码" placeholder="输入验证码" v-model="userInfo.smsCode">
      <button class="valid-button" @click="getCode" v-bind:class="{'disabled': buttonStatus}">{{validButtonText}}</button>
    </mt-field>
    <div class="section-button">
      <mt-button type="primary" size="large" @click="register">注册</mt-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import './register.scss';
</style>

<script src="./register"></script>
