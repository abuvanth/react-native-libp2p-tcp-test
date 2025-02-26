import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { identify } from '@libp2p/identify';
import { bootstrap } from '@libp2p/bootstrap'

import { tcp } from '@libp2p/tcp'

export const config = {
  peerDiscovery: [
    bootstrap({
      list: [
        '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
        '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
        '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
        '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
        '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
        '/ip4/127.0.0.1/tcp/54383/ws/p2p/12D3KooWPjB7XzTv1hviVwPtx4qzr864NeFGDT6aFBDVD76fAMpK'
      ]
    })
  ],
    addresses: {
      listen: [
        '/ip4/0.0.0.0/tcp/0',
      ],
    },
    transports: [
      tcp(),
    ],
    connectionEncrypters: [noise()],
    connectionGater: {
      denyDialMultiaddr: () => {
        return false
      }
    },
    streamMuxers: [yamux()],
    services: {
      identify: identify(),
    },
  };
