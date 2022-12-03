const fetch = require("isomorphic-fetch")
const Buffer = require("buffer").Buffer
const { toBech32, fromBech32 } = require("@cosmjs/encoding")
class SGNames {
    networks = ['stars', 'akash', 'osmo', 'cosmos', 'stride', 'juno', 'secret', 'cro', 'persistence', 'agoric', 'axelar', 'umee', 'gravity']
    lcdEndpoint = 'https://rest.stargaze-apis.com';
    nameCollectionContract = 'stars1fx74nkqkw2748av8j7ew7r3xt9cgjqduwn8m0ur5lhe49uhlsasszc5fhr';
    constructor() {

    }
    setEndpoint(endpoint) {
        this.lcdEndpoint = endpoint
        return this
    }
    setCollectionContract(contractAddress) {
        this.nameCollectionContract = contractAddress
        return this
    }
    async _queryNameContract(contractAddress, query) {
        let encodedQuery = Buffer.from(JSON.stringify(query)).toString("base64")
        let response = await fetch(`${this.lcdEndpoint}/cosmwasm/wasm/v1/contract/${contractAddress}/smart/${encodedQuery}`).then(r => r.json())
        return response

    }

    async fetchNameInfo(name) {
        let queryResponse = await this._queryNameContract(this.nameCollectionContract, {
            "all_nft_info": {
                "token_id": name
            }
        })
        if (!queryResponse.data) {
            return null;
        }
        return {
            name: name + ".stars",
            owner: queryResponse.data.access.owner,
            addresses: queryResponse?.data?.info?.token_uri ? Object.fromEntries(this.networks.map(network => [network, toBech32(network, fromBech32(queryResponse.data.info.token_uri).data)])) : [],
            stargazeAddress: queryResponse.data.info.token_uri,
            imageNFT: queryResponse.data.info.extension.image_nft,
            records: queryResponse.data.info.extension.records.reduce((pv, cv) => {
                return { ...pv, [cv.name]: cv.value }
            }, {})
        }

    }
    async fetchNameOfAddress(address) {
        let queryResponse = await this._queryNameContract(this.nameCollectionContract, {
            "name": {
                "address": toBech32('stars', fromBech32(address).data)
            }
        })
        if (!queryResponse.data) {
            return null
        }
        return await this.fetchNameInfo(queryResponse.data.name)
    }
    async ownerOf(name) {
        let queryResponse = await this._queryNameContract(this.nameCollectionContract, {
            "owner_of": {
                "token_id": name
            }
        })
        if (!queryResponse.data) {
            return null
        }
        return queryResponse.data.owner
    }
    async namesOf(address) {
        let queryResponse = await this._queryNameContract(this.nameCollectionContract, {
            "tokens": {
                "owner": toBech32('stars', fromBech32(address).data)
            }
        })
        if (!queryResponse.data) {
            return []
        }
        return queryResponse.data.tokens
    }
}
module.exports = new SGNames()