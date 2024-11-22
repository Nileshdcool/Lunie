const {Web3} = require('web3');
const fs = require('fs');
const config = require('./config');

// Set up Infura provider
const web3 = new Web3(config.infuraUrl);

// Load ABI and Bytecode
const abi = JSON.parse(fs.readFileSync('./deploy/abi.json', 'utf8'));
const bytecode = fs.readFileSync('./deploy/bytecode.txt', 'utf8');

// Private key of your wallet
const privateKey = `0x${config.privateKey}`;
const account = web3.eth.accounts.wallet.add(privateKey);

console.log('Deploying contract from account:', account[0].address);

(async () => {
    try {
        console.log('Deploying contract...');
        const contract = new web3.eth.Contract(abi);

        const deployment = await contract.deploy({
            data: `0x${bytecode}`,
            arguments: ['Hello, World!'],
        });

        const gasEstimate = await deployment.estimateGas();

        console.log('Gas estimate:', gasEstimate);

        const deployedContract = await deployment
            .send({
                from: account[0].address,
                gas: gasEstimate,
                
            });

        console.log('Contract deployed at address:', deployedContract.options.address);
        fs.writeFileSync('./deploy/contract-address.txt', deployedContract.options.address);
    } catch (err) {
        console.error('Deployment error:', err);
    }
})();
