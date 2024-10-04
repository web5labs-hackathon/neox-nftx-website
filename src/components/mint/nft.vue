<script setup lang="ts">
import { useAppKit } from '@reown/appkit/vue'
import { useAccount, useWriteContract } from '@wagmi/vue'
import { fromAsyncThrowable } from 'neverthrow'
import { toast } from 'vue-sonner'
import { NFTX } from './NFTX'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

const { open } = useAppKit()
const { isConnected } = useAccount()
const { writeContractAsync, error, isPending } = useWriteContract()

watch(error, (error) => {
  if (error) {
    if (error.name === 'ContractFunctionExecutionError') {
      toast.error(error.shortMessage)
    }
    else {
      toast.error(error.message)
    }
    console.warn(error)
  }
})

const mintNFT = fromAsyncThrowable(async () => {
  const trxHash = await writeContractAsync({
    abi: NFTX.abi,
    address: contractAddress,
    functionName: 'mint',
    args: [BigInt(1)],
  })
  console.info(trxHash)
})
</script>

<template>
  <ElButton
    type="primary"
    size="large"
    class="mx-auto !px-[1.5rem] !py-[1.25rem] !h-[3rem] !text-[1.25rem]"
    :disabled="isPending"
    @click="() => isConnected ? mintNFT() : open()"
  >
    {{ isConnected ? isPending ? 'MINTING...' : 'MINT' : 'CONNECT WALLET' }}
  </ElButton>
</template>

<style scoped>

</style>
