/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail, clean } from "../../Redux/actions";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import photo from "../../img/conecting.gif";
import { NavLink, useParams } from "react-router-dom"; // Importa `useParams` desde react-router-dom
import "./gamedetail.css";

export default function GameDetails() {
  const { idVideogame } = useParams(); // Utiliza `useParams` para obtener el parámetro `idVideogame`
  const dispatch = useDispatch();
  const gameDetails = useSelector((state) => state.gameDetails);

  useEffect(() => {
    dispatch(getVideogameDetail(idVideogame));
    return () => dispatch(clean());
  }, [dispatch, idVideogame]);

  
  return ( 
    <div className="container-detail">
            <NavBar />

      <div className="details-div"> 
        {gameDetails ? ( 
          <div>
            <h3 className="title">{gameDetails.name}</h3>
            {gameDetails.background_image ? ( 
              <div className="div-img">
                <img src={gameDetails.background_image} alt="Videogame"></img>
              </div>
            ) : ( 
              <div className="div-img">
                <img src={photo} alt="Videogame"></img>
              </div>
            )}
            {
              <p className="Date">
                <strong>Release Date</strong>:{" "}
                {`${gameDetails.releaseDate || "None"}`} 
               
              </p>
            }
            <p className="Rating">
              <strong>Rating</strong>: ★ {`${gameDetails.rating}`} 
            </p>
            {gameDetails.description && 
            gameDetails.genres && 
            gameDetails.platforms ? ( 
              <div className="div-descr">
                {
                  
                  <p className="descripcion">
                    <h3 className="des-title">About the Game</h3>
                    {gameDetails.description.replace(/(<([^>]+)>)/gi, "")} 
                    
                  </p>
                }
                {
                  < p className="Genres">
                    <strong>Genres</strong>:{" "}
                    {`${gameDetails.genres.join(", ")}`} 
                    
                  </p>
                }
                {
                  <p className="Platforms">
                    <strong>Platforms</strong>:{" "}
                    {`${
                      typeof gameDetails.platforms === "string" 
                        ? gameDetails.platforms 
                        : gameDetails.platforms.join(", ") 
                    }`}
                  </p>
                }

                 <NavLink to="/videogames"> 
                  <button >Back</button>
                 </NavLink> 
              </div>
            ) : ( 
              <h1>Cargando</h1>
            )}
          </div>
        ) : ( 
          <h1>Cargando</h1>
        )}
      </div>
            <Footer/>

    </div>
  );
}
