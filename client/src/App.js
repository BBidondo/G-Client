import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./components/About/About.jsx";
import CrearJuego from "./components/CrearJuego/CrearJuego.jsx";
import GameDetails from "./components/GameDetails/GameDetails.jsx";
import Landing from "./components/Landing/Landing.jsx";
import Page404 from "./components/Page404/page404";
import Videogames from "./components/Videogames/Videogames.jsx";
import store from '../src/Redux/store/index';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/videogames" component={Videogames} />
          <Route exact path="/crearjuego" component={CrearJuego} />
          <Route exact path='/videogame/:idVideogame' component={GameDetails} />
          <Route exact path="/about" component={About} />
          <Route path="*" component={Page404} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
