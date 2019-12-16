<!--
 * 页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年8月21日14:03:40
-->

<template>
  <div class="page-transaction-header">
    <pos-record-detail :dataset="headData" />
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
