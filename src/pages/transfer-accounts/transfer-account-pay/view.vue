<!--
 * 二维码收款 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月9日22:05:29
-->

<template>
  <div class="page-main page-transfer-pay">
    <transfer-form class="transfer-form">
      <div slot="form-block" class="ui-form-block form-block-to">
        <div class="ui-form-item">
          <span class="item-mask j-item-mask" data-id="1"></span>
          <span class="form-item-remark">转账给</span>
          <span class="form-item-title">{{formData.recRealName}} {{formData.recUserNo}}</span>
        </div>
      </div>
    </transfer-form>
    <pos-list-item :dataset="posList" :boxShadow="false" :onBlur="inputBlurEvent" />
    <transfer-form class="transfer-form">
      <div slot="form-block" class="ui-form-block">
        <div class="ui-form-item">
          <span class="form-item-lab">转账说明</span>
          <span class="form-item-inp">
            <input type="text" class="form-inp" placeholder="请输入转账说明" data-key="transferRemark" v-model="formData.transferRemark" />
          </span>
        </div>
      </div>
      <!-- <div slot="form-block" class="ui-form-block">
        <div class="ui-form-item no-border">
          <span class="form-item-lab color-gray">服务费</span>
          <span class="form-item-txt">￥0.00</span>
        </div>
        <div class="ui-form-item no-border">
          <span class="form-item-lab color-gray">扣款金额</span>
          <span class="form-item-txt font-weight">￥0.00</span>
        </div>
      </div> -->
      <div slot="form-block" class="ui-form-block form-block-button">
        <div class="ui-form-item full">
          <a href="javascript:;" :class="'ui-button j-verify-submit ' + (submitBtnStatus ? '' : 'button-disabled')" @click="sureToPay">确认转账</a>
        </div>
      </div>
    </transfer-form>
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
