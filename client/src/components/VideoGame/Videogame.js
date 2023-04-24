import React from "react";
import { Link } from "react-router-dom";
import "./videogame.css";
import photo from "../../img/conecting.gif";

export default function Videogame({ id, name, rating, genres, image }) {
  return (
    <div className="container-game">
      <Link to={`/videogame/${id}`}>
        <div className="card">
          <div className="Imge">
            {image ? (
              <img src={`${image}`} alt="Videogame" className="Imge" />
            ) : (
              <img src={photo} alt="Videogame" className="Imge" />
            )}
          </div>
        </div>
        <div className="title-game">{name}</div>

        <div className="infoRating">
          {
            <p>
              <strong>Rating</strong>: ★ {`${rating}`}
            </p>
          }
        </div>
        <div className="infoContGenres">
          {
            <p className="">
              <strong>Genres :</strong>{" "}
              {`${typeof genres === "string" ? genres : genres.join(", ")}`}
            </p>
          }
        </div>
      </Link>
      <br></br>
    </div>
  );
}
