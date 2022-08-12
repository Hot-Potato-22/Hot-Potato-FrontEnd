import { Link } from 'react-router-dom';
import Context from '../context/Context';
import React from 'react';

function SignUp(){
    const [playerInfo, setPlayerInfo] = React.useState({})
    const context = React.useContext(Context);

    const handleSubmit = (event) => {
        event.preventDefault();
        const playerUsername = event.target.username.value;
        const playerPassword = event.target.password.value;
        console.log(playerUsername, playerPassword)

        setPlayerInfo({
            username : playerUsername,
            password : playerPassword
        })
    }

    const createNewPlayer = async (playerData) => {
        const response = await fetch("http://localhost:3032/signup", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(playerData)
        })
        const data = await response.json();
        return data;
    }

    React.useEffect(() => {
        createNewPlayer(playerInfo).then(newPlayerData => {
            context.updateToken(newPlayerData.token)
        })
    }, [playerInfo])

    React.useEffect(() => {
        console.log(`This is context token: ${context.token}`);
    }, [context.token])

    return (
        <div>
            <h2>Sign up using the form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input name= "username" type="username" placeholder="Enter your username" />
                </div>
                <div>
                    <label>Password</label>
                    <input name= "password" type="password" placeholder="Enter your password" />
                </div>
                <button type='submit'> Submit </button>
            </form>
            <span>
                <Link to="/" >Login</Link>
            </span>
        </div>
    )

}

export default SignUp