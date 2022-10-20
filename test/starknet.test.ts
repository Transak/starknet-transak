import {
  getNetwork,
  ENetworkName,
  isValidWalletAddress,
  // getBalance,
  // getTransaction,
  // sendTransaction,
} from '../src/index';
import { describe, expect, test } from '@jest/globals';

require('dotenv').config();

// variables
const mainTimeout = 14000;

describe('Starknet Integration Module', () => {
  test(
    'it should return valid NetworkConfiguration for mainnet',
    async function () {
      const result = getNetwork(ENetworkName.main);
      expect(result.networkName).toBe('alpha-mainnet');
    },
    mainTimeout * 3,
  );
  test(
    'it should return valid NetworkConfiguration for testnet',
    async function () {
      const result = getNetwork(ENetworkName.testnet);
      expect(result.networkName).toBe('alpha-goerli');
    },
    mainTimeout * 3,
  );

  test(
    'it should return valid Address for testnet',
    async function () {
      const result_argentx = await isValidWalletAddress(
        ENetworkName.testnet,
        '0x034D5963254e595A630668135eCEE2F1D6B6EF14B098aCB203F3E53758Bde558',
      );
      expect(result_argentx).toBe(true);

      const result_bravos = await isValidWalletAddress(
        ENetworkName.testnet,
        '0x0035883e2c065f86a7a7df13d9f2a06d6d0465fe2fd63738a839c0a8c203dee1',
      );

      console.log('result_bravos====>', result_bravos);
      expect(result_bravos).toBe(true);
    },
    mainTimeout * 3,
  );

  test(
    'it should return not a valid Address for testnet',
    async function () {
      const result = await isValidWalletAddress(
        ENetworkName.testnet,
        '0x0035883e2c065f86a7a7df13d9f2a06d6d0465fe2fd63738a839c0a8c203dee1',
      );
      expect(result).not.toBe(false);
    },
    mainTimeout * 3,
  );

  test(
    'it should return a valid Address for mainnet',
    async function () {
      const result_argentx = await isValidWalletAddress(
        ENetworkName.main,
        '0x034D5963254e595A630668135eCEE2F1D6B6EF14B098aCB203F3E53758Bde558',
      );
      const result_bravos = await isValidWalletAddress(
        ENetworkName.main,
        '0x0612a0ee3bce1c0421efb78693f78178f502c7d5caf78e4dada43fee243a3653',
      );
      console.log(`result_argentx = ${result_argentx}`);
      console.log(`result_bravos = ${result_bravos}`);
      expect(result_argentx).toBe(true);
      expect(result_bravos).toBe(true);
    },
    mainTimeout * 3,
  );

  // test(
  //   'it should return not a valid Address for testnet',
  //   async function () {
  //     try {
  //       const result = await isValidWalletAddress(
  //         ENetworkName.testnet,
  //         '0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914',
  //       );
  //       expect(result).not.toBe(true);
  //     } catch (error) {
  //       expect(error.message).toBe('Invalid account provided');
  //     }
  //   },
  //   mainTimeout * 3,
  // );

  // test(
  //   'it should return not a valid Address for mainnet',
  //   async function () {
  //     try {
  //       const result = await isValidWalletAddress(ENetworkName.testnet, '0xd64268552e3a48abb');
  //       expect(result).not.toBe(true);
  //     } catch (error) {
  //       expect(error.message).toBe('Invalid account provided');
  //     }
  //   },
  //   mainTimeout * 3,
  // );

  // test(
  //   'it should return a FUSD Balance for account on Testnet',
  //   async function () {
  //     const result = await getBalance({
  //       network: ENetworkName.testnet,
  //       walletAddress: '0x73c05de1c4223787',
  //       tokenContractAddress: '0xe223d8a629e49c68',
  //       tokenIdentifier: 'FUSD',
  //       tokenBalancePublicPath: '/public/fusdBalance',
  //     });
  //     expect(typeof result).toBe('number');
  //   },
  //   mainTimeout * 3,
  // );

  // test(
  //   'it should return a FLOW Token Balance for account on Testnet',
  //   async function () {
  //     const result = await getBalance({
  //       network: ENetworkName.testnet,
  //       walletAddress: '0x73c05de1c4223787',
  //       tokenContractAddress: '0x7e60df042a9c0868',
  //       tokenIdentifier: 'FlowToken',
  //       tokenBalancePublicPath: '/public/flowTokenBalance',
  //     });
  //     expect(typeof result).toBe('number');
  //   },
  //   mainTimeout * 3,
  // );

  // test(
  //   'it should throw Error if account is not enabled for receiving FUSD on Testnet',
  //   async function () {
  //     try {
  //       const result = await getBalance({
  //         network: ENetworkName.testnet,
  //         walletAddress: '0x39575205948ccd4e',
  //         tokenContractAddress: '0xe223d8a629e49c68',
  //         tokenIdentifier: 'FUSD',
  //         tokenBalancePublicPath: '/public/fusdBalance',
  //       });
  //       expect(typeof result).toBe('number');
  //     } catch (error) {
  //       expect(error).toBeDefined();
  //     }
  //   },
  //   mainTimeout * 3,
  // );

  // test('is should fetch the Transaction Object ', async function () {
  //   /*
  //       0	Unknown
  //       1	Transaction Pending - Awaiting Finalization
  //       2	Transaction Finalized - Awaiting Execution
  //       3	Transaction Executed - Awaiting Sealing
  //       4	Transaction Sealed - Transaction Complete. At this point the transaction result has been committed to the blockchain.
  //       5	Transaction Expired
  //     */
  //   await getTransaction({
  //     network: ENetworkName.testnet,
  //     txnHash: '49564d6961b23f424a63f6d9b56d62db3aeb00e46fefcc67835384c0ee1cd9ed',
  //   });
  // });

  // test(
  //   'is should fetch the Transaction Object for successfull txn ',
  //   async function () {
  //     /*
  //       0	Unknown
  //       1	Transaction Pending - Awaiting Finalization
  //       2	Transaction Finalized - Awaiting Execution
  //       3	Transaction Executed - Awaiting Sealing
  //       4	Transaction Sealed - Transaction Complete. At this point the transaction result has been committed to the blockchain.
  //       5	Transaction Expired
  //     */
  //     const transactionDetails = await getTransaction({
  //       network: ENetworkName.testnet,
  //       txnHash: '661c7294e12704f819f1706a1fd74b2c51b5eb1e934f77018b545fbe48a089af',
  //     });
  //     expect(transactionDetails).toBeDefined();
  //     expect(transactionDetails.receipt.isSuccessful).toBe(true);
  //     expect(transactionDetails.receipt.gasCostInCrypto).toBe(0.00000259);
  //   },
  //   mainTimeout * 3,
  // );

  // test(
  //   'is should fetch the Transaction Object for fail txn',
  //   async function () {
  //     /*
  //       0	Unknown
  //       1	Transaction Pending - Awaiting Finalization
  //       2	Transaction Finalized - Awaiting Execution
  //       3	Transaction Executed - Awaiting Sealing
  //       4	Transaction Sealed - Transaction Complete. At this point the transaction result has been committed to the blockchain.
  //       5	Transaction Expired
  //     */
  //     const transactionDetails = await getTransaction({
  //       network: ENetworkName.testnet,
  //       txnHash: '5c886d639c63e14be0eb0870a29cf2f67413b3930e4f77a38ca4c3f1b1712a5c',
  //     });
  //     expect(transactionDetails).toBeDefined();
  //     expect(transactionDetails.receipt.isSuccessful).toBe(false);
  //     expect(transactionDetails.receipt.gasCostInCrypto).toBe(0.00000104);
  //   },
  //   mainTimeout * 3,
  // );

  // test(
  //   'is should send the Transaction',
  //   async function () {
  //     /*
  //       0	Unknown
  //       1	Transaction Pending - Awaiting Finalization
  //       2	Transaction Finalized - Awaiting Execution
  //       3	Transaction Executed - Awaiting Sealing
  //       4	Transaction Sealed - Transaction Complete. At this point the transaction result has been committed to the blockchain.
  //       5	Transaction Expired
  //     */
  //     const transactionDetails = await sendTransaction({
  //       network: ENetworkName.testnet,
  //       amount: '0.001',
  //       fromWalletAddress: '0x73c05de1c4223787',
  //       recepient: '0x39575205948ccd4e',
  //       privateKey: PRIVATE_KEY,
  //       tokenIdentifier: 'FlowToken',
  //       tokenContractAddress: '0x7e60df042a9c0868',
  //       tokenStoragePath: '/storage/flowTokenVault',
  //       tokenReceiverPath: '/public/flowTokenReceiver',
  //     });
  //     expect(transactionDetails).toBeDefined();
  //     expect(transactionDetails.receipt.isSuccessful).toBe(true);
  //   },
  //   mainTimeout * 3,
  // );

  // test(
  //   'is should send the Transaction for FUSD token',
  //   async function () {
  //     /*
  //       0	Unknown
  //       1	Transaction Pending - Awaiting Finalization
  //       2	Transaction Finalized - Awaiting Execution
  //       3	Transaction Executed - Awaiting Sealing
  //       4	Transaction Sealed - Transaction Complete. At this point the transaction result has been committed to the blockchain.
  //       5	Transaction Expired
  //     */
  //     const transactionDetails = await sendTransaction({
  //       network: ENetworkName.testnet,
  //       amount: '00.001',
  //       fromWalletAddress: '0x73c05de1c4223787',
  //       recepient: '0x39575205948ccd4e',
  //       privateKey: PRIVATE_KEY,
  //       tokenIdentifier: 'FUSD',
  //       tokenContractAddress: '0xe223d8a629e49c68',
  //       tokenStoragePath: '/storage/fusdVault',
  //       tokenReceiverPath: '/public/fusdReceiver',
  //     });
  //     expect(transactionDetails).toBeDefined();
  //     expect(transactionDetails.receipt.isSuccessful).toBe(true);
  //   },
  //   mainTimeout * 3,
  // );
});
