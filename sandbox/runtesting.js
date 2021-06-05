const Run = require('run-sdk')
const run = new Run({ network: 'mock' })

class Dragon extends Jig {
    setName(name) {
      this.name = name
    }
  }


async function main(){
    // // console.log(run)
    // const dragon = new Dragon()

    // dragon.setName("Empress")

    // // 
    // // console.log('Instance: ', '-->' + dragon.location)

    // await dragon.sync()

    // console.log(dragon.name)
    // console.log('Class: ', '-->' + Dragon.location)
    // console.log('Instance: ', '-->' + dragon.location)
    await run.inventory.sync()

    const simpleDragon = run.inventory.jigs.find(x => x instanceof Dragon)

    simpleDragon.name("Drac")    

}


main()