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

        const incomingNFT = request.body;

        let name = incomingNFT['Name']
        let author = incomingNFT['Author']
        let image = incomingNFT['Image']
        let owner = incomingNFT['Owner']
        let additionalData = incomingNFT['AdditionalData']

        console.log(name, author, image, owner)

        //Call NFT Factory Class
        let nft = NFTFactory.createNFT("Rodrigo", "Bezerra", "C:\img.jpg", "03a93358355eb29c49c4493948238bb984463c6963ea2c48f3d5a280b285528dec", "{q:1, w:2}").then(nft =>{})

        console.log(nft)

        let createdNFT = {
            NFTLocation: nft.location,
            NftObject: nft
        }

        if (!createdNFT) {
            response.status(500).send('Wallet not found.')
        } else {
            response.json(createdNFT);
        }
    }); 

    app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));
}

main()