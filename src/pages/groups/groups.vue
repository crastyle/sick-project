<template>
    <div class="groupsPage">
        <div class="cell-link">
            <mt-cell title="默认分组" is-link :value="total+ '人'"></mt-cell>
        </div>
        <div class="cell-link" @click="group(item)" v-for="item in groups">
            <mt-cell :title="item.name"  is-link :value="item.patientNum + '人'"></mt-cell>
        </div>
        <div class="section-button" @click="create">
            <mt-button type="primary" size="large">新建分组</mt-button>
        </div>
    
    </div>
</template>
<style scoped lang="scss">
@import './groups.scss';
</style>
<script src="./groups"></script>