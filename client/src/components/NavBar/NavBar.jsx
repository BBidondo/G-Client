import React from 'react'
import fondo from '../NavBar/NavBar.css'
import { NavLink } from 'react-router-dom'


function NavBar() {
    return ( 
    <div className='BotNav'> 
        <div className= {fondo.contenedor}>
                <div className="Botones">
                <NavLink to='/'><button>INTRO</button></NavLink>
                <NavLink to='/videogames'><button>VIDEOGAMES</button></NavLink>
                <NavLink to='/crearjuego'><button>CREATE GAME</button></NavLink>
                <NavLink to='/about'><button>ABOUT</button></NavLink>
                </div>
                
                </div>
        </div> 
    )
}

export default NavBar
