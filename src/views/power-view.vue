<template>
  <main class="screen-bg">
    <div class="header"></div>
    <!-- 电池桩饱和比例 -->
    <div class="left-top">
      <pie-echarts :echartDatas="chargingPile"></pie-echarts>
    </div>
  </main>
</template>

<script setup>
import PieEcharts from '../components/pie-echarts.vue'
import { chargingPileData } from './config/home-data'
import { ref } from 'vue'
import { getPwerScreenData } from '../service'
// 获取data数据:本地数据
let chargingPile = ref(chargingPileData)

// 获取网络数据
getPwerScreenData().then((res) => {
  chargingPile.value = res.data.chargingPile.data
})
</script>

<style lang="scss" scoped>
.screen-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  /* 背景 */
  background-image: url(@/assets/images/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .header {
    position: absolute;
    top: 21px;
    left: 0;
    right: 0;
    height: 56px;
    background-image: url(@/assets/images/bg_header.svg);
    background-repeat: no-repeat;
  }
  // 定位
  .left-top {
    position: absolute;
    top: 116px;
    left: 16px;
    width: 536px;
    height: 443px;
    // svg背景图
    background-image: url(@/assets/images/bg_left-top.svg);
    background-repeat: no-repeat;
  }
}
</style>
