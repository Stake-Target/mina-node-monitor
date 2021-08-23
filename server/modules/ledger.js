const fetch = require("node-fetch")

const delegations = async (key) => {
    const link = `https://minastake.com/ledger/delegations.php?publicKey=${key}`
    const data = await fetch(link)
    return data.ok ? data.json() : null
}

const processDelegations = async () => {
    const {publicKey, publicKeyDelegators} = globalThis.config
    const key = publicKeyDelegators || publicKey
    let data = await delegations(key)

    if (data) {
        globalThis.nodeInfo.delegations = data
        globalThis.cache.delegations = data
    }

    setTimeout(processDelegations, 600000)
}

module.exports = {
    processDelegations
}