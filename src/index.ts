import { validateAndParseAddress } from 'starknet';
import { NetworkConfig } from './config';
import { ENetworkName, getfeeStatsResult, Network, TransactionReceipt, TransactionResponse } from './types';
// import { Account, Contract, defaultProvider, ec, json, number } from 'starknet';

const getNetwork = (network: ENetworkName): Network => NetworkConfig[network];

const isValidWalletAddress = async (network: ENetworkName, accountAddress: string): Promise<boolean> => {
  try {
    const validateAddress = validateAndParseAddress(accountAddress);
    console.log(`validateAddress :: ${validateAddress}`);
    return typeof validateAddress === 'string' && validateAddress != '' ? true : false;
  } catch (error) {
    console.log('Error in isWalletAddress Validation', error);
    return false;
  }
};

const getWalletLink = (walletAddress: string, network: ENetworkName) =>
  getNetwork(network).walletLink(walletAddress) as string;

const getTransactionLink = (txId: string, network: ENetworkName) => getNetwork(network).transactionLink(txId) as string;

async function getBalance({
  network,
  walletAddress,
  tokenContractAddress,
  tokenIdentifier,
  tokenBalancePublicPath,
}: {
  network: ENetworkName;
  walletAddress: string;
  tokenContractAddress: string;
  tokenIdentifier: string;
  tokenBalancePublicPath: string;
}): Promise<number> {
  //   initializeFlow(network);
  //   const CODE = `
  //     import ${tokenIdentifier} from ${tokenContractAddress}
  //     import FungibleToken from 0xFT
  //     pub fun main(account: Address): UFix64 {
  //       let vaultRef = getAccount(account)
  //       .getCapability(${tokenBalancePublicPath})
  //       .borrow<&${tokenIdentifier}.Vault{FungibleToken.Balance}>()
  //       ?? panic("Could not borrow Balance reference to the Vault")
  //       return vaultRef.balance
  //     }
  //   `;
  //   const args = (arg, t) => [arg(walletAddress, t.Address)];
  //   const balance = await query({ cadence: CODE, args });
  return 0;
}

async function getFeeStats(network: string): Promise<getfeeStatsResult> {
  return {
    feeCryptoCurrency: 'ETH',
    baseFee: 0.0, // current Fee
    lowFeeCharged: 0.0,
    standardFeeCharged: 0.0,
    fastFeeCharged: 0.0,
    maxFeeCharged: 0.0, // double the base Fee
  };
}

// https://developers.flow.com/tools/fcl-js/reference/api#transactionobject

async function getTransaction({
  txnHash,
  network,
}: {
  txnHash: string;
  network: ENetworkName;
}): Promise<TransactionResponse | null> {
  // initializeFlow(network);
  // const txnStatusData = await send([getTransactionStatus(txnHash)]).then(decode);

  // const transactionReceipt: TransactionReceipt = {
  //   transactionHash: txnHash,
  //   transactionLink: getTransactionLink(txnHash, network),
  //   network,
  //   gasPrice: null,
  //   gasLimit: null, // gasLimit
  //   gasCostInCrypto: getGasAmountUsedInTransaction(txnStatusData), // process the JSON to get gasCost
  //   gasCostCryptoCurrency: 'FLOW',
  //   amount: getAmountTransferedinTransaction(txnStatusData),
  //   from: getSenderWalletAddress(txnStatusData),
  //   to: getReceiverWaleltAddress(txnStatusData),
  //   nonce: null,
  //   date: new Date(),
  //   ...decodeTransactionStatus({ status: txnStatusData.status, statusCode: txnStatusData.statusCode }),
  // };
  return null;
}

/*
  network: ENetworkName;
  walletAddress: string;
  tokenContractAddress: string;
  tokenIdentifier: string;
  tokenBalancePublicPath: string
*/
async function sendTransaction({
  network,
  recepient,
  fromWalletAddress,
  amount,
  privateKey,
  tokenIdentifier,
  tokenContractAddress,
  tokenStoragePath, // /storage/flowTokenVault
  tokenReceiverPath, // /public/flowTokenReceiver
}: {
  network: ENetworkName;
  recepient: string;
  fromWalletAddress: string;
  amount: string;
  privateKey: string;
  tokenIdentifier: string;
  tokenContractAddress: string;
  tokenStoragePath: string;
  tokenReceiverPath: string;
}): Promise<TransactionResponse | null> {
  // initializeFlow(network);
  // const cadence = `
  //   import ${tokenIdentifier} from ${tokenContractAddress}
  //   import FungibleToken from 0xFT

  //   transaction(recepient: Address, amount: UFix64){
  //     prepare(signer: AuthAccount){
  //       let sender = signer.borrow<&${tokenIdentifier}.Vault>(from: ${tokenStoragePath})
  //         ?? panic("Could not borrow Provider reference to the Vault")

  //       let receiverAccount = getAccount(recepient)

  //       let receiver = receiverAccount.getCapability(${tokenReceiverPath})
  //         .borrow<&${tokenIdentifier}.Vault{FungibleToken.Receiver}>()
  //         ?? panic("Could not borrow Receiver reference to the Vault")

  //       receiver.deposit(from: <- sender.withdraw(amount: amount))
  //     }
  //   }
  // `;

  // const signer = getSigner(privateKey, fromWalletAddress);
  // const args = (arg, t) => [arg(recepient, t.Address), arg(amount, t.UFix64)];
  // const proposer = signer;
  // const payer = signer;
  // const authorizations = [signer];

  // // "mutate" method will return us transaction id
  // const txId = await mutate({
  //   cadence,
  //   args,
  //   proposer,
  //   payer,
  //   authorizations,
  //   limit: 100,
  // });
  // console.log(`Submitted transaction ${txId} to the network`);
  // console.log('Waiting for transaction to be sealed...');
  // const label = 'Transaction Sealing Time';
  // // We will use transaction id in order to "subscribe" to it's state change and get the details of the transaction
  // console.time(label);
  // await tx(txId).onceSealed();
  // console.timeEnd(label);
  return null;
}

export {
  ENetworkName,
  isValidWalletAddress,
  getNetwork,
  getWalletLink,
  getTransactionLink,
  getBalance,
  getTransaction,
  getFeeStats,
  sendTransaction,
};
