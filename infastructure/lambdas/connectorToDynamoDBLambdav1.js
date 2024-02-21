const healthPath = '/health'
const registerPath = '/register'
const loginPath = '/login'
const verifyPath = '/verify';

exports.handler = async (event) => {
    console.log('Request Event: ', event)
    let reponse
    switch(true){
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = buildResponse(200);
            break;
        case event.httpMethod === 'GET' && event.path === registerPath:
            response = buildResponse(200);
            break;
        case event.httpMethod === 'GET' && event.path === loginPath:
            response = buildResponse(200);
            break;
        case event.httpMethod === 'GET' && event.path === verifyPath:
            response = buildResponse(200);
            break;
    }
    return response;
};

function buildResponse(statusCode, body){
    return{
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    }
}