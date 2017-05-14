<template>
    <div class="examinePage">
        <div class="status" v-if="false">
            账号信息审核中
        </div>
        <div class="status">
            账号信息不通过
            <p class="reason">
                原因：资质证书不正确
            </p>
            <div class="section-button">
                <mt-button type="primary" size="large">修改信息</mt-button>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import './examine.scss';
</style>
<script src="./examine"></script>