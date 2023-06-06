import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchByName, getAllGames, volverAhome } from '../../Redux/actions';
import './SearchBar.css';
import lupa from "../../img/icone-loupe-gris.png";
import logo from  '../../img/white logo.png';


function SearchBar({ searchByName, volverAhome }) {
  const [input, setInput] = useState({
    buscar: ''
  });

  const handleInputChange = function(e) {
    setInput({
      [e.target.name]: e.target.value
    });
  };

  const handleOnClick = () => {
    searchByName(input.buscar);
    setInput({
      buscar: ''
    });
  };

  const handleOnClickAll = () => {
    volverAhome();
    setInput({
      buscar: ''
    });
  };

  useEffect(() => {
    function handleEnterPress(event) {
      if (event.key === 'Enter') {
        handleOnClick();
      }
    }
    document.addEventListener('keypress', handleEnterPress);
    return () => {
      document.removeEventListener('keypress', handleEnterPress);
    };
  }, [handleOnClick]);

  return (
    <div className="Background">
      <div className="searchbar-div">
      
          <img className="Logo" src={logo} alt="Logo" />
             
      <input
          className="bar-btn"
          name="buscar"
          placeholder="Search"
          onChange={handleInputChange}
          value={input.buscar}
          autoComplete="off"
        ></input>
        <button className="btn" onClick={handleOnClick}>
          <img className="lupaa" src={lupa} alt="Search" />
        </button>
      </div>
    </div>
  );
}

export default connect(null, { searchByName, getAllGames, volverAhome })(SearchBar);
