const NFT = require('./NFT.js')
const Run = require('run-sdk')
const NFTClass = "0280b1f73f3051f5a9658462bf7f2758afba008c5933902d24100361e8054731_o1" //"3608842326a8ef67ab3d3e7f4efebcd729eb72a6409cd0cf892836b14781e08b_o1" //Somente deve estar vazio na primeira passagem: criação da classe

async function createNFT(name, author, image, owner, additionalData) {
    // const run = new Run({ network: 'mock' })
    //----
    const run = new Run({
        trust: '*',
        owner: 'KxYfry5GArjUuJEJB4SgdJ6ZSttQ5FJ5bs5gREYnX9YscMSDD2fC',
        purse: 'KyMiR17yt8pdG8NiydJcpnP3BD5tLF42bzTyrnpz6FMgBUDGjEMx',
        network: 'main'
    });

    //----

    let classLocation

    if (NFTClass.length == 0) {
        //Fazendo o deploy da Classe
        run.deploy(NFT)
        await run.sync()
        console.log('Location da Classe:   ', NFT.location)
        classLocation = NFT.location
    } else {
        classLocation = NFTClass
    }
    //localizando a classe
    console.log('classLocation', classLocation)
    const nftContract = await run.load(classLocation)
    await nftContract.sync()

    //Criando um novo NFT
    let nft = new nftContract(name, author, image, owner, additionalData)
    await nft.sync()

    //exibindo no console
    console.log({ nft })

    return nft
}
module.exports = { createNFT }


// createNFT("Rodrigo", "Bezerra", "C:\img.jpg", "03a93358355eb29c49c4493948238bb984463c6963ea2c48f3d5a280b285528dec", "{q:1, w:2}")
// privkey: 'cQ45fxMY8JPF9V6rLnQnohpkMPtWCm6TfzdHmDR4t9iCzzyKu5Ur',
// pubkey: '03a93358355eb29c49c4493948238bb984463c6963ea2c48f3d5a280b285528dec',
// address: 'mqK5Eja7XaWCa1EN3tRtGomo9PHPsFib5W'