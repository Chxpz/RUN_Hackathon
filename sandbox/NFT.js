const Run = require('run-sdk')

class NftAvatar extends Jig{
    init(name, author, image, owner, additionalData) {
        this.metadata = {
            name,
            author,
            image,
            additionalData,
            emoji: '👤'
        }
        this.owner = owner
    }
    send(to){
        this.owner = to
    }
}

module.exports = NftAvatar