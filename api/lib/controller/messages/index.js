const { Web3 } = require('web3');
const fs = require('fs');
const config = require('../../../config');

const web3 = new Web3(new Web3.providers.HttpProvider(config.infura_url));

const abi = JSON.parse(fs.readFileSync('./deploy/abi.json', 'utf8'));
const contractAddress = fs.readFileSync('./deploy/contract-address.txt', 'utf8').trim();
const contract = new web3.eth.Contract(abi, contractAddress);

const privateKey = `0x${config.privateKey}`;

const account = web3.eth.accounts.wallet.add(privateKey);

async function getInboxMessage() {
    console.log('account', account[0].address);
    const message = await contract.methods.message().call();
    console.log('message', message);
    return message;
}

module.exports = {
    getInboxMessage
}