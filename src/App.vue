<template>
  <!-- 路由占位 -->
  <RouterView />
</template>
<script setup>
import { RouterView } from 'vue-router'
import useScalePage from '@/hooks/useScalePage'

let option = {
  targetX: 1920,
  targetY: 1080,
  targetRatio: 16 / 9
}
// 大屏适配
useScalePage(option)
</script>
<style scoped lang="scss"></style>
