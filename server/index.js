const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express()
app.use(cors())

/* app.get('/', (req, res) => {
    res.send('Hi there')
}) */

app.get("/pokemon/:pokemonId", async (req, res) => {
    const pokemonId = req.params.pokemonId.toLowerCase()

    //Get basic pokemon info
    let res1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).catch((err) => {console.log(err.message)})
    let name = res1?.data?.name ? res1.data.name : `${pokemonId} Not Found`
    let sprite = res1?.data?.sprites.front_default ? res1.data.sprites.front_default : './pokeball.png'
    let speciesUrl = res1?.data?.species.url ? res1.data.species.url : undefined
    let description = "Try some of the following names : Pikachu, Charizard, Onix, Mewtwo, Eevee, Gengar, Mew, Snorlax..."

    if (speciesUrl) {
        //Get pokemon description
        let res2 = await axios.get(speciesUrl).catch((err) => {console.log(err.message)})
        description = res2.data.flavor_text_entries[0].flavor_text.replace(/\u000D\u000A|[\u000A\u000B\u000C\u000D\u0085\u2028\u2029]/g, " ")

        //Translate description to Shakespearean
        let res3 = await axios.get(`https://api.funtranslations.com/translate/shakespeare.json?text=${description}`).catch((err) => {console.log(err.message)})
        description = res3?.data?.contents ? res3.data.contents.translated : description
    }
    res.status(200).send (
        {"name" : name,
        "sprite" : sprite,
        "description": description
    })  
}).catch((err) => {console.log(err.message)})

app.listen('3001', () => {})