import React, {useEffect, useState} from 'react';
import axios from 'axios';


const CRUDUrl= "https://4o7dlcyoo8.execute-api.eu-west-2.amazonaws.com/items"

const CRUD = () => {
    const [badgeId, setBadgeId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [columns, setColumns] = useState('')
    const [records, setRecords] = useState('')
    const [jsonLength, setJsonLength] = useState('')
    const [jsonValues, setJsonValues] = useState('')
    const [temporaryValue] = useState('')
    const JSONArrayIds =[]
    const JSONArrayNames= []
    useEffect(() => {
        axios.get('https://4o7dlcyoo8.execute-api.eu-west-2.amazonaws.com/items')
        .then(res => {
            console.log(res.data.length)
            setJsonLength(res.data.length)
            
            for (let i = 0; i < (res.data.length); i++) {
                console.log(res.data[i].id)
                const temporaryValue= (res.data[i].id)
                JSONArrayIds.push(temporaryValue)
                console.log(JSONArrayIds)
            }
            for (let i = 0; i < (res.data.length); i++) {
                console.log(res.data[i].name)
                const temporaryValue= (res.data[i].name)
                JSONArrayNames.push(temporaryValue)
                console.log(JSONArrayNames)
                
            }

            document.getElementById('definition2').value = JSONArrayNames[1].toString();
            document.getElementById('definition1').value = JSONArrayIds[1].toString();
            document.getElementById('definition3').value = JSONArrayIds[0].toString();
            document.getElementById('definition4').value = JSONArrayNames[0].toString();
        })
    }, [])
    return(
        
        <body>
        <div>
        <h2>Employee Table</h2>
            <table className="table">
                <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                </tr>
                <tr>
                   
                    <td><input type="text" id='definition1' placeholder='Definition' value="Empty" class="form-control" /></td>
                    <td><input type="text" id='definition2' placeholder='Definition' value="Empty" class="form-control" /></td>
                    <button type="button" styles="padding: 15px 32px">Edit User</button>
                    <button type="button" styles="padding: 15px 32px">Delete User</button>
                </tr>
                <tr>
                    <td><input type="text" id='definition3' placeholder='Definition' value="Empty" class="form-control" /></td>
                    <td><input type="text" id='definition4' placeholder='Definition' value="Empty" class="form-control" /></td>
                </tr>   
            </table>
        </div>
        </body>
    )
}

export default CRUD;