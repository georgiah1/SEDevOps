const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const util = require('../utils/util')
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'department-users'
// encrypt password at rest and intransit 
const bcrypt= require('bcryptjs')


async function register(userInfo){
    const name= userInfo.name;
    const email = userInfo.email;
    const username = userInfo.username;
    const password = userInfo.password;
    // if empty or undenified return a field 401 as all fields are required
    if (!username || !name || !email || !password){
        return util.buildResponse(401, {
            message: 'All fields are required to register a new employee'
        })
    }
    const dynamoUser = await getUser(username);
    if (dynamoUser && dynamoUser.username){
        return util.buildResponse(401, {
            message: 'That employee already exsists in the database. Please choose a different username'
        })
    }
    //get rid of white space in password
    const encryptedPassword = bcrypt.hashSync(password.trim(), 10)
    const user= {
        name: name,
        email: email,
        // make sure Felix or felix is accepted as the same employee 
        username: username.toLowerCase().trim(),
        password: encryptPassword
    }

    const saveUserResponse = await saveUser(user);
    if (!saveUserResponse){
        return util.buildResponse(503, {message: 'Server Error. Please try again later'})
    }

    return util.buildResponse(200, {username: username})
}

async function getUser(username){
    const params ={
        TableName: userTable,
        Key: {
            username: username
        }
    }

    return await dynamodb.get(params).promise().then(reponse =>{
        return Response.Item;
    }, error => {
        console.error('There is an error geeting the employee: ', error)
    })
}

async function saveUser(user){
    const params = {
        TableName: userTable,
        Item: user
    }
    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error => {console.error('There is an error saving the employee: ', error)});
}

module.exports.register = register;