<!--
 * 注册页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:53
-->

<template>
    <div class="page-main page-main-regist">
      <my-forms ref="refMyForms"
         className="test-form"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent">
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="custom-text">请输入您的身份证<label class="bold">{{cardId}}</label>信息验证身份</span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">身份证号码</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request id-card" placeholder="请输入身份证件号码" data-key="IDNumber" v-model="formData.IDNumber" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="form-remark">企业用户请输入法人身份证号</div>
        <div slot="form-block" class="ui-form-block form-block-button">
          <div class="ui-form-item full">
            <a href="javascript:;" class="ui-button j-verify-submit">下一步</a>
          </div>
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
