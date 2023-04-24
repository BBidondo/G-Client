require("dotenv").config();
const APIKEY = process.env.YOUR_API_KEY;
const { Router } = require("express");
const db = require("../db");
const router = Router();
const axios = require("axios").default;
const { Videogame, Genre } = require("../db");

//TODO -----> GET a "/videogames" <--------
//
router.get("/", async (req, res) => {
  let videogamesDb = await Videogame.findAll({
    include: Genre,
  });

  videogamesDb = JSON.stringify(videogamesDb);
  videogamesDb = JSON.parse(videogamesDb);

  videogamesDb = videogamesDb.reduce(
    (acc, el) =>
      acc.concat({
        ...el,
        genres: el.genres.map((g) => g.name),
      }),
    []
  );

  //TODO QUERIES --------> GET /videogames?name="..." <-----------
  if (req.query.name) {
    try {
      let response = await axios.get(
        `https://api.rawg.io/api/games?search=${req.query.name}&key=${APIKEY}`
      );
      if (!response.data.count)
        return res.status(204).json(`Not found "${req.query.name}"`);
      const gamesREADY = response.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          rating: game.rating,
          genres: game.genres.map((g) => g.name),
        };
      });

      const filteredGamesDb = videogamesDb.filter((g) =>
        g.name.toLowerCase().includes(req.query.name.toLowerCase())
      );
      const results = [...filteredGamesDb, ...gamesREADY];
      return res.json(results);
    } catch (err) {
      throw new Error(err);
    }
  }

  // ESTO FILTRA LA DB POR REALESE DATE
  else if (req.query.releaseDate) {
    try {
      const date = videogamesDb.filter((d) =>
        d.releaseDate.includes(req.query.releaseDate)
      );
      const results1 = date;
      return res.json(results1);
    } catch (error) {
      return res.status(400).json("Does not exist");
    }
  } else {
    try {
      let pages = 0;
      let results = [...videogamesDb];
      let response = await axios.get(
        `https://api.rawg.io/api/games?key=${APIKEY}`
      );

      while (results.length <= 100) {
        pages++;

        const gammesREADY = response.data.results.map((game) => {
          return {
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            rating: game.rating,
            genres: game.genres.map((g) => g.name),
          };
        });
        results = [...results, ...gammesREADY];

        response = await axios.get(response.data.next);
      }
      return res.json(results);
    } catch (err) {
      res.sendStatus(500);
      throw new Error(err);
    }
  }
});

module.exports = router;
