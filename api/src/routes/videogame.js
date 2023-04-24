const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');
require('dotenv').config();

const API_KEY = process.env.YOUR_API_KEY;

// BÚSQUEDA POR ID EN BASE DE DATOS Y API
// BÚSQUEDA EN BASE DE DATOS POR ID

router.get('/:idVideogame', async (req, res) => {
  const { idVideogame } = req.params;
  
  // Verifico si es un juego creado y traigo su detalle de la base de datos
  if (idVideogame.includes('-')) {
    try {
      const videogameDb = await Videogame.findOne({
        where: { id: idVideogame },
        include: Genre
      });
      const videogame = JSON.parse(JSON.stringify(videogameDb));
      videogame.genres = videogame.genres.map(g => g.name);
      res.json(videogame);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Error al buscar en la base de datos' });
    }
  } else {
    // Si no es un juego creado, lo busco en la API
    try {
      const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`); console.log()
      const { id, name, background_image, genres, description, released: releaseDate, rating, platforms } = response.data;
      const videogame = {
        id,
        name,
        background_image,
        genres: genres.map(g => g.name),
        description,
        releaseDate,
        rating,
        platforms: platforms.map(p => p.platform.name)
      };
      res.json(videogame);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Error al buscar en la API' });
    }
  }
});

// CREACIÓN DE JUEGO

router.post('/', async (req, res) => {
  const { name, description, releaseDate, rating, genres, platforms } = req.body;
  if (!name || !description || !rating) {
    return res.status(400).json({ msg: 'Faltan datos' });
  }
  try {
    const videogameCreated = await Videogame.create({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      description,
      releaseDate,
      rating,
      platforms: platforms.join('-')
    });
    await videogameCreated.setGenres(genres);
    res.json(videogameCreated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al crear el juego' });
  }
});

// ELIMINACIÓN DE JUEGO

router.delete('/', async (req, res) => {
  const { name } = req.query;
  try {
    const result = await Videogame.destroy({ where: { name } });
    if (result === 0) {
      res.status(404).json({ msg: 'El juego no existe' });
    } else {
      res.status(200).json({ msg: 'El juego ha sido eliminado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al eliminar el juego' });
  }
});

module.exports = router;
