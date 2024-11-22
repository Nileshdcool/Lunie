const {Web3} = require('web3');

const HDWalletProvider = require("@truffle/hdwallet-provider");

const address = '0x42Fb4BC5145BD89740a4243b323751992C40Ff2E';

const provider = new HDWalletProvider(
    "boy video tell school target aware chicken axis town later banner raccoon denial today mass",
    "https://sepolia.infura.io/v3/3fa37d2bcbbc446990c34ad8fcedcb29"
  );

const web3 = new Web3(provider);

const abi = [
    {
        inputs: [[Object]],
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    {
        inputs: [],
        name: 'message',
        outputs: [[Object]],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [[Object]],
        name: 'setMessage',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    }
];

const contract = new web3.eth.Contract(abi, address);

module.exports = contract;