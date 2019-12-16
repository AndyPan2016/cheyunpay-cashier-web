<!--
 * 支付宝结果视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月11日17:37:47
-->

<template>
  <div class="page-main page-main-pos">
    <my-forms>
      <div slot="form-block" class="ui-form-block">
        <div class="ui-form-item lab3-txt7">
          <span class="form-item-lab">收款方</span>
          <span class="form-item-txt">奥迪同花顺汽车销售有限公司</span>
        </div>
        <div class="ui-form-item lab3-txt7">
          <span class="form-item-lab">商品</span>
          <span class="form-item-txt">奥迪A4L 2019款 35 TFSI 进取型</span>
        </div>
        <div class="ui-form-item lab3-txt7">
          <span class="form-item-lab">订单号</span>
          <span class="form-item-txt">O00119030709335105701695</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">交易金额</span>
          <span class="form-item-txt">￥485,000</span>
        </div>
      </div>
      <div slot="form-block" class="ui-form-block form-block-button">
        <div class="ui-form-item full">
          <a href="javascript:;" class="ui-button j-verify-submit mb-30">已付款</a>
        </div>
        <div class="ui-form-item full">
          <a href="javascript:;" class="ui-button button-reset">未付款</a>
        </div>
      </div>
    </my-forms>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
