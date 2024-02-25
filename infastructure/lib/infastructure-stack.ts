import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Policy } from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as ApiKey from 'aws-cdk-lib/aws-apigateway';

interface apiGatewayProps{
  defaultIntegration: apigateway.Integration,
}

export class InfastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // db to store users for the login page
    const SEDevOpsUsers = new dynamodb.TableV2(this, 'SEDevOpsUsers', {
      partitionKey: { name: 'username', type: dynamodb.AttributeType.STRING },
    });

    //lambda to interact with dynamodb
    const connectorToDynamoDBLambda = new lambda.Function(this, 'connectorToDynamoDBLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'connectorToDynamoDBLambda.handler',
      code: lambda.Code.fromAsset('lambdas'),
      timeout: Duration.minutes(5)
    });

    //gives lambda access to the dynamo to do put,update and delete actions
    SEDevOpsUsers.grantWriteData(connectorToDynamoDBLambda); 
    SEDevOpsUsers.grantFullAccess(connectorToDynamoDBLambda);
    //creating apigateway so the api can interact with the backend with cors to prevent the frontend client erroring when called
    const SEDevOpsApigateway = new apigateway.LambdaRestApi(this, "SEDevOpsApigateway", {
      restApiName: "Employee Service",
      description: "This service serves employee management system.",
      handler: connectorToDynamoDBLambda,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS
      }
    });

    

    // makes API HTTP endpoints with  a GET/health and POST /heath
    const healthcheckApi = SEDevOpsApigateway.root.addResource('health');
    healthcheckApi.addMethod('GET'),{
      apiKeyRequired: true
    };

    const regsiterApi = SEDevOpsApigateway.root.addResource('register');
    regsiterApi.addMethod('POST'),{
      apiKeyRequired: true
    };

    const loginApi= SEDevOpsApigateway.root.addResource('login');
    loginApi.addMethod('POST'),{
      apiKeyRequired: true
    };

    const verifyApi= SEDevOpsApigateway.root.addResource('verify');
    verifyApi.addMethod('POST'),{
      apiKeyRequired: true
    };


const apiUseagePlan = SEDevOpsApigateway.addUsagePlan('apiUseagePlan', {
  name: 'apiUseagePlan',
  throttle: {
    rateLimit: 1000,
    burstLimit: 500
  }
});



//create api key and then attach to useage place later on 
  }
}
