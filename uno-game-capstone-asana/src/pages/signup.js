import { Link, useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import React from 'react';
import { Input, Label, FormGroup, Form} from 'reactstrap'
import '../style/signup.css'


function SignUp(){
 
  const [playerInfo, setPlayerInfo] = React.useState({})

   
  const context = React.useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    const playerUsername = event.target.username.value;
    const playerPassword = event.target.password.value;
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
   
      <div className='form-container'>
        <body>
          <h2>Create a player</h2>
          <Form inline onSubmit={handleSubmit} className="form" >
            <FormGroup className="mb-2 me-sm-2 mb-sm-0 input">
              <Label className="me-sm-2" for="exampleEmail"> Username </Label>
              <Input id="exampleEmail" name="username" placeholder="Enter your username" type="username"/>
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0 input">
              <Label className="me-sm-2" for="examplePassword"> Password </Label>
              <Input id="examplePassword" name="password" placeholder="Enter password" type="password"/>
            </FormGroup>
            <div className='btn ' >
            <p> Already a player? <Link to="/" className='link'>Login</Link></p>
            
            <button  type='submit'>Submit</button>
            </div>
          </Form> 
        </body>
      </div>
  </div>
  )
}

export default SignUp