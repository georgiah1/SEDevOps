import React, {useEffect, useState} from 'react';
import axios from 'axios';
import userID from './globalVariables.js'


const CRUDUrl= "https://4o7dlcyoo8.execute-api.eu-west-2.amazonaws.com/items"

const CRUD = () => {
    
    const [message, setMessage] = useState('')
    const [jsonValues, setJsonValues] = useState(null)
    message="hi"
    const deleteHandler = (event, rowId) => {
        axios.delete("https://24gkvskzgk.execute-api.eu-west-2.amazonaws.com/items/"+ rowId)
        .then((response) => {
            setMessage('Delete Successful');
        })
        .catch((error) => {
            console.log(error)
            setMessage('sorry... the server is down try again later');
        });
    }
    useEffect(() => {
        axios.get('https://4o7dlcyoo8.execute-api.eu-west-2.amazonaws.com/items')
        .then(res => {
            console.log(res.data)
            setJsonValues(res.data)
            console.log(jsonValues)
        })
    }, [])
    return(
        <html>
        <head>
            <title> Welcome to the Employee Management System </title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="static/style.css"></link>
        </head>
        <body>
        <div class='card' styles="padding: 10px 10px; color: rgb(28, 85, 166); box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); transition: 0.3s; border-radius: 5px">
        <h3 class='text-center mb-3'>Welcome to the Employee Management System</h3>
        <p class='text-right'><a href='/addUser' class='btn btn-success '>+Add User</a></p>
            <table className="table" class='table table-bordered'>
                <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {(jsonValues ?? []).map((row) =>(
                <tr>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td><a href='/updateUser' class='btn btn-primary'>Edit</a></td>
                    <td><button type="button" onclick={deleteHandler(row.id)} class='btn btn-danger'>Delete</button></td>
                </tr>
                ))}  
            </table>
        </div>
        </body>
        </html>
    )
}

export default CRUD;