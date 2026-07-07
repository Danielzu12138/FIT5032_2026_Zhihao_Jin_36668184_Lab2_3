<template>
  <div id="app">
    <Form />

    </div>
</template>

<script setup>
// 1. 引入两个子组件
import Form from './components/Form.vue'
import JSONLab from './components/JSON.vue'
</script>

<style>
/* 全局基础样式（可选） */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>