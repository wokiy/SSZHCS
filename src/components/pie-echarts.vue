<template>
  <!-- 组件接受两个参数：width height -->
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import useEcharts from '@/hooks/useEchart'

// 接受传入的参数 width height data

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  },
  echartDatas: {
    type: Array,
    default: function () {
      return []
    }
  }
})
// 图需要变化 watch数据监听
// watch(
//   () => [message.value, count.value],
//   ([messageVal, messagePreVal], [countVal, countPreVal]) => {
//     //监听多个源用数组传入
//     console.log('messageVal,messagePreVal', messageVal, messagePreVal)
//     console.log('countVal,countPreVal', countVal, countPreVal)
//   }
// )
watch(
  () => props.echartDatas,
  (newV) => {
    setupEchart(newV)
  }
)
// 拿到dom 节点
let divRef = ref(null)
let hyChart = null
onMounted(() => {
  setupEchart(props.echartDatas) // 第一次图实现
})

// 构造图方法
function setupEchart(echartDatas) {
  if (!hyChart) {
    // 拿到echartshooks实例
    hyChart = useEcharts(divRef.value)
  }
  let option = getOption(echartDatas)
  hyChart.setOption(option)
}
// 拿到echarts 配置数据option
function getOption(pieDatas = []) {
  // 处理配置项的数据
  // 返回一个新数组
  let colors = pieDatas.map((item) => {
    return item.color
  })
  let data = pieDatas.map((item) => {
    return {
      value: item.value,
      name: item.name
    }
  })
  // arr.reduce(callback,[initialValue])
  // index是从0开始的，第一次的prev的值是我们设置的初始值0
  let total = pieDatas.reduce((a, b) => {
    return a + b.value * 1
  }, 0)

  let option = {
    color: colors,
    title: {
      text: `{nameSty| 充电桩总数}\n{number|${total}}`,
      top: '50%',
      left: '30%',
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 19,
            color: 'white',
            padding: [10, 0]
          },
          number: {
            fontSize: 24,
            color: 'white',
            padding: [4, 0, 0, 20]
          }
        }
      }
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: '18%',
      itemGap: 20,
      itemWidth: 16,
      itemHeigth: 16,
      icon: 'rect',
      formatter: function (name) {
        var currentItem = pieDatas.find((item) => item.name === name)
        return (
          '{nameSty|' +
          currentItem.name +
          '}\n' +
          '{numberSty|' +
          currentItem.value +
          '个 }' +
          '{preSty|' +
          currentItem.percentage +
          '}'
        )
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: '#FFFFFF',
            padding: [10, 14]
          },
          numberSty: {
            fontSize: 12,
            color: '#40E6ff',
            padding: [0, 0, 0, 14]
          },
          preSty: {
            fontSize: 12,
            color: '#40E6ff'
          }
        }
      }
    },
    series: [
      {
        type: 'pie',
        center: ['40%', '57%'],
        radius: ['30%', '75%'],
        label: {
          show: false
        },
        data: data,
        roseType: 'area'
      }
    ]
  }
  return option
}
</script>

<style lang="less" scoped></style>
