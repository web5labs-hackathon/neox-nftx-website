<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div>
    <div class="my-[3rem] relative">
      <img src="@/assets/home/cover.png" alt="">
      <div class="cover-text text-center text-[3rem] absolute top-1/2 left-0 -translate-y-1/2 w-full max-lg:text-[2.5rem]">
        A well-known NFT launch platform on the NEOX <br> platform <br>Incubated by the NEO community
      </div>
    </div>
    <div class="title text-[2.25rem] mt-[3.8125rem] h-[9.1875rem] flex items-center justify-center">
      <span>Artwork creation platform on NEO X</span>
      &nbsp;
      <span class="gradient-text">
        chain
      </span>
    </div>
    <div>
      <div class="p-container">
        <img src="@/assets/home/p1.png" alt="">
        <div>
          <div class="p-content">
            <p>
              Create freely and use your imagination
            </p>
            <p>
              Create great works！
            </p>
          </div>
          <img class="absolute max-w-[60%] max-h-[80%] right-0 bottom-0 z-[-1]" src="@/assets/home/rocket.png" alt="">
        </div>
      </div>
      <div class="p-container">
        <div>
          <div class="p-content">
            <p>
              Powerful NFT generation tool.
            </p>
            <p>
              You are only responsible for the creativity！
            </p>
          </div>
          <img class="max-w-[3rem] max-h-[3rem] absolute right-[5.25rem] bottom-0 z-[1]" src="@/assets/home/p2-image.png" alt="">
        </div>
        <img src="@/assets/home/p2.png" alt="">
      </div>
      <div class="p-container">
        <img src="@/assets/home/p3.png" alt="">
        <div>
          <div class="p-content">
            <p>
              Works are put on the chain for permanent storage
            </p>
            <p>
              Powerful community drives value discovery
            </p>
          </div>
          <img class="max-w-[3rem] max-h-[3rem] absolute right-[2.625rem] bottom-0 z-[1]" src="@/assets/home/p3-image.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cover-text {
  text-shadow: 2px 2px 50px #000000;
}
.title {
  background: rgba(255, 255, 255, 1);
  box-shadow: -1px -3px 8px rgba(0, 0, 0, 0.1);
  .gradient-text {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(90deg, #2baed3 0%, #ff9696 55.1%, #33205f 100%);
  }
}
.p-container {
  &:nth-child(2) {
    background: #f9f9fa;
    box-shadow: -1px -2px 8px rgba(0, 0, 0, 0.125);
    & > div {
      @apply pr-[6.25rem] pl-[2.625rem] relative;
    }
  }
  @apply grid grid-cols-2 py-[6.4375rem] items-center;
  & > img {
    @apply w-full h-auto;
  }
  & > div {
    @apply relative pl-[6.25rem] pr-[2.625rem];
    & > .p-content {
      @apply text-[3rem] flex flex-col space-y-6 justify-between;
    }
  }
}
</style>
