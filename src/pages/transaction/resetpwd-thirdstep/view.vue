<!--
 * 注册页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:53
-->

<template>
    <div class="page-main page-main-regist">
      <!-- <my-forms ref="refMyForms" v-if="resetType === 'resetLoginPassword'"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent"> -->
      <my-forms ref="refMyForms" v-if="businessType === 'RESET_LOGIN_PASSWORD'"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent">
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="custom-text">请为<label class="bold">{{realName}}</label>设置新登录密码</span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">新登录密码</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入新登录密码" data-key="newPassword" v-model="formData.newPassword" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block form-block-button">
          <div class="ui-form-item full">
            <a href="javascript:;" class="ui-button j-verify-submit">保存新登录密码</a>
          </div>
        </div>
      </my-forms>
      <div class="reset-pay-pwd" v-else-if="businessType === 'RESET_PAY_PASSWORD'">
        <div class="pwd-wrap">
          <div class="pwd-panel-title">请为<label class="bold">{{realName}}</label>设置新支付密码</div>
          <div class="pwd-panel-remark">请不要输入连续、重复或生日数字</div>
          <password-box :onComplate="pwdComplateEvent" :onChange="pwdChangeEvent" />
          <div class="pwd-panel-remark">请输入6位数字</div>
        </div>
        <div class="btn-wrap">
          <a href="javascript:;" class="ui-button" @click="submitPwd">保存新支付密码</a>
        </div>
      </div>
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
