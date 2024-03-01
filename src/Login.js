import React, {useState} from 'react';
import axios from 'axios';

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
      return response;
    })
  }
    return(
        <div>
           <form onSubmit={submitHandler}>
                <h5> Login </h5>
                badge ID: <input type="text" value={badgeId} onChange={event => setBadgeId(event.target.value)}/> <br/>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)}/> <br/>
                password: <input type="text" value={password} onChange={event => setPassword(event.target.value)}/> <br/>
                <input type="submit" value="Login"/> <br/>
            </form>
            {ErrorMessage && <p className="message">{ErrorMessage}</p>}
        </div>
    )
}

export default Login;