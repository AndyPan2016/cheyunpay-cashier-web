<!--
 * 充值 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月9日21:16:19
-->

<template>
  <div class="page-main page-recharge-index">
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
