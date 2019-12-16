<!--
 * 二维码收款 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月9日22:05:29
-->

<template>
  <div class="page-main page-collection-index">
    <pos-list-item :dataset="posList" :boxShadow="false" />
    <collection-form class="collection-form">
      <div slot="form-block" class="ui-form-block">
        <div class="ui-form-item">
          <span class="form-item-lab">备注</span>
          <span class="form-item-inp">
            <input type="text" class="form-inp" placeholder="请输入备注信息" data-key="remark" v-model="formData.remark" />
          </span>
        </div>
      </div>
      <div slot="form-block" class="ui-form-block form-block-button">
        <div class="ui-form-item full">
          <a href="javascript:;" class="ui-button j-verify-submit" @click="surePay">确认支付</a>
        </div>
      </div>
      <div slot="form-block" class="ui-form-block form-block-remark">{{technicalSupport}}</div>
    </collection-form>
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
