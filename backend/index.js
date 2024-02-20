const registerService = require('./service/register');
const loginService = require('./service/login')
const verifyService = require('./service/verify')
const util = require('.utils/util')
const healthPath = '/health'
const registerPath = '/register'
const loginPath = '/login'
const verifyPath = '/verify';

exports.handler = async (event) => {
    console.log('Request Event: ', event)
    let reponse
    switch(true){
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200);
            break;
        case event.httpMethod === 'GET' && event.path === registerPath:
            const registerBody = JSON.parse(event.body)
            response = await registerService.register(registerBody)
            break;
        case event.httpMethod === 'GET' && event.path === loginPath:
            const loginBody = JSON.parse(event.body)
            response = await loginService.login(loginBody);
            break;
        case event.httpMethod === 'GET' && event.path === verifyPath:
            response = util.buildResponse(200);
            break;
    }
    return response;
};