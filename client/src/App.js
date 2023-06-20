import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About/About.jsx";
import CrearJuego from "./components/CrearJuego/CrearJuego.jsx";
import GameDetails from "./components/GameDetails/GameDetails.jsx";
import Landing from "./components/Landing/Landing.jsx";
import Page404 from "./components/Page404/page404";
import Videogames from "./components/Videogames/Videogames.jsx";
import store from "../src/Redux/store/index";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/videogames" element={<Videogames />} />
          <Route path="/crearjuego" element={<CrearJuego />} />
          <Route path="/videogame/:idVideogame" element={<GameDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
