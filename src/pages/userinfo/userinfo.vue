<template>
    <div class="userinfoPage">
        <div class="item-list">
            <div class="item">
                <div class="bd-l">
                    头像
                </div>
                <img src="../../assets/image/demo-avatar.png" alt="">
            </div>
            <div class="item">
                <div class="bd-l">
                    姓名
                </div>
                <div class="username">安跑</div>
            </div>
            <div class="item">
                <div class="bd-l">
                    医院
                </div>
                <div class="username">北京大学第三医院</div>
            </div>
            <div class="item">
                <div class="bd-l">
                    科室
                </div>
                <div class="username link">内科</div>
            </div>
            <div class="item">
                <div class="bd-l">
                    识别码
                </div>
                <div class="username">20150151</div>
            </div>
        </div>
        <div class="my-section">
            <div class="tip">我的二维码</div>
            <img src="../../assets/image/code.png" alt="">
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
