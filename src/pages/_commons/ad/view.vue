<!--
 * 页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年8月21日14:03:40
-->

<template>
    <div class="page-ad">
      <div class="ad-common">
        <Swiper interval="3600">
          <Slide v-for="(item, index) in adListData" :key="index">
            <img :src="item.url" :alt="item.alt" />
          </Slide>
        </Swiper>
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
