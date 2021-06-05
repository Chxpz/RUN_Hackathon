const Run = require('run-sdk')

class Nft extends Jig{
    init(name, author, image, owner, additionalData) {
        this.metadata = {
            name,
            author,
            image,
            additionalData
        }
        this.owner = owner
    }
    send(to){
        this.owner = to
    }
}

module.exports = Nft