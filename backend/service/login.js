const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const util = require('../utils/util')
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'department-users'
// encrypt password at rest and intransit 
const bcrypt= require('bcryptjs')

async function login(user) {
   const username = user.username 
}