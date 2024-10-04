<script setup lang="ts">
import { useAppKit } from '@reown/appkit/vue'
import { useAccount, useSwitchChain, useWriteContract } from '@wagmi/vue'
import { fromAsyncThrowable } from 'neverthrow'
import { parseEther } from 'viem'
import { toast } from 'vue-sonner'
import { NFTX } from './NFTX'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

const { open } = useAppKit()
const { isConnected, isConnecting, address } = useAccount()
const { writeContractAsync, error, isPending } = useWriteContract()
const { chains, switchChainAsync } = useSwitchChain()

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
  await switchChainAsync({ chainId: chains.value[0].id })
  const trxHash = await writeContractAsync({
    abi: NFTX.abi,
    address: contractAddress,
    functionName: 'mint',
    args: [parseEther('1')],
  })
  toast.success(`Minting NFT... Transaction Hash: ${trxHash}`)
  console.info('📔 Transaction Hash:', trxHash)
})
</script>

<template>
  <div class="grid place-items-center space-y-4">
    <p>{{ address }}</p>
    <ElButton
      type="primary"
      size="large"
      class="mx-auto !px-[1.5rem] !py-[1.25rem] !h-[3rem] !text-[1.25rem]"
      :disabled="isPending || isConnecting"
      @click="() => isConnected ? mintNFT() : open()"
    >
      {{ isConnecting ? 'CONNECTING...' : isConnected ? isPending ? 'MINTING...' : 'MINT' : 'CONNECT WALLET' }}
    </ElButton>
  </div>
</template>

<style scoped>

</style>
