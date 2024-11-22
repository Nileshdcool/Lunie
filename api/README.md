## Installation
Clone the repository:
 

Install dependencies:

```
yarn install
```

## Run

Start with automatic restart on save:

```
yarn dev
```

Or start using Redis for the Apollo cache. You will need to set `REDIS_URL` environment variable with your Redis server URL.

```
yarn dev-cache
```

Or start in a docker container:

```
yarn dev-docker
```

## Development

When running you can access GraphQL Playground at http://localhost:4000/. You can use it to create/test GraphQL queries to the API. 

## Environment variables

| Name | Description |
| ------------- | ------------- |
| `HASURA_URL` | Hasura backend URL |
| `HASURA_ADMIN_KEY` | Hasura backend admin password |
| `ENABLE_CACHE` | Enable/disable Apollo Server RedisCache. You must have a Redis server available. |
| `REDIS_URL` | Redis server URI in `<auth>@hostname:port` format |
| `ENGINE_API_KEY` | Enable Apollo GraphQL metrics through https://engine.apollographql.com/  |
| `SENTRY_DSN` | Sentry (https://sentry.io) data source name in format `https://<key>@sentry.io/<project>` |
| `RUN_ONLY_NETWORKS` | Run only the networks with this ID comma separated (allows scaling and better development) |
| `LOCAL_KUSAMA_API` | Use a local kusama API as the one here is only whitelisted for some IPs |
| `WHITELIST_ORIGIN` | Allow only some origins to access the API |

## Networks

A new network only requires 3 things:

 1. An entry in the `data/networks.json` array.
 2. A class to source information from an external endpoint.
 3. A class to 'listen' for block events.

For example, the Cosmos Hub classes are defined within the `networks.json` config like so:

 ```
"source_class_name": "source/cosmosV2-source",
"block_listener_class_name": "block-listeners/cosmos-node-subscription",
```

Be careful to prefix the path with `source` and `block-listeners` respectively.
These refer to folders underneath the root `lib` directory, and are where the
classes should be placed.

Some notes:

- Networks are automatically loaded and will begin fetching blocks once the application starts.
- To disable a network, set it's `enable` property to `false`.
- Network configurations are validated during testing.



<!-- router.use('/update', async function (req, res) {
  console.log('transaction strated');
  const { newMessage } = req.body;
  if (!newMessage) {
    return res.status(400).send({ error: 'Message is required' });
  }

  try {
    const { newMessage } = req.body;

    // Get the current nonce
    const nonce = await web3.eth.getTransactionCount(account[0].address, 'pending');

    // Fetch the current gas price (BigInt)
    const gasPrice = BigInt(await web3.eth.getGasPrice());
    const updatedGasPrice = (gasPrice * BigInt(11)) / BigInt(10); // Increase by 10%

    // Estimate gas for the transaction
    const gas = await contract.methods.setMessage(newMessage).estimateGas({
        from: account[0].address,
    });

    // Send the transaction
    const receipt = await contract.methods.setMessage(newMessage).send({
        from: account[0].address,
        gas,
        gasPrice: updatedGasPrice.toString(), // Convert BigInt to string for Web3
        nonce,
    });

    res.send({ transactionHash: receipt.transactionHash });
} catch (err) {
    res.status(500).send({ error: err.message });
}

}); -->
