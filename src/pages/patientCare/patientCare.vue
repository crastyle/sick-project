<template>
  <div class="patientCarePage">
    <h2>患者关怀·医生端</h2>
    <p>注册前请完成以下4个题目</p>
    <div class="content">
  
      <div class="page-swipe" v-if="defaultIndex==0">
        <p>{{q1.q}}</p>
        <mt-radio v-model="value1" :options="q1.a"></mt-radio>
      </div>
      <div class="page-swipe" v-if="defaultIndex==1">
        <p>{{q2.q}}</p>
        <mt-checklist v-model="value2" :value="bindAnswerList" :options="q2.a"></mt-checklist>
      </div>
      <div class="page-swipe" v-if="defaultIndex==2">
        <p>{{q3.q}}</p>
        <mt-radio v-model="value3" :options="q3.a"></mt-radio>
      </div>
      <div class="page-swipe" v-if="defaultIndex==3">
        <p>{{q4.q}}</p>
        <mt-radio v-model="value4" :options="q4.a"></mt-radio>
      </div>
  
      <div class="button-cell">
        <div class="cell-item" v-if="defaultIndex!=0">
          <mt-button type="primary" size="large" @click="prevAnswer">上一题</mt-button>
        </div>
        <div class="cell-item" v-if="defaultIndex!=3">
          <mt-button type="primary" size="large" @click="nextAnswer">下一题</mt-button>
        </div>
        <div class="cell-item" v-if="defaultIndex == 3">
          <mt-button type="primary" size="large" @click="done">完成</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './patientCare.scss';
</style>

<script src="./patientCare">
  
</script>
