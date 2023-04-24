require('dotenv').config();
const APIKEY = process.env.YOUR_API_KEY;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Genre } = require('../db');



router.get('/', async (req, res) => {
    try {
        const genresDb = await Genre.findAll();
        if (genresDb.length) return res.json(genresDb)
        console.log(genresDb)
       
        
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);
        const genres = response.data.results; 
        genres.forEach(async g => {
            await Genre.findOrCreate({
                where: {
                    name: g.name
                }
            })
        })
        
        const genresREADY = genres.map(game => {
            return{
                id: game.id,
                name: game.name
            }
        });

        res.json(genresREADY)
    } catch (err) {
        throw new Error(err)
    }
})

module.exports = router;
