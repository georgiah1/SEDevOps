import React, {useState} from 'react';
import axios from 'axios';

const registerUrl= "https://057wo5klq2.execute-api.eu-west-2.amazonaws.com/register"

const Register = () => {
    const [badgeId, setBadgeId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const submitHandler = (event) => {
        event.preventDefault();
        if (badgeId.trim() === '' || username.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === ''){
            setMessage('All fields are required!')
            return;
        }

        //const requestConfig = {
        //    headers: {
        //        'x-api-key': ''
        //    }
        //};
        const requestBody= {
            badgeId: badgeId,
            username: username,
            email:email,
            name: name,
            password: password
        }
        //add requestBody, requestConfig when get api key 
        axios.put(registerUrl,requestBody).then(response => {
            setMessage('Registration Successful');
        }).catch(error => {
            if (error.response.status === 401){
                setMessage(error.response.data.message);
            } else {
                setMessage('sorry... the server is down try again later')
            }
        })
        console.log('submit button is pressed!')
    }
    return(
        <div>
            <form onSubmit={submitHandler}>
                <h5> Register a new user </h5>
                badge id: <input type="text" value={badgeId} onChange={event => setBadgeId(event.target.value)} /> <br/>
                name: <input type="text" value={name} onChange={event => setName(event.target.value)} /> <br/>
                email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
                password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                <input type="submit" value="Register" />
            </form>
            {message && <p className="message">{message}</p>} 
        </div>
    )
}

export default Register;