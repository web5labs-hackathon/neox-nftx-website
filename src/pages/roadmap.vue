<script setup lang="ts">

</script>

<template>
  <div class="pt-[2rem]">
    <h1 class="text-[3rem]">
      Keep up with the progress.
    </h1>
    <p class="text-[1.5rem] text-opacity-[0.6] text-[#000] mt-[0.5rem]">
      Our developers are hard at work. Stay up to date on the latest releases from the Neo X team.
    </p>
    <div class="mt-[3rem]">
      <div class="p-container">
        <img src="@/assets/roadmap/p1.png" alt="">
        <div>
          <div class="p-content">
            <h1>
              August 2024
            </h1>
            <p>
              Team formation, project approval, requirements determination, IP hand-drawing, development started
            </p>
          </div>
        </div>
      </div>
      <div class="p-container">
        <div>
          <div class="p-content">
            <h1>
              September 2024
            </h1>
            <p>
              Demo launched, operation team established, inviting community artists and opinion leaders to join
            </p>
          </div>
        </div>
        <img src="@/assets/roadmap/p2.png" alt="">
      </div>
      <div class="p-container">
        <img src="@/assets/roadmap/p3.png" alt="">
        <div>
          <div class="p-content">
            <h1>
              October 2024
            </h1>
            <p>
              Develop NFTX 2.0. Goal: Allow people who don’t understand technology to freely import the designer’s design, automatically disassemble the elements after importing, and automatically generate a page that can be minted.
            </p>
          </div>
        </div>
      </div>
      <div class="p-container">
        <div>
          <div class="p-content">
            <h1>
              December 2024
            </h1>
            <p>
              Excellent applications on the BTC network are scarce. Increase support for the BTC network. Import BTC's high-quality assets and users into NEOX
            </p>
          </div>
        </div>
        <img src="@/assets/roadmap/p4.png" alt="">
      </div>
      <div class="p-container">
        <img src="@/assets/roadmap/p5.png" alt="">
        <div>
          <div class="p-content">
            <h1>
              February 2025
            </h1>
            <p>
              Team formation, project approval, requirements determThe focus is on solving the rights, sales (pre-sales) and empowerment issues after the NFT is generated. It is truly a one-stop solution to all the problems of creators.ination, IP hand-drawing, development started
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.p-container {
  &:nth-child(odd) {
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
      @apply flex flex-col space-y-6 justify-between;
      h1 {
        @apply text-[3rem];
      }
      p {
        @apply text-[2.25rem] text-[#000] text-opacity-60;
      }
    }
  }
}
</style>
