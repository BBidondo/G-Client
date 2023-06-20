import axios from "axios";

export const GET_GENRES = "GET_GENRES";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const VOLVER_A_HOME = "VOLVER_A_HOME";
export const CLEAN = "CLEAN";
export const ORDER_BY = "ORDER_BY";
export const FILTER_BY = "FILTER_BY";
export const CREATE_GAME  = "CREATE_GAME ";




export function searchByName(name)  { 
  return function (dispatch) { 
    return axios.get(`/videogames?name=${name}`) 
      .then((res) => { 
        console.log(res)
        dispatch({ type: 'SEARCH_BY_NAME', payload: res.data }); 
      })
      .catch((err) => {
        return err;
      });
  };
}
//
export function getGenres() { 
  return async function (dispatch) { 
    try {
      var res = await axios.get('/genres'); 
      console.log(res)
      return dispatch({  
        type: 'GET_GENRES', payload: res.data,
      });
    } catch (error) { 
        console.log (error);
      }
    };
}
export function getVideogameDetail(id) { 
  return function (dispatch) {
    axios
      .get(`/videogame/${id}`) 
      .then((res) => { 
        console.log(res)
        dispatch({ type: 'GET_VIDEOGAME_DETAIL', payload: res.data }); 
      })
      .catch((err) => { 
        return err;
      });
  };
}
export function getAllGames() { 
  return function (dispatch) { 
    return axios.get("/videogames/") 
      .then((res) => { 
        console.log(res)
        dispatch({ type: 'GET_ALL_GAMES', payload: res.data }); 
      })
      .catch((err) => { 
        return err;
      });
  };
}

export function volverAhome(){ 
  return function (dispatch){ 
    dispatch({type:'VOLVER_A_HOME'}) 
  }
}

export function clean(){ 
  return function (dispatch){ 
    dispatch({type:'CLEAN'}) 
  }
}


export function orderBy(order) { 
  return function (dispatch) { 
    console.log(order)
    dispatch({ type: 'ORDER_BY', payload: order }); 
  };
}


export function filterBy(order) { 
  return function (dispatch) { 
    console.log(order)
    dispatch({ type: 'FILTER_BY', payload: order }); 
  };
}

export const createVideogame = (game) => async dispatch => {
  const newGame = await axios.post("/videogames", { data: game });
  return dispatch({type: CREATE_GAME, payload: newGame.data})
};
