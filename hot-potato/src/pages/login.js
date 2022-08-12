import { Link } from 'react-router-dom';
import Context from '../context/Context';
import React from 'react';

function Login(){
    const [playerInfo, setPlayerInfo] = React.useState({});
    const context = React.useContext(Context);

    const handleSubmit = (event) => {
        event.preventDefault();
        const playerUsername = event.target.username.value;
        const playerPassword = event.target.password.value;
        console.log(playerUsername, playerPassword);

        setPlayerInfo({
            username : playerUsername,
            password : playerPassword
        })
    }

    const loginAttempt = async(playerData) => {
        const response = await fetch("http://localhost:3032/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(playerData)
        })
        const data = await response.json()
        return data;
    }

    React.useEffect(() => {
        loginAttempt(playerInfo).then(data => {
            context.updateToken(data.token)
            context.updateVerifiedPlayer(data)
        })
    }, [playerInfo])

    React.useEffect(() => {
        console.log(context.token);
        console.log(context.VerifiedPlayer)
    }, [context.token])

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input name='username' type="username" placeholder='Enter Username'/>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" placeholder='Enter Password'/>
                </div>
                <button type='submit'> Submit </button>
            </form>
            <span>Don't have an account? <Link to="/signup" >SignUp</Link></span>
            <Link to="/start">Start Page</Link>
        </div>
    )
}

export default Login;