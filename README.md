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
SGNames.lcdEndpoint='LCD endpoint of network';
SGNames.nameCollectionContract='Contract address of names collectio';
```

Possible networks:
- Elgafar testnet
  LCD Endpoint: `https://rest.elgafar-1.stargaze-apis.com`
  Names Collection Contract: `stars1rp5ttjvd5g0vlpltrkyvq62tcrdz949gjtpah000ynh4n2laz52qarz2z8`
- Stargaze mainnet
  *Not live yet, stay tuned*