<script setup lang="ts">
import { useAppKit } from '@reown/appkit/vue'
import { useAccount, useWriteContract } from '@wagmi/vue'
import { fromAsyncThrowable } from 'neverthrow'
import { NFTX } from './NFTX'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

const { open } = useAppKit()
const { isConnected } = useAccount()
const { writeContractAsync } = useWriteContract()

const mintNFT = fromAsyncThrowable(async () => {
  try {
    const trxHash = await writeContractAsync({
      abi: NFTX.abi,
      address: contractAddress,
      functionName: 'mint',
      args: [BigInt(1)],
    })
    console.info(trxHash)
  }
  catch (err) {
    console.warn(err)
  }
})
</script>

<template>
  <ElButton
    type="primary"
    size="large"
    class="mx-auto !px-[1.5rem] !py-[1.25rem] !h-[3rem] !text-[1.25rem]"
    @click="() => isConnected ? mintNFT() : open()"
  >
    {{ isConnected ? 'MINT' : 'CONNECT WALLET' }}
  </ElButton>
</template>

<style scoped>

</style>
