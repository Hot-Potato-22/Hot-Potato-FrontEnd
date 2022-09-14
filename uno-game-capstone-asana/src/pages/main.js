import NavbarFunc from "./navbar"
import '../style/lobby.css'

import React, { useContext, useEffect, useState } from 'react'

import MapCard from "../components/MapCard"


const Lobby = () =>{
  return(
    <div>
       <NavbarFunc/>
      <div className="heading">
       <h2>WELCOME TO UNO</h2>
        <p className="text">Our uno game is a 2 player game for you and your friend to enjoy. Take some time out of your day to play this fun, yet very competitive game.</p> 
      </div>
      <MapCard/>
    </div>
  )
}

export default Lobby