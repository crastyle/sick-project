<template>
    <div class="userinfoPage">
        <Panel :data="data" :visible="visible" :type="type"></Panel>
        <div class="item-list">
            <div class="item" @click="updateHead">
                <div class="bd-l">
                    头像
                </div>
                <img :src="userInfo.headImg" alt="">
            </div>
            <div class="item" @click="updateName">
                <div class="bd-l">
                    姓名
                </div>
                <div class="username">{{userInfo.name}}</div>
            </div>
            <div class="item" @click="updateHospital">
                <div class="bd-l">
                    医院
                </div>
                <div class="username hospital">{{userInfo.hospital}}</div>
            </div>
            <div class="item" @click="updateDepartment">
                <div class="bd-l">
                    科室
                </div>
                <div class="username">{{userInfo.department}}</div>
            </div>
            <div class="item">
                <div class="bd-l">
                    识别码
                </div>
                <div class="username">{{userInfo.identifyCode}}</div>
            </div>
        </div>
        <div class="my-section">
            <div class="tip">我的二维码</div>
            <img :src="userInfo.identifyImg" alt="">
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
    @import './userinfo.scss';
</style>

<script src="./userinfo">

</script>
