import type { App } from 'vue'
import { type CaipNetwork, createAppKit, getAppKit } from '@reown/appkit/vue'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { WagmiPlugin } from '@wagmi/vue'
import { injected } from 'wagmi/connectors'

const projectId = '3a0381ab4ccd2041e67efac43dd8ed96'

// 2. Create a metadata object - optional
const metadata = {
  name: 'NFTX',
  description: 'NFTX',
  url: window.location.origin, // origin must match your domain & subdomain
  icons: [`${window.location.origin}/favicon.png`],
}

export const networks = [{
  id: `eip155:1`,
  name: 'NeoX T4',
  rpcUrl: 'https://neoxt4seed1.ngd.network',
  currency: 'GAS',
  explorerUrl: 'https://xt4scan.ngd.network',
  chainId: 12227332,
  chainNamespace: 'eip155',
} as const satisfies CaipNetwork]

// 3. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  connectors: [injected()],
  projectId,
  networks,
})

// 4. Create modal
const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true,
    socials: false,
    email: false,
    swaps: false,
    onramp: false,
  },
})

getAppKit(appKit)

export function install(app: App) {
  // app.provide()
  app.use(WagmiPlugin, { config: wagmiAdapter.wagmiConfig })
}
