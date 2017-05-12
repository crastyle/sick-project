<template>
  <div class="root">
    <Panel :data="data" :visible="visible" :type="type"></Panel>
    <div class="registerPage" v-if="isFirstLogin">
      <mt-field label="手机号" placeholder="输入手机号" type="tel" v-model="userInfo.mobile"></mt-field>
      <mt-field label="验证码" placeholder="输入验证码" v-model="userInfo.smsCode">
        <button class="valid-button" @click="getCode" v-bind:class="{'disabled': buttonStatus}">{{validButtonText}}</button>
      </mt-field>
      <div class="section-button">
        <mt-button type="primary" size="large" @click="login">登录</mt-button>
      </div>
    </div>
    <div class="loginPage" v-if="!isFirstLogin">
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
            <div class="department-value" @click="showCardType">{{userInfo.cardType || "点击选择"}}</div>
            <mt-actionsheet :actions="cardTypeList" v-model="cardTypeVisiable"></mt-actionsheet>
          </div>
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">医院区域(省)</span>
          </div>
          <div class="mint-cell-value">
            <div class="department-value" @click="showProvince">{{userInfo.province || "点击选择"}}</div>
          </div>
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">医院区域(市)</span>
          </div>
          <div class="mint-cell-value">
            <div class="department-value" @click="showCity">{{userInfo.city || "点击选择"}}</div>
          </div>
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">医院</span>
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
    <div class="loginPage" v-if="userProfesser">
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
            <div class="department-value" @click="showTitles">{{userInfo.cardType || "点击选择"}}</div>
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
              点击选取
              <input type="file" id="" placeholder="点击选取">
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
              点击选取
              <input type="file" id="" placeholder="点击选取">
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
              点击选取
              <input type="file" id="" placeholder="点击选取">
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
@import './register.scss';
</style>

<script src="./register"></script>
