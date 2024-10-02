<script setup lang="ts">

</script>

<template>
  <div>
    <img class="w-full max-h-[600px] aspect-[1/2] object-cover" src="@/assets/about/cover.png" alt="">
    <div>
      <div class="p-container">
        <h1>
          Who we are？
        </h1>
        <p class="text-[3rem]">
          We are Web5 Labs, a studio dedicated to building various convenient and easy-to-use software and hardware systems for people who are interested in blockchain.
        </p>
      </div>
      <div class="p-container">
        <h1>
          Why do this project?
        </h1>
        <p class="text-[2.25rem]">
          We are Web5 Labs, a studio dedicated to building various convenient and easy-to-use software and hardware systems for peoplThe launch of NEOX makes it easier to write contracts in solidity on Neo. It is a cause for celebration for the NEO community. NFT, as the core concept of crypto art, can link holders and creators with a low threshold. It can bring a large number of potential new users to the NEO community. The NFTX project can play an important role in this process.e who are interested in blockchain.
        </p>
      </div>
      <div class="p-container">
        <h1>
          Future Outlook
        </h1>
        <p class="text-[2.25rem]">
          We are Web5 Labs, a studio dedicated to building various convenient and easy-to-use software and hardware systems for peoplThe launch of NEOX makes it easier to write contracts in solidity on Neo. It is a cause for celebration for the NEO community. NFT, as the core concept of crypto art, can link holders and creators with a low threshold. It can bring a large number of potential new users to the NEO community. The NFTX project can play an important role in this process.e who are interested in blockchain.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.p-container {
  @apply py-[4rem] flex flex-col space-y-6 justify-between text-center px-[2rem];
  &:nth-child(odd) {
    background: #f9f9fa;
    box-shadow: -1px -2px 8px rgba(0, 0, 0, 0.125);
  }

  h1 {
    @apply text-[4.5rem];
  }
  p {
    @apply max-w-[60rem] mx-auto  text-[#000] text-opacity-60;
  }
}
</style>
