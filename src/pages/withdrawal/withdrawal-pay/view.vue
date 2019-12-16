<!--
 * 银行账户管理 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月18日22:16:53
-->

<template>
    <div class="page-main page-main-accountmanage">
      <!-- <div class="tab-hd">
        <div class="tab-hd-wrap" @click="tabClickEvent">
          <a :class="'tab-route-item' + (route.active ? ' active' : '')"
            v-for="(route, idx) in tabRoutes" :key="idx"
            :data-key="route.key">{{route.text}}</a>
        </div>
      </div> -->
      <div class="withdrawal-pay" @click="withdrawalClick">
        <dataset :dataset="dataset"
          scrollClass="list-scroll"
          nullPlaceComponent="process-status">
          <div slot="dataset-list">
            <div :class="'bank-item '+ withdrawInfo.bankCode">
              <div class="bank-info">
                <div class="bank-name">{{withdrawInfo.bankName}}</div>
                <div class="bank-type">{{withdrawInfo.bankCardTypeText}}</div>
              </div>
            </div>
            <pos-list-item :dataset="posList" :boxShadow="false" :onBlur="inputBlurEvent" />
            <my-forms class="my-forms">
              <div slot="form-block" class="ui-form-block">
                <div class="ui-form-item no-border">
                  <span class="form-item-lab color-gray">服务费</span>
                  <span class="form-item-txt">￥{{withdrawChargeInfo.chargeAmount}}</span>
                </div>
                <div class="ui-form-item no-border">
                  <span class="form-item-lab color-gray">扣款金额</span>
                  <span class="form-item-txt">￥{{withdrawChargeInfo.amount}}</span>
                </div>
                <div class="ui-form-item no-border">
                  <span class="form-item-lab color-gray">实际到账</span>
                  <span class="form-item-txt font-weight">￥{{withdrawChargeInfo.realAmount}}</span>
                </div>
              </div>
              <div slot="form-block" class="ui-form-block">
                <ad-list />
              </div>
              <div slot="form-block" class="ui-form-block form-block-button">
                <div class="ui-form-item full">
                  <a href="javascript:;" :class="'ui-button j-verify-submit ' + (submitBtnStatus ? '' : 'button-disabled')" @click="sureToWithdrawal">确认提现</a>
                </div>
              </div>
            </my-forms>
          </div>
        </dataset>
      </div>
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
          <a href="javascript:;" class="ui-button" @click="sureWithdrawal">确认支付</a>
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
