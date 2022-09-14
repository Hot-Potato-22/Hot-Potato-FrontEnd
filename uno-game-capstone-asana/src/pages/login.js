import { Link, useNavigate} from 'react-router-dom';
import Context from '../context/Context';
import React from 'react';
import { Input, Label, FormGroup, Form} from 'reactstrap'
import "../style/login.css"
function Login(){
    const navigate = useNavigate();
    const [playerInfo, setPlayerInfo] = React.useState({});
    let   [attempts, updateAttempts] = React.useState(0);
    const [message, setMessage] = React.useState('')
    const context = React.useContext(Context);
 


    const handleSubmit = (event) => {
        event.preventDefault();
        const playerUsername = event.target.username.value;
        const playerPassword = event.target.password.value;
        console.log(playerUsername, playerPassword);
        if(playerUsername){
            setPlayerInfo({
            username : playerUsername,
            password : playerPassword
            })
        }
        updateAttempts(attempts += 1)    
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
        console.log(data)
        return data;
    }

    React.useEffect(() => {
        if(attempts > 0){
            loginAttempt(playerInfo).then(data => {
                if(data.message) {
                    setMessage(data.message)
                } else {
                    setMessage('');
                    context.updateUserInfo(data)
                    navigate('/home')
                }
            })
        }
    }, [playerInfo])

    return (
        <div className='form-container2'>
            <h2>Login</h2>
          
            <Form inline onSubmit={handleSubmit} className='form'>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0 input">
              <Label className="me-sm-2" for="exampleEmail"> Username </Label>
              <Input  name="username" placeholder="Enter your username" type="username"/>
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0 input">
              <Label className="me-sm-2" for="examplePassword"> Password </Label>
              <Input name="password" placeholder="Enter password" type="password"/>
            </FormGroup>
            <div className='btn'>
            <p>Not a user yet? <Link to="/signup" className='link'>Signup</Link></p>
            <button  type='submit'>Submit</button>
            </div>
          </Form> 
        </div>
    )
}

export default Login;