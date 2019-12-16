<!--
 * 注册页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:53
-->

<template>
    <div class="page-main page-history-member">
      <my-forms>
        <div slot="form-block" class="ui-form-block form-block-remark text-left">
          请选择历史收款人
        </div>
        <div slot="form-block" class="ui-form-block form-block-remark" v-if="!transferHisQueryVos || !transferHisQueryVos.length">无历史收款人</div>
        <div slot="form-block" class="ui-form-block form-block-choose" @click="formClick">
          <div class="ui-form-item" v-for="(item, idx) in transferHisQueryVos" :key="idx">
            <span class="item-mask j-item-mask" :data-id="item.payeeUserNo"></span>
            <span class="form-item-title">{{item.payeeUserName}}</span>
            <span class="form-item-remark">{{item.payeeUserNo}}</span>
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
