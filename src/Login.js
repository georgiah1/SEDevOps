import React, {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [badgeId, setBadgeId] = useState('')
  const [ErrorMessage, setErrorMessage] = useState(null)
  const loginUrl = "https://24gkvskzgk.execute-api.eu-west-2.amazonaws.com/items/" + badgeId
  const submitHandler = (event) => {
    event.preventDefault();
    if (badgeId.trim() === '' || username.trim() === '' || password.trim() === ''){
      setErrorMessage('Both username and password are required');
      return;
    }
    setErrorMessage(null);
    console.log('login button is pressed!')

    const requestBody= {
      badgeId: badgeId,
    }
    axios.get(loginUrl, requestBody)
    .then((response) => {
      console.log(response.data)
      console.log(response.data.username)
      console.log(response.data.password)
      apiRequest = response
      if ((response.data.username) === username || (response.data.password) === password){
        setErrorMessage('Both username and password are correct');
      } else{
        console.log('login button is pressed!')
      }
      this.setState({ redirect: true })
      console.log('correct')
      return response;
    })

    
  }
    return(
      <html>
  <head>
    <title> Welcome to the Employee Management System </title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="static/style.css"/>
  </head>
  <div class='card'>
        <div class='col-5 mx-auto'>
        <h3 class='text-center'>Login Page</h3><hr/>
           <form onSubmit={submitHandler}>
                
                badge ID: <input type="text" value={badgeId} onChange={event => setBadgeId(event.target.value)}/> <br/>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)}/> <br/>
                password: <input type="text" value={password} onChange={event => setPassword(event.target.value)}/> <br/>
                <input type="submit" value="Login" class='btn btn-primary' /> <br/>
            </form>
            {ErrorMessage && <p className="message">{ErrorMessage}</p>}
        </div>
    </div>
  </html>
    )
}

export default Login;