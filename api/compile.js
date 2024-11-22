const fs = require('fs');
const solc = require('solc');

// Load the contract source code
const source = fs.readFileSync('./contracts/Inbox.sol', 'utf8');


const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode'],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contract = output.contracts['Inbox.sol']['Inbox'];

fs.writeFileSync('./deploy/abi.json', JSON.stringify(contract.abi));
fs.writeFileSync('./deploy/bytecode.txt', contract.evm.bytecode.object);

console.log('Contract compiled successfully!');
