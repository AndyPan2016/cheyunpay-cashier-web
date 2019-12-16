<!--
 * 注册页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:53
-->

<template>
    <div class="page-main page-login-info">
      <my-forms ref="refMyForms"
         className="test-form"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent">
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">登录名称</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入登录名称" data-key="userName" v-model="formData.userName" />
            </span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">登录密码</span>
            <span class="form-item-inp">
              <input type="password" class="form-inp j-verify request" minlength="8" maxlength="16" placeholder="8-16位（不能全是数字或字母）" data-key="loginPassword" v-model="formData.loginPassword" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">支付密码</span>
            <span class="form-item-inp">
              <input type="password" class="form-inp j-verify request number" minlength="6" maxlength="6" placeholder="6位数字" data-key="payPassword" v-model="formData.payPassword" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">手机号码</span>
            <span class="form-item-txt">{{mobileEncryptionNo}}</span>
          </div>
          <div class="ui-form-item lab3-txt7-remark">
            <span class="form-item-lab">手机验证码</span>
            <span class="form-item-inp">
              <input type="number" class="form-inp j-verify request number" data-close="false" placeholder="请输入验证码" data-key="verifyCode" v-model="formData.verifyCode" />
            </span>
            <a href="javascript:;" :class="'ui-button button-inline button-send-code' + (send ? ' button-disabled' : '')" @click="sendSmsCaptcha">{{sendBtnText}}</a>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block form-block-button">
          <div class="ui-form-item full">
            <a href="javascript:;" class="ui-button j-verify-submit">下一步，提交审核</a>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block form-block-des">
          <div class="remark-item font-weight">车云宝</div>
          <div class="remark-item">重庆车云数字科技股份有限公司</div>
          <div class="remark-item">重庆汽摩交易所有限公司</div>
        </div>
      </my-forms>
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
