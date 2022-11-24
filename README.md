# Stargaze Names JS SDK

Simple JavaScript library to query Stargaze Names Service

## Installation 

```sh
yarn add sgnames.js
```

Usage as CJS
```js
const SGNames=require("sgnames.js");
```

Usage as ESM
```js
import SGNames from "sgnames.js";
```

## Usage

### Setting custom network

```js
SGNames.setEndpoint('LCD endpoint of network').setCollectionContract('Contract address of names collection')
```

Possible networks:

- Elgafar testnet
  
  LCD Endpoint: `https://rest.elgafar-1.stargaze-apis.com`

  Names Collection Contract: `stars1rp5ttjvd5g0vlpltrkyvq62tcrdz949gjtpah000ynh4n2laz52qarz2z8`
- Stargaze mainnet
  
  *Not live yet, stay tuned*

### Fetch Name Info

```js
SGNames.fetchNameInfo("my-awesome-name")
```
Returns object type of such structure:
```js
{
    name:"my-awesome-name.stars",
    owner:"stars1...",
    addresses:{
        stars:"stars1...",
        akash:"akash1...",
        osmo:"osmo1...",
        ...
    } (nullable),
    stargazeAddress:"stars..." (nullable),
    imageNFT:{
        collection:"stars1..." (NFT collection contract),
        token_id:"1" (NFT ID)
    },
    records:{
        twitter:"my_twitter_account",
        discord:"example#0000",
        ...
    }
}
```
