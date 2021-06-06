const Run = require('run-sdk')

class NftAvatar extends Jig{
    init(name, author, image, owner, additionalData) { 
        this.author = author,
        this.image = image,
        this.power = additionalData.state.Power,
        this.shield = additionalData.state.Shield,
        this.speed = additionalData.state.Speed,
        this.owner = owner
        this.metadata = {
            name ,
            emoji: '⚔'
        }
    }
    send(to){
        this.owner = to
    }
}


module.exports = NftAvatar