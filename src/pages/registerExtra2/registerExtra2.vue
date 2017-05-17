<template>
  <div class="root">
    <Panel :data="data" :visible="visible" :type="type"></Panel>
    <div class="loginPage">
      <a class="mint-cell mint-field">
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
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">职称</span>
          </div>
          <div class="mint-cell-value">
            <div class="department-value" @click="showTitles">{{userInfo.title || "点击选择"}}</div>
            <mt-actionsheet :actions="titles" v-model="titlesVisiable"></mt-actionsheet>
          </div>
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">职业证书</span>
          </div>
          <div class="mint-cell-value">
            <div class="department-value">
              <span v-if="!userInfo.professionImg">点击选取</span>
              <input type="file" id="" @change="choiceProfessionImg" placeholder="点击选取">
              <img :src="userInfo.professionImg" class="previewImage" v-if="userInfo.professionImg" alt="">
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">专业职称</span>
          </div>
          <div class="mint-cell-value">
            <div class="department-value">
              <span v-if="!userInfo.titleImg">点击选取</span>
              <input type="file" id="" placeholder="点击选取" @change="choiceTitleImg">
              <img :src="userInfo.titleImg" class="previewImage" v-if="userInfo.titleImg" alt="">
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">相关资质</span>
          </div>
          <div class="mint-cell-value">
            <div class="department-value">
              <span v-if="!userInfo.extraPluses">点击选取</span>
              <input type="file" id="" placeholder="点击选取" @change="choiceExtraPluses">
              <img :src="userInfo.extraPluses" class="previewImage" v-if="userInfo.extraPluses" alt="">
            </div>
          </div>
        </div>
      </a>
      <div class="section-button">
        <mt-button type="primary" size="large" @click="register">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import './registerExtra2.scss';
</style>

<script src="./registerExtra2">
  
</script>
