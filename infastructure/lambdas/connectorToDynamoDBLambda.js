const registerService = require('./service/register');
const loginService = require('./service/login')
const verifyService = require('./service/verify')
const util = require('.utils/util')
const healthPath = '/health'
const registerPath = '/register'
const loginPath = '/login'
const verifyPath = '/verify';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "SEDevOpsUsers";

exports.handler = async (event) => {
    console.log('Request Event: ', event)
    let response
    switch(true){
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === registerPath:
        let requestJSON = JSON.parse(event.body);
        await dynamo.send(
            new PutCommand({
                TableName: tableName,
                Item: {
                    name: requestJSON.name,
                    email: requestJSON.email,
                    username: requestJSON.username,
                    password: requestJSON.password
                },
            })
        );
        body = 'Put item ${requestJSON.name}'
        break;
        case event.httpMethod === 'POST' && event.path === loginPath:
            const loginBody = JSON.parse(event.body)
            response = await loginService.login(loginBody);
            break;
        case event.httpMethod === 'POST' && event.path === verifyPath:
            const verifyBody = JSON.parse(event.body)
            response = verifyService.verify(verifyBody);
            break;
    }
    return response;
};