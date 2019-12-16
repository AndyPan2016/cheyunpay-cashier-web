<!--
 * 账户余额支付视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月11日17:35:04
-->

<template>
  <div class="page-main page-main-pos">
    <transaction-head />
    <my-forms>
      <div slot="form-block" class="ui-form-block form-block-remark text-left">账户余额支付明细</div>
      <div slot="form-block" class="ui-form-block no-margin">
        <div class="ui-form-item no-border">
          <span class="form-item-lab color-gray">服务费</span>
          <span class="form-item-txt">￥{{serviceMoney}}</span>
        </div>
        <div class="ui-form-item no-border">
          <span class="form-item-lab color-gray">交易金额</span>
          <span class="form-item-txt">￥{{amount}}</span>
        </div>
        <div class="ui-form-item no-border">
          <span class="form-item-lab color-gray">合计</span>
          <span class="form-item-txt font-weight">￥{{amountAll}}</span>
        </div>
      </div>
      <div slot="form-block" class="ui-form-block form-block-remark text-right">可用余额：{{balance}}元</div>
      <div slot="form-block" class="ui-form-block form-block-button">
        <div class="ui-form-item full">
          <a href="javascript:;" class="ui-button j-verify-submit" @click="sureToPay">确认支付</a>
        </div>
      </div>
    </my-forms>
    <tip-popup ref="j-popup-pwd-box" :buttons="false"
      title="visible" :content="false"
      :spaceMin="true">
      <div slot="popup-content" class="popup-pwd-box">
        <div class="pwd-box-hd">
          <a href="javascript:;" class="hd-btn-reset" @click="resetPay">取消</a>
          <a href="javascript:;" class="hd-btn-forget" @click="forgetPwd">重置密码</a>
        </div>
        <div class="pwd-title">请输入支付密码</div>
        <password-box :onComplate="onComplatePwd" :onChange="onChangePwd" :onFocus="focusEvent" :onBlur="blurEvent" />
        <div class="pwd-len-tip">6位支付密码</div>
        <a href="javascript:;" class="ui-button" @click="surePay">确认支付</a>
      </div>
    </tip-popup>
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
