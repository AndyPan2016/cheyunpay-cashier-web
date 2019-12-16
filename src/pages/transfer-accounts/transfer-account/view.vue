<!--
 * 注册页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:53
-->

<template>
    <div class="page-main page-main-regist">
      <div class="ui-divider">
        <label class="divider-text">资金将实时转入对方账户，无法退款</label>
      </div>
      <my-forms ref="ref-forms-regist"
         className="test-form"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent">
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item lab3-txt7-icon">
            <span class="form-item-lab">收款方会员名称</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" data-close="false" placeholder="请输入收款方车云宝会员名" data-key="memberName" v-model="formData.memberName" />
            </span>
            <a href="javascript:;" class="icon-history-user" @click="toChooseHistory"></a>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">收款方会员ID</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入收款方车云宝会员ID" data-key="memberId" v-model="formData.memberId" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block">
          <ad-list />
        </div>
        <div slot="form-block" class="ui-form-block form-block-button">
          <div class="ui-form-item full">
            <a href="javascript:;" class="ui-button j-verify-submit">下一步</a>
          </div>
        </div>
      </my-forms>
      <tip-popup ref="tip-popup"  />
    </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
