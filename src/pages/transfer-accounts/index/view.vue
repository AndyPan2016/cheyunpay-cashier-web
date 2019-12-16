<!--
 * 转账 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月10日15:27:13
-->

<template>
  <div class="page-main page-transfer-accounts-index">
    <recharge-form :dataset="formsDataset" :onClick="formClick"></recharge-form>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
