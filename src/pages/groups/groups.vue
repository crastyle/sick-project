<template>
    <div class="groupsPage">
        <div class="cell-link" @click="group(item.id)" v-for="item in groups">
            <mt-cell :title="item.name"  is-link :value="item.num + '人'"></mt-cell>
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