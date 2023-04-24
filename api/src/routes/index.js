 require('dotenv').config();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const express = require('express');
const router = express.Router();

const APIKEY = process.env.YOUR_API_KEY;

const videogames = require("./videogames.js");
const videogame = require("./videogame.js");
const released = require("./released");
const genres = require("./genres.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogames);
router.use('/videogame', videogame);
router.use("/released", released);
router.use("/genres", genres);

module.exports = router;
