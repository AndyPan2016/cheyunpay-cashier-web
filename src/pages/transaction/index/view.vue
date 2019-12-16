<!--
 * POS申请记录详情页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日11:33:14
-->

<template>
  <div class="page-main page-main-pos">
    <transaction-head />
    <my-forms :dataset="formsDataset" :onClick="formClick">
      <div slot="form-block" class="ui-form-block form-block-remark text-left">请选择支付方式</div>
    </my-forms>
    <ad-list />
    <tip-popup ref="tip-popup" />
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
