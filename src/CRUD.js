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

        })
    }, [])
    return(
        <div>
            <table className="table">
                
            </table>
        </div>
    )
}

export default CRUD;