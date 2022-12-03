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
  
  LCD Endpoint: `https://rest.stargaze-apis.com`

  Names Collection Contract: `stars1fx74nkqkw2748av8j7ew7r3xt9cgjqduwn8m0ur5lhe49uhlsasszc5fhr`

### Fetch Name Info

```js
await SGNames.fetchNameInfo("my-awesome-name")
```

Returns object of such structure:

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

### Fetch name associated with address

One address can have many names, however only one name can be associated with one address, making bidirectional linking and possibility for reverse lookups.
Here's example how to fetch associated name of specified address:
```js
await SGNames.fetchNameOfAddress("stars1...")
```
Returns same object as fetch name info.

### Fetch owner of name

```js
await SGNames.ownerOf("my-awesome-name")
```
Returns Stargaze address of owner of name, even if name is not associated with it.

### Names of address

Fetch all names of specified address.

```js
await SGNames.namesOf("stars1...")
```

Returns array of all names of address.
```js
["my-awesome-name","more-awesome-name","themostawesomename","helloworld", ...]
```