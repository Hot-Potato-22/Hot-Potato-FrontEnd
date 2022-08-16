import MapList from "../components/MapList";
import Context from "../context/Context";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

function CreateGame(){
    const navigate = useNavigate()

    const [ gameInfo, setGameInfo ] = useState({})

    const context = useContext(Context);

    const generateCode = event => {
        let code = ""
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const charactersLength = characters.length;
    
        for(let i=0; i<6;i++){
            code += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return code
    }

    const handleSubmit = event => {
        event.preventDefault();
        const mapId = "1"
        const hostedBy = context.verifiedPlayer.playerInfo.username
        const hostId = context.verifiedPlayer.playerInfo.player_id
        let roomCode = generateCode()
        console.log(mapId, hostedBy, hostId, roomCode)
        setGameInfo({
            map_id : mapId,
            room_code : roomCode,
            hosted_by : hostedBy,
            host_id: hostId
        })
    }

    const createGame = async (gameData) => {
        const response = await fetch('http://localhost:3032/game', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(gameData)
        })
        const data = await response.json();
        return data
    }

    useEffect(() => {
        createGame(gameInfo).then(newGameData => {
            console.log(`Game info: ${newGameData}`)
        })
    }, [gameInfo])

    return (
        <div>
            <button onClick={() => navigate('/')}>Go back</button>
            <h1>Choose a Map</h1>
            <form onSubmit={handleSubmit}>
                <div><MapList/></div>
                <div className="create-btn-div">
                    <button type="submit" className="create-btn">Create</button>
                </div>
            </form>
            <div className="create-btn-div">
            <button></button>
            </div>
        </div>
    )
}

export default CreateGame;