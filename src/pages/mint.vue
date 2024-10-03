<script setup lang="ts">
import type { TabsInstance } from 'element-plus'
import FileSaver from 'file-saver'
import _ from 'lodash'
import { ref } from 'vue'
import { TRAITS } from '../../public/traits'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const hasJiguangyan = ref<boolean>(false)
const tabPosition = ref<TabsInstance['tabPosition']>('left')
const imgDataURI = ref<string>('')

function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}
const pfp = ref({
  Yanjing: null,
  Bizi: null,
  Zuiba: null,
  Mianbuzhuangshi: null,
  Yanbuzhuangshi: null,
  Faxing: null,
})
function reset() {
  hasJiguangyan.value = false
  pfp.value = {
    Yanjing: null,
    Bizi: null,
    Zuiba: null,
    Mianbuzhuangshi: null,
    Yanbuzhuangshi: null,
    Faxing: null,
  }
}
function random() {
  reset()
  pfp.value = getRandomTraits() as any
}
function getRandomTraits() {
  const randomTraits: {
    Yanjing?: null | string
    Bizi?: null | string
    Zuiba?: null | string
    Mianbuzhuangshi?: null | string
    Yanbuzhuangshi?: null | string
    Faxing?: null | string
  } = {}
  TRAITS.forEach((item, index) => {
    randomTraits[item.title] = _.sample(TRAITS[index].list)?.img
  })

  const randomPercentage = Math.floor(Math.random() * 100)

  if (randomPercentage < 80) {
    randomTraits.Yanbuzhuangshi = null
  }

  if (randomPercentage < 60) {
    randomTraits.Mianbuzhuangshi = null
  }

  if (randomTraits.Mianbuzhuangshi === '/traits/Mianbuzhuangshi/Huzi.png') {
    randomTraits.Bizi = null
    randomTraits.Zuiba = null
  }
  if (randomTraits.Yanbuzhuangshi === '/traits/Yanbuzhuangshi/Mojing.png') {
    randomTraits.Yanjing = null
  }

  return randomTraits
}
async function setPfp() {
  if (!canvasRef.value)
    return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx)
    return
  ctx.clearRect(0, 0, 600, 600)
  ctx.beginPath()
  ctx.rect(0, 0, 600, 600)
  ctx.fillStyle = '#fff'
  ctx.fill()

  const images: string[] = ['/traits/Lian.jpg']
  Object.keys(pfp.value).forEach((pfpKey) => {
    if (pfp.value[pfpKey])
      images.push(pfp.value[pfpKey])
  })
  // always move Faxing to the end
  images.push(
    images.splice(
      images.findIndex(img => img.includes('Faxing')),
      1,
    )[0],
  )
  if (hasJiguangyan.value) {
    images.push('/traits/Jiguangyan/Jiguangyan.png')
  }
  const imagesObj = await Promise.all(images.map(loadImage))

  imagesObj.forEach((image: any) => {
    ctx.drawImage(image, 0, 0)
  })

  imgDataURI.value = canvasRef.value.toDataURL('image/png')
}
watch([pfp, hasJiguangyan], async () => {
  setPfp()
}, {
  deep: true,
})
onMounted(() => {
  setPfp()
})
function changePFP(key: string, img: string) {
  if (pfp.value[key] !== img)
    pfp.value[key] = img
  else
    pfp.value[key] = null
}
function download() {
  if (!canvasRef.value)
    return
  canvasRef.value.toBlob((imageBlob) => {
    if (!imageBlob)
      return
    FileSaver.saveAs(imageBlob, 'NFTX.png')
  })
}
</script>

<template>
  <div class="py-[5rem] lg:flex space-x-48 items-center justify-center">
    <ElTabs class="nft-tabs" :tab-position="tabPosition">
      <ElTabPane v-for="item in TRAITS" :key="item.title" :label="item.name" class="grid grid-cols-4 gap-2 w-fit">
        <div
          v-for="i in item.list" :key="i.name"
          @click="changePFP(item.title, i.img)"
        >
          <ElPopover
            placement="right"
            :width="300"
            popper-style="width:fit-content;"
          >
            <template #reference>
              <div class="border-[2px] border-[#ccc] border-opacity-60 shadow-sm ">
                <div class="relative">
                  <img class="w-[3.75rem] h-[3.75rem] aspect-square" :src="i.img" :alt="i.name">
                  <img src="/traits/Lian.png" class="absolute w-[3.75rem] h-[3.75rem] aspect-square top-0 left-0 z-[-1]" alt="">
                </div>
                <div class="text-[0.875rem] text-center bg-[#eee]">
                  {{ i.name }}
                </div>
              </div>
            </template>
            <div class="relative">
              <img class="w-[7.5rem] h-[7.5rem] aspect-square" :src="i.img" :alt="i.name">
              <img src="/traits/Lian.png" class="absolute w-[7.5rem] h-[7.5rem] aspect-square top-0 left-0 z-[-1]" alt="">
            </div>
            <div class="text-[0.875rem] text-center bg-[#eee]">
              {{ i.name }}
            </div>
          </ElPopover>
        </div>
      </ElTabPane>
    </ElTabs>
    <div>
      <div class="border-[2px] border-[#ccc] border-opacity-60 shadow-sm">
        <img
          class="w-[17.5rem]"
          :src="imgDataURI" alt=""
        >
      </div>
      <canvas
        ref="canvasRef"
        width="600"
        height="600"
        class="hidden"
      />
      <ElCheckbox v-model="hasJiguangyan" label="添加激光眼" size="large" />
      <div class="flex items-center justify-between">
        <div>
          <ElButton type="primary" @click="download">
            下载头像
          </ElButton>
        </div>
        <div>
          <ElButton @click="random">
            随机生成
          </ElButton>
          <ElButton @click="reset">
            重置
          </ElButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
