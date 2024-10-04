<script setup lang="ts">
import type { TabsInstance } from 'element-plus'
import _ from 'lodash'
import { ref } from 'vue'
import { TRAITS } from '../lib/traits'

const kDefaultModel = {
  eye: undefined as string | undefined,
  nose: undefined as string | undefined,
  mouth: undefined as string | undefined,
  facialDecoration: undefined as string | undefined,
  eyeDecoration: undefined as string | undefined,
  hairstyle: undefined as string | undefined,
}

const nftCanvas = useTemplateRef('nftCanvas')
const tabPosition = ref<TabsInstance['tabPosition']>('left')
const laserEyes = ref(false)
const model = reactive({ ...kDefaultModel })

function download() {
  nftCanvas.value?.save()
}

function random() {
  TRAITS.forEach((item, _index) => {
    model[item.title as keyof typeof kDefaultModel] = _.sample(item.list)?.img
  })
  const randomPercentage = Math.floor(Math.random() * 100)
  if (randomPercentage < 80) {
    model.eyeDecoration = undefined
  }
  if (randomPercentage < 60) {
    model.facialDecoration = undefined
  }
  if (model.facialDecoration === '/traits/Mianbuzhuangshi/Huzi.png') {
    model.nose = undefined
    model.mouth = undefined
  }
  if (model.eyeDecoration === '/traits/Yanbuzhuangshi/Mojing.png') {
    model.eye = undefined
  }
}

function reset() {
  Object.assign(model, kDefaultModel)
}
</script>

<template>
  <div class="min-h-[80vh] max-brand:mx-[2rem]">
    <div class="mt-[2rem] text-center text-[1.5rem]">
      You can play to generate your favorite meme NFT in NEOX eco （current in bate version, the picture maybe replaced in the future）
    </div>
    <div class="py-[5rem] flex max-lg:flex-col max-lg:items-center lg:space-x-48 max-lg:space-y-8 justify-center">
      <ElTabs class="nft-tabs" :tab-position="tabPosition">
        <ElTabPane v-for="item in TRAITS" :key="item.title" :label="item.name" class="grid grid-cols-4 gap-2 w-fit">
          <div
            v-for="i in item.list" :key="i.name"
            class="cursor-pointer select-none"
            @click="model[item.title as keyof typeof kDefaultModel] = i.img"
          >
            <ElPopover
              placement="right"
              :width="300"
              popper-style="width:fit-content;pointer-events: none;"
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
              <div class="relative aspect-square">
                <img src="/traits/Lian.png" class="absolute w-[7.5rem] h-[7.5rem] aspect-square top-0 left-0 z-[-1]" alt="">
                <img class="w-[7.5rem] h-[7.5rem] aspect-square" :src="i.img" :alt="i.name">
              </div>
              <div class="text-[0.875rem] text-center bg-[#eee]">
                {{ i.name }}
              </div>
            </ElPopover>
          </div>
        </ElTabPane>
      </ElTabs>
      <div class="mt-[3rem] max-lg:w-[60vw] mx-auto">
        <NFTCanvas
          ref="nftCanvas" class="size-[17.5rem] max-lg:w-full border-2 border-[#ccc] border-opacity-60 shadow-sm mx-auto"
          :model :laser-eyes
        />
        <ElCheckbox v-model="laserEyes" label="添加激光眼" size="large" />
        <div class="flex items-center justify-between">
          <div>
            <ElButton color="#000000" @click="download">
              下载头像
            </ElButton>
          </div>
          <div class="ml-4">
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
    <div class="w-full flex flex-col items-center space-y-4 mb-[3rem]">
      <p class="text-[1.25rem] ">
        A total of 111 selected community NFT meme images are publicly available. Click the button below to randomly mint your NFT.
      </p>

      <MintNft />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
