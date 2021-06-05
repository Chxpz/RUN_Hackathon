const NFT = require('./NFT.js')
const Run = require('run-sdk')

async function createNFT(name, author, image, owner, additionalData) {
    const run = new Run({ network: 'mock' })

    //Fazendo o deploy da Classe
    run.deploy(NFT)
    await run.sync()
    console.log(NFT.location)

    //localizando a classe
    const nftContract = await run.load(NFT.location)
    await nftContract.sync()

    //Criando um novo NFT
    let nft = new nftContract(name, author, image, owner, additionalData)
    nft.sync()

    //exibindo no console
    console.log({nft})

    return nft
}
module.exports = { createNFT }


// createNFT("Rodrigo", "Bezerra", "C:\img.jpg", "03a93358355eb29c49c4493948238bb984463c6963ea2c48f3d5a280b285528dec", "{q:1, w:2}")
// privkey: 'cQ45fxMY8JPF9V6rLnQnohpkMPtWCm6TfzdHmDR4t9iCzzyKu5Ur',
// pubkey: '03a93358355eb29c49c4493948238bb984463c6963ea2c48f3d5a280b285528dec',
// address: 'mqK5Eja7XaWCa1EN3tRtGomo9PHPsFib5W'