import { Network } from './types';

export const NetworkConfig: Record<string, Network> = {
  main: {
    transactionLink: hash => `https://starkscan.co/tx/${hash}`,
    walletLink: address => `https://starkscan.co/contract/${address}`,
    networkName: 'alpha-mainnet',
    serverUrl: 'https://alpha-mainnet.starknet.io/gateway/',
  },
  testnet: {
    transactionLink: hash => `https://testnet.starkscan.co/tx/${hash}`,
    walletLink: address => `https://testnet.starkscan.co/contract/${address}`,
    networkName: 'alpha-goerli',
    serverUrl: 'https://alpha4.starknet.io',
  },
};

module.exports = { NetworkConfig };

// https://alpha-mainnet.starknet.io
