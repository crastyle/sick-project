<template>
  <div class="patientCarePage">
    <h2>患者关怀·医生端</h2>
    <p>注册前请完成以下4个题目</p>
    <div class="content" @click="go">
      <p>2.临床上以血红蛋白值佐为判断贫血的依据。</p>
      <mt-radio
        v-model="value"
        :options="['先快后慢', '先慢后快', '先慢后快']">
      </mt-radio>
      <div class="page-swipe">
        <mt-swipe :auto="4000">
          <mt-swipe-item>

          </mt-swipe-item>
          <mt-swipe-item>
            <mt-radio
              title="radio list"
              v-model="value"
              :options="['optionA', 'optionB', 'optionC']">
            </mt-radio>
          </mt-swipe-item>
          <mt-swipe-item>
            <mt-radio
              title="radio list"
              v-model="value"
              :options="['optionA', 'optionB', 'optionC']">
            </mt-radio>
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
