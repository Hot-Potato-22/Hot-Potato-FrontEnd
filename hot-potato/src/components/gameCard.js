import { useEffect, useState, useContext } from "react";
import Context from "../context/Context";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";


function GameCard(props){
    const params = useParams();
    let navigate = useNavigate();
    const context = useContext(Context)
    
    const { game } = props;
    const [ selectedGame, setSelectedGame ] = useState([])

    // To retrieve a specific game
    useEffect(() => {
        fetch(`http://localhost:3032/games/${game.game_id}`)
        .then(res => res.json())
        .then((data) => {
            setSelectedGame(data)
        })
    }, [])
    
    // opens the room code form
    const [isShown, setIsShown] = useState(false);
    const handleClick = event => {
        setIsShown(true);
    };

    const [ enteredInfo, setEnteredInfo ] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault()
        const codeEntered = event.target.code.value;
        const player = context.verifiedPlayer.playerInfo.player_id
        const gameId = params.id
        console.log(player, gameId, codeEntered)

        setEnteredInfo({
            player_id : player,
            game_id : gameId
        })
    }

    const postPlayerInGame = async (postPlayerInfo) => {
        const response = await fetch(`http://localhost:3032/game/${game.game_id}/lobby`, {
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(postPlayerInfo)
        })
        const data = await response.json();
        return data;
    }
    // closes the room code form 
    const handleSecondClick = event => {
        setIsShown(false);
    }

    // Handles the 
    useEffect(() => {
        postPlayerInGame(enteredInfo)
    }, [enteredInfo])

    return (
        <div className="game-card">
            <div className="margin">
                {/* image wont show when page reloads */}
                <img alt="map-img"></img>
            </div>
            <div className="margin">{game.hosted_by}</div>
            <div className="margin">{game.is_public === false ? 'Private' : 'Public'}</div>
            <button className="btn" onClick={  handleClick  }>Join</button>

            { isShown && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="code" placeholder="Enter the room code"></input>
                        <button type="submit">Enter</button>
                    </form>
                    <button onClick={handleSecondClick}>Cancle</button>
                    <button><Link to={`/Hot-Potato/games/${game.game_id}`}>Link</Link></button>
                </div>
            )}
        </div>
    )
}

export default GameCard;