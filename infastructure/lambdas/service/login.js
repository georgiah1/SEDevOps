const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const util = require('../utils/util')
const auth = require('../utils/auth')
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'department-users'
// encrypt password at rest and intransit 
const bcrypt= require('bcryptjs')

async function login(user) {
   const username = user.username;
   const password = user.password;
   if (!user || !username || !password){
    return util.buildResponse(401, { message: 'Username and Password are required'})
   }
}

const dynamoUser = await getUser(username);
if (!dynamoUser || !dynamoUser.username){
    return util.buildResponse(403, {message: 'User does not exist'});
}

const userInfo = {
    username: dynamoUser.username,
    name: dynamoUser.name,
}

const token = auth.generateToken(userInfo)
const response = {
    user: userInfo,
    token : token
}
return util.buildResponse(200, response);

async function getUser(username){
    const params ={
        TableName: userTable,
        Key: {
            username: username
        }
    }

    return await dynamodb.get(params).promise().then(response =>{
        return response.Item;
    }, error => {
        console.error('There is an error getting the employee: ', error)
    })
}

module.exports.login = login;