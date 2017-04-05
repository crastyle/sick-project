<template>
  <div class="patientCarePage">
    <h2>患者关怀·医生端</h2>
    <p>注册前请完成以下4个题目</p>
    <div class="content" @click="go">
      <p>2.临床上以血红蛋白值佐为判断贫血的依据。</p>
      <div class="page-swipe">
        <mt-swipe :auto="0">
          <mt-swipe-item>
            <mt-radio v-model="value" :options="['先快后慢', '先慢后快', '先慢后快', '匀速上升']"></mt-radio>
          </mt-swipe-item>
          <mt-swipe-item>
            <mt-radio v-model="value" :options="['先快后慢', '先慢后快', '先慢后快', '匀速上升']"></mt-radio>
          </mt-swipe-item>
          <mt-swipe-item>
            <mt-radio v-model="value" :options="['先快后慢', '先慢后快', '先慢后快', '匀速上升']"></mt-radio>
          </mt-swipe-item>
          <mt-swipe-item>
            <mt-radio v-model="value" :options="['先快后慢', '先慢后快', '先慢后快', '匀速上升']"></mt-radio>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import './patientCare.scss';
</style>
<script src="./patientCare"></script>
