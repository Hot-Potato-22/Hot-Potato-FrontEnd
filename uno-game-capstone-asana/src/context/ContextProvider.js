import { useState, useEffect } from "react";
import Context from "./Context";

function ContextProvider({children}){
    const [ listOfPlayers, updateListOfPlayers ] = useState([])
    const [ listOfMaps, updateListOfMaps ] = useState([])
    const [ listOfGames, updateListofGames ] = useState([])

    const [ token, updateToken ] = useState("")
    const [ verifiedPlayer, updateVerifiedPlayer ] = useState({})

    const [userInfo, updateUserInfo] = useState({});

    const getAllPlayers = async() => {
        const res = await fetch("http://localhost:3032/players")
        const data = await res.json();
        return data.data
    }

    useEffect(() => {
      getAllPlayers().then(players => {
        updateListOfPlayers(players);
      })  
    }, [])

    const getAllMaps = async() => {
        const res = await fetch("http://localhost:3032/maps")
        const data = await res.json();
        return data.data
    }

    useEffect(() => {
        getAllMaps().then(maps => {
            updateListOfMaps(maps)
        })
    }, [])

    const getAllGames = async() => {
        const res = await fetch("http://localhost:3032/games")
        const data = await res.json()
        return data.data
    }

    useEffect(() => {
        getAllGames().then(games => {
            updateListofGames(games)
        })
    }, [])

    const state = {
        getAllPlayers,
        listOfPlayers, 
        updateListOfPlayers,
        getAllMaps, 
        listOfMaps, 
        updateListOfMaps,
        getAllGames,
        listOfGames,
        updateListofGames,
        token,
        updateToken, 
        verifiedPlayer,
        updateVerifiedPlayer, 
        userInfo, 
        updateUserInfo
    }

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;