
import '../style/lobby.css'
import { Button} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
//import Context from '../context/Context';
//import { Link } from 'react-router-dom'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function MapCard(){
 
  const [gameRoomCode, setGameRoomCode] = useState('')
  
  //const context = useContext(Context)

  const generateCode = event => {
    let code = ""
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const charactersLength = characters.length;

    for(let i=0; i<6;i++){
        code += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    console.log(code)
    return code
  }


  return (
    <div>
   
      <div className='game-control'>   
       <div >
                        <Link to={`/play?roomCode=${generateCode()}`}><button className="game-control-btn">CREATE GAME</button></Link>
                    </div>
            

                <p>OR</p>
                    <div className='input-box'>
                        <input id="outlined-basic" label="Room Code"  type='text' placeholder='Game Code'  onChange={(event) => setGameRoomCode(event.target.value)} />
                        <Link to={`/play?roomCode=${gameRoomCode}`}><button className="game-control-btn">JOIN GAME</button></Link>
                    </div>
                   
                   
            </div>
        

    </div>
  )
}

export default MapCard;
