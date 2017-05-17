<template>
  <div class="root">
    <Panel :data="data" :visible="visible" :type="type"></Panel>
    <div class="loginPage">
      <div class="avatar-content" @click="upHeadImg">
        <img :src="userInfo.headImg" alt="" class="avatar">
        <div class="tip">点击上传真实头像</div>
      </div>
      <mt-field label="姓名" placeholder="点击输入" v-model="userInfo.name"></mt-field>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">证件类型</span>
          </div>
          <div class="mint-cell-value">
            <div class="department-value" @click="showCardType">{{certificateTypeStr || "点击选择"}}</div>
            <mt-actionsheet :actions="cardTypeList" v-model="cardTypeVisiable"></mt-actionsheet>
          </div>
        </div>
      </a>
      <mt-field label="证件号码" placeholder="点击输入" v-model="userInfo.certificateCode"></mt-field>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">医院区域(省)</span>
          </div>
          <div class="mint-cell-value">
            <div class="department-value" @click="showProvince">{{userInfo.hospitalProvince || "点击选择"}}</div>
          </div>
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">医院区域(市)</span>
          </div>
          <div class="mint-cell-value">
            <div class="department-value" @click="showCity">{{userInfo.hospitalCity || "点击选择"}}</div>
          </div>
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">医院名称</span>
          </div>
          <div class="mint-cell-value" @click="showHospital">
            <div class="department-value">{{userInfo.hospital ? userInfo.hospital: '请选择医院或搜索'}}</div>
          </div>
        </div>
      </a>
  
      <div class="section-button">
        <mt-button type="primary" size="large" @click="register">下一步</mt-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './registerExtra.scss';
</style>

<script src="./registerExtra"></script>
