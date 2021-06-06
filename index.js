const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const NFTFactory = require('./sandbox/NftFactory.js')

const PORT = 8888;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (_req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/createNFT', async (req, res) => {


  const {name, author, image, owner, additionalData, points} = req.body;
  let createdNFT //Objeto que vai receber o retorno do NFTCreate

  if(name === '' || author === '' || owner === '') return res.status(500).json({message: 'You must fill all the fields'})
  if(!image) return res.status(500).json({message: 'You must select a character!'})
  if(points < 0) return res.status(500).json({message: 'You can`t spend more then 20 Kryptos skill'})

  //Call NFT Factory Class
  let nft = await NFTFactory.createNFT(name, author, image, owner, additionalData).then(nft => {

      createdNFT = {
          NFTLocation: nft.location,
          NftObject: nft
      }
  })

  if (!createdNFT) return res.status(500).json({message: 'Wallet not found.'})

  return res.status(200).json(createdNFT);

});



app.listen(PORT, () => {
    console.log(`Running App on port ${PORT}. Comand + Click on the link to open it: http://localhost:${PORT}/`);
});