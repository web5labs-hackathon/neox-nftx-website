<script setup lang="ts">
import { useAppKit } from '@reown/appkit/vue'
import { useAccount, useSwitchChain, useWriteContract } from '@wagmi/vue'
import { fromAsyncThrowable } from 'neverthrow'
import { parseEther } from 'viem'
import { toast } from 'vue-sonner'
import { NFTX } from './NFTX'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

const { open } = useAppKit()
const { isConnected, isConnecting, address, chain } = useAccount()
const { writeContractAsync, error, isPending } = useWriteContract()
const { chains, switchChainAsync } = useSwitchChain()
const transactionHash = ref<string>()

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
  transactionHash.value = undefined
  await switchChainAsync({ chainId: chains.value[0].id })
  console.info('MINT')
  const trxHash = await writeContractAsync({
    abi: NFTX.abi,
    address: contractAddress,
    functionName: 'mint',
    value: parseEther('0.01'),
    args: [BigInt(1)],
  })
  toast.success(`Minting NFT... Transaction Hash: ${trxHash}`)
  transactionHash.value = trxHash
  console.info('📔 Transaction Hash:', trxHash)
})

const explorerUrl = computed(() => {
  const chainExplorerUrl = chain.value?.blockExplorers?.default.url
  if (chainExplorerUrl) {
    return `${chainExplorerUrl}/tx/${transactionHash.value}`
  }
  return `https://xt4scan.ngd.network/tx/${transactionHash.value}`
})
</script>

<template>
  <div class="grid place-items-center space-y-4">
    <ElButton
      type="primary"
      size="large"
      class="mx-auto !px-[1.5rem] !py-[1.25rem] !h-[3rem] !text-[1.25rem]"
      :disabled="isPending || isConnecting"
      @click="() => isConnected ? mintNFT() : open()"
    >
      {{ isConnecting ? 'CONNECTING...' : isConnected ? isPending ? 'MINTING...' : 'MINT' : 'CONNECT WALLET' }}
    </ElButton>

    <p v-if="address">
      YOUR ADDRESS: {{ address }}
    </p>

    <p v-if="transactionHash" class="text-center">
      The Most Recent Transaction Hash:<br>
      <a class="text-blue-500 decoration-blue-600 underline" :href="explorerUrl" title="View in Explorer" target="_blank">
        {{ transactionHash }}
      </a>
    </p>
  </div>
</template>

<style scoped>

</style>
