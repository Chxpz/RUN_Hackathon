const NFTFactory = require('./NftFactory.js')
const express = require('express');

async function main() {

    const app = express();
    const PORT = process.env.PORT || 3000;
    //-------------------------------------------
    const bodyParser = require('body-parser');
    const cors = require('cors')

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())
    app.use(cors())
    //-------------------------------------------

    app.use(express.json());

    app.get('/', (request, response) => {

        response.json({ 'Welcome': 'Welcome to main page!' });

    });

    app.post('/createNFT', async (request, response) => {

        console.log(request.body)

        const {name, author, image, owner, additionalData} = request.body;

        let createdNFT //Objeto que vai receber o retorno do NFTCreate

        //Call NFT Factory Class
        let nft = await NFTFactory.createNFT(name, author, image, owner, additionalData).then(nft => {
            console.log('Retorno do Create NFT: ', nft)
            createdNFT = {
                NFTLocation: nft.location,
                NftObject: nft
            }
        })

        if (!createdNFT) {
            response.status(500).send('Wallet not found.')
        } else {
            response.json(createdNFT);
        }
    });

    app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));
}

main()