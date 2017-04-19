<template>
    <div class="sickerPage">
        <mt-header :title="bindPatientInfo.name+'日历'">
          <router-link to="/sicklist" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
          <mt-button slot="right" @click="deleteItem()">删除</mt-button>
        </mt-header>
        <div class="sicker-info">
            <div class="avatar">
                <img :src="bindPatientInfo.headImg" alt="">
            </div>
            <div class="info">
                <div class="name">{{bindPatientInfo.name}}</div>
                <div class="sexage">
                    <span>{{bindPatientInfo.sex == 1 ? '男': '女'}}</span> <span>{{bindPatientInfo.age}}</span>
                </div>
                <div class="leavedate">
                    出院日期：{{bindPatientInfo.leaveTime}}
                </div>
            </div>
        </div>
        <div class="calendar-card">
            <vue-event-calendar :events="demoEvents"></vue-event-calendar>
        </div>

        <div class="section-button">
            <mt-button type="primary" size="large" @click="sendInfo">发消息</mt-button>
        </div>

    </div>
</template>

<style scoped lang="scss">
    @import './sicker.scss';
</style>

<script src="./sicker">

</script>
