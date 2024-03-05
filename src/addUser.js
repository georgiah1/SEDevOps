import React, {useState} from 'react';
import axios from 'axios';
import isUserAdmin from './globalVariables';
import PasswordChecklist from "react-password-checklist"
//var cors = require('cors')


const AddUser = () => {
    const [badgeId, setBadgeId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')

    const submitHandler = (event) => {
        event.preventDefault();
        if (badgeId.trim() === '' || username.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === ''){
            setMessage('All fields are required!')
            return;
        } else if (password.length < 8) { 
            setMessage('Error: Password must be at least 8 characters'); 
            return;
        } else if(password.search(/[a-z]/) < 0) { 
            setMessage('Error: Password must contain at least one lowercase letter'); 
            return;
        } else if(password.search(/[A-Z]/) < 0) { 
            setMessage('Error: Password must contain at least one uppercase letter'); 
            return;
        } else if(password.search(/[0-9]/) < 0) { 
            setMessage('Error: Password must contain at least one number'); 
            return;
        } else { 

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
        
        axios.put("https://24gkvskzgk.execute-api.eu-west-2.amazonaws.com/items",requestBody)
        .then((response) => {
            setMessage('Registration Successful');
        })
        .catch((error) => {
            console.log(error)
            setMessage('sorry... the server is down try again later');
        });
        console.log('submit button is pressed!')
    }
    return(
        <div>
            <form onSubmit={submitHandler}>
       
                <h5> Register a new user </h5>
                badge id: <input type="text" value={badgeId} onChange={event => setBadgeId(event.target.value)} /> <br/>
                name: <input type="text" value={name} onChange={event => setName(event.target.value)} /> <br/>
                email: <input type="email" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
                password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                
                <input type="submit" value="Register" />
            </form>
            {message && <p className="message">{message}</p>} 
        </div>
    )
}

export default AddUser;