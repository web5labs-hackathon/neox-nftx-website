<script setup lang="ts">
const list = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Roadmap',
    link: '/roadmap',
  },
  {
    title: 'Mint',
    link: '/mint',
  },
  {
    title: 'About',
    link: '/about',
  },
]
const route = useRoute()
const router = useRouter()
const defaultMenu = ref(route.path)
watch(() => route.path, (path) => {
  defaultMenu.value = path
})
</script>

<template>
  <div class="bg-[#050505] w-full h-[3.125rem] px-[2rem] text-[1.125rem]">
    <div class="max-w-[76.25rem] h-full flex items-center justify-between mx-auto">
      <img class="h-[1.625rem]" src="@/assets/logo/logo-white.png" alt="">
      <ul class="flex items-center space-x-[6.25rem]">
        <li
          v-for="i in list"
          :key="i.title" class="text-[#fff]"
          :class="defaultMenu === i.link ? 'text-opacity-100' : 'text-opacity-80'"
          @click="router.push(i.link)"
        >
          {{ i.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
