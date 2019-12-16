<!--
 * 提现 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月10日20:37:44
-->

<template>
  <div class="page-main page-withdrawal-index">
    <withdrawal-form :dataset="formsDataset" :onClick="formClick"></withdrawal-form>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
