<!--
 * 流程状态页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月19日15:30:38
-->

<template>
  <div :class="'page-main page-process-status ' + ($store.state.ProcessStatusStore.btnWrapClass) + (adStatus && adModel !== 'static' ? ' ad-padding' : (adModel === 'static' ? ' ad-static' : ''))">
    <div :class="'indentity-verify-wrap icon-status-' + $store.state.ProcessStatusStore.status">
      <div class="verify-result" v-if="$store.state.ProcessStatusStore.result">{{$store.state.ProcessStatusStore.result}}</div>
      <div class="verify-result-remark" v-if="$store.state.ProcessStatusStore.remark">{{$store.state.ProcessStatusStore.remark}}</div>
    </div>
    <div class="process-status-form" v-if="processStatusForms">
      <process-status-form>
        <div slot="form-block" class="ui-form-block"
          v-for="(formItem, idx) in processStatusForms" :key="idx">
          <div :class="'ui-form-item' + (item.class ? ' ' + item.class : '')"
            v-for="(item, iidx) in formItem" :key="iidx">
            <span class="form-item-lab">{{item.label}}</span>
            <span class="form-item-txt">{{item.text}}</span>
          </div>
        </div>
      </process-status-form>
    </div>
    <div :class="'ad-span' + (adModel === 'static' ? ' static' : '')" v-if="adStatus">
      <ad-list :adList="adList" />
    </div>
    <div class="button-wrap" @click="buttonsClickEvent">
      <a href="javascript:;" :class="'ui-button full ' + (button.class || '')"
        v-for="(button, idx) in processStatusButtons"
        :key="idx"
        :data-key="idx">
        {{button.text}}
      </a>
    </div>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
