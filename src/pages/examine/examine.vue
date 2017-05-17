<template>
    <div class="examinePage">
        <div class="status" v-if="!status">
            账号信息审核中
        </div>
        <div class="status" v-if="status">
            账号审核不通过
            <p class="reason">
                原因：{{msg}}
            </p>
            <div class="section-button" @click="updateUserInfo">
                <mt-button type="primary" size="large">修改信息</mt-button>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import './examine.scss';
</style>
<script src="./examine"></script>