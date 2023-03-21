import * as echarts from 'echarts'

import { onUnmounted } from 'vue'

export default function useEcharts(divEl) {
  const echartINstance = echarts.init(divEl, null, { renderer: 'svg' })

  onUnmounted(() => {
    echartINstance.dispose() // 注销实例
  })

  // 未了方便该hooks 使用
  function setOption(option) {
    echartINstance.setOption(option)
  }

  function resizeEcharts() {
    echartINstance.resize()
  }
  return {
    setOption,
    echartINstance,
    resizeEcharts
  }
}
