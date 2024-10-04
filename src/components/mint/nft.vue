<script setup lang="ts">
import type { JsonRpcSigner } from 'ethers'
import { ethers } from 'ethers'
import contract from './NFTX.json'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
const contractABI = contract.abi
async function connectWallet() {
  const signer = ref<JsonRpcSigner | null>(null)

  let provider
  if ((window as any).ethereum == null) {
    console.log('MetaMask not installed; using read-only defaults')
    provider = new ethers.JsonRpcProvider('https://neoxt4seed1.ngd.network')
  }
  else {
    provider = new ethers.BrowserProvider((window as any).ethereum)
    signer.value = await provider.getSigner()
  }
}

async function mintNFT() {
  try {
    const web3Provider = new ethers.BrowserProvider((window as any).ethereum)
    const signer = await web3Provider.getSigner()

    // 连接钱包到合约
    const nftContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer,
    )

    // 执行合约方法

    const mintTokens = async () => {
      if (!nftContract)
        return
      const amount = 1
      try {
        console.log('Minting', amount, 'tokens')
        const tx = await nftContract.mint(amount, { gasLimit: 300000 })
        console.log('tx:', tx)
        await tx.wait()
        console.log('Mint transaction:', tx.hash)
      }
      catch (error) {
        console.error('Error during token minting:', error)
      }
    }

    // 等待交易确认
    await mintTokens()
  }
  catch (error: any) {
    return {
      success: false,
      status: `😥 Something went wrong: ${error.message}`,
    }
  }
}
</script>

<template>
  <ElButton type="primary" size="large" class="mx-auto !px-[1.5rem] !py-[1.25rem] !h-[3rem] !text-[1.25rem]" @click="connectWallet">
    MINT
  </ElButton>
  <ElButton type="primary" size="large" class="mx-auto !px-[1.5rem] !py-[1.25rem] !h-[3rem] !text-[1.25rem]" @click="mintNFT()">
    MINT
  </ElButton>
</template>

<style scoped>

</style>
