<template>
    <div class="sicklistPage">
        <mt-header :title="groupName">
            <mt-button slot="right" @click="sendAll">群发</mt-button>
        </mt-header>
        <div class="group-info">
            <mt-field label="组名" v-model="groupName"></mt-field>
            <a class="mint-cell mint-field" @click="goMember">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title"><span class="mint-cell-text">添加成员</span>
                    </div>
                    <div class="mint-cell-value">
                        <div class="department-value">
                            点击选取
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="list">
            <div class="crumb" v-for="item in searchLocalData">
                <div class="list-header">{{item.item}}</div>
                <div class="item-list" v-for="(user, index) in item.list" v-if="item.list.length > 0" @click="patientCalendar(user, $event)" :key="index">
                    <div class="item userlist">
                        <mt-cell-swipe :title="user.name" :right="[{content: '删除', style: { background: 'red', color: '#fff' },handler: () => deleteItem(user)}]">
                            <img :src="user.headImg" alt="">
                        </mt-cell-swipe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import './sicklist.scss';
</style>

<script src="./sicklist">

</script>
