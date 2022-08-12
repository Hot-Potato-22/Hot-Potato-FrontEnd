import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import Context from "../context/Context";

function GameLobby(){
    let params = useParams();
    const context = useContext(Context);

    const [ game , updateCurrentGame ] = useState([])

    const [currentPlayerList, setPlayerList] = useState([])

    const [enteredInfo, setEnteredInfo ] = useState({})

    const [isClicked, setIsClicked ] = useState('true');

    const [ makePublicInfo, setMakePublicInfo ] = useState([])

    // const [ deleteInfo, setDeleteInfo ] = useState([]);

    useEffect(() => {
        context.getAllGames().then(gamesList => {
            updateCurrentGame(gamesList.find(games => games.game_id == params.id))
        })
    }, [context.gamesList])

    useEffect(() => {
        fetch(`http://localhost:3032/games/${params.id}/players`)
        .then(res => res.json())
        .then((data) => {
            //mapping over the data make another fetch call to get the player username set the playerlist
            data.playerList.map((info) => {
                fetch(`http://localhost:3032/games/${info.game_id}/players/playernames`)
                .then(res => res.json())
                .then((newData) => {
                    setPlayerList(newData.playerList)
                })
            })
        })
    }, [currentPlayerList])

    const handleClick = event => {
        const player = context.verifiedPlayer.playerInfo.player_id;
        setEnteredInfo({
            player_id: player
        })        
    }

    const handlePublicClick = event => {
        setIsClicked(!isClicked)
        const gameId = params.id
        setMakePublicInfo({
            game_id : gameId
        })
    }

    // const handleCloseGameClick = event => {
    //     const gameId = params.id
    //     setDeleteInfo({
    //         game_id : gameId
    //     })
    // }

    // const deleteGame = async (deleteInfo) => {
    //     const response = await fetch(`http://localhost:3032/game/${params.id}`, {
    //         method: "DELETE", 
    //         headers : {
    //             "Content-Type" : "application/json",
    //         },
    //         body : JSON.stringify(deleteInfo)
    //     })
    //     const data = await response.json()
    //     return data;
    // }

    const makeGamePublic = async (makePublicInfo) => {
        const response = await fetch(`http://localhost:3032/game/${params.id}/public`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(makePublicInfo)
        })
        const data = await response.json()
        return data;
    }

    const removePlayerFromGame = async (playerInfo) => {
        const response = await fetch(`http://localhost:3032/leave/${params.id}`, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(playerInfo)
        })
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        removePlayerFromGame(enteredInfo)
    }, [enteredInfo])

    useEffect(() => {
        makeGamePublic(makePublicInfo)
    }, [makePublicInfo])

    // useEffect(() => {
    //     deleteGame(deleteInfo)
    // }, [deleteInfo])

    return (
        <div>
            <p>Players in the Lobby: {params.id} </p>
            <div>
                {currentPlayerList.map((player) => {
                    return <p key={player.player_id}>{player.username}</p>
                })}
            </div>
            <div>
                {game.hosted_by === context.verifiedPlayer.playerInfo.username && 
                    <div>
                        <button>Start</button>
                        <button onClick={handlePublicClick}>{isClicked ? 'Private' : 'Public'}</button>
                        <button>Close Game</button>
                    </div>
                }
            </div>
            <button onClick={handleClick}>Leave Room</button>
        </div>
    )
}

export default GameLobby;