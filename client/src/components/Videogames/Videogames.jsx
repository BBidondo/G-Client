import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import Videogame from "../VideoGame/Videogame";
import Pagination from "../Pagination/Pagination";
import FilteredBy from "../FilterBy/FilterBy";
import "./videogames.css";
import { getAllGames, getGenres } from "../../Redux/actions";
import Footer from "../Footer/Footer"

export default function Videogames() {
  console.log("se ejetuto el constructor");
  let allGames = useSelector((state) => state.filtered);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const [cardPerPage] = useState(15);

  //* indices de la paginación:
  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;

  const currentCards = allGames.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    console.log("se monto");
    if (allGames.length === 0) {
      dispatch(getAllGames());
      dispatch(getGenres());
    } 
  }, [allGames.length, dispatch]);

  useEffect(() => {
    return () => console.log("se desmonto");
  }, []);

  return (
    <div className="container">
      <SearchBar />
      <NavBar />
      <FilteredBy />

      <div className="games-div">
        {currentCards.length >= 1 ? (
          currentCards.map((g) => (
            <Videogame
              key={g.id}
              name={g.name}
              rating={g.rating}
              genres={g.genres}
              image={g.background_image}
              id={g.id}
              platforms={g.platforms}
            />
          ))
        ) : typeof currentCards === "string" ? (
          <div>
            <div className="notFound"> Not Found </div>
          </div>
        ) : (
          <div>
            <div className="loading"></div>
          </div>
        )}
      </div>
      <Pagination
        cardPerPage={cardPerPage}
        totalCards={allGames.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <Footer/>
    </div>
  );
}
