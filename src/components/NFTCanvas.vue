<script setup lang="ts">
import { defineProps, toValue, watch } from 'vue'

const { model, laserEyes } = defineProps<{
  model: {
    eye: string | undefined
    nose: string | undefined
    mouth: string | undefined
    facialDecoration: string | undefined
    eyeDecoration: string | undefined
    hairstyle: string | undefined
  }
  laserEyes: boolean
}>()

const canvas = useTemplateRef('canvas')

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve(img)
    img.onerror = reject
  })
}

async function draw() {
  const ctx = canvas.value?.getContext('2d')

  if (!canvas.value || !ctx)
    return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.beginPath()
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.closePath()

  const face = await loadImage('/traits/Lian.png')
  const modelObj = toValue(model)
  const keys = Object.keys(modelObj) as (keyof typeof model)[]
  const images = await Promise.all(
    keys
      .filter(key => modelObj[key] !== undefined && key !== 'hairstyle')
      .map(key => loadImage(modelObj[key]!.toString())),
  )

  const drawImages = [face, ...images]

  if (model.hairstyle) {
    drawImages.push(await loadImage(model.hairstyle))
  }

  if (laserEyes) {
    drawImages.push(await loadImage('/traits/Jiguangyan/Jiguangyan.png'))
  }

  for (const img of drawImages) {
    ctx.drawImage(img, 0, 0)
  }
}

watch(() => [toValue(model), toValue(laserEyes)], () => {
  draw()
}, { deep: true, immediate: true })

onMounted(() => draw())

defineExpose({
  save() {
    canvas.value?.toBlob((blob) => {
      if (!blob)
        return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'nft.png'
      a.click()
      URL.revokeObjectURL(url)
    })
  },
})
</script>

<template>
  <canvas ref="canvas" width="600" height="600" />
</template>

<style scoped lang="scss">
/* Add any styles you need */
</style>
