<!--
 * 线下充值 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月9日21:37:15
-->

<template>
  <div class="page-main page-offline-recharge">
    <recharge-form ref="j-recharge-form">
      <div slot="form-block" class="ui-form-block">
        <div class="ui-form-item">
          <span class="form-item-lab">开户行</span>
          <span class="form-item-txt">{{rechargeResult.bankName}}</span>
        </div>
        <div class="ui-form-item lab3-txt7">
          <span class="form-item-lab">支行全称</span>
          <span class="form-item-txt">{{rechargeResult.bankDesc}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">银行户名</span>
          <span class="form-item-txt">{{rechargeResult.realName}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">银行账号</span>
          <span class="form-item-txt">{{rechargeResult.bankCardNo}}</span>
        </div>
      </div>
      <div slot="form-block" class="form-remark">说明：您可以通过柜台或网银向以上账户进行转账，我司收到款项之后将自动为您的账户进行上账，完成充值。</div>
      <div slot="form-block" class="ui-form-block form-block-button">
        <div class="ui-form-item full">
          <a href="javascript:;" class="ui-button j-verify-submit" @click="complateClickEvent">已完成转账，返回业务平台</a>
        </div>
      </div>
    </recharge-form>
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
