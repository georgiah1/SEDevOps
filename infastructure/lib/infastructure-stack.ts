import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Policy } from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class InfastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // db to store users for the login page
    const SEDevOpsUsers = new dynamodb.TableV2(this, 'SEDevOpsUsers', {
      partitionKey: { name: 'username', type: dynamodb.AttributeType.STRING },
    });

    //lambda to interact with dynamodb
    const connectorToDynamoDBLambda = new lambda.Function(this, 'connectorToDynamoDBLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'connectorToDynamoDBLambda.handler',
      code: lambda.Code.fromAsset('lambdas'),
      timeout: Duration.minutes(5)
    });

    //gives lambda access to the dynamo to do put,update and delete actions
    SEDevOpsUsers.grantWriteData(connectorToDynamoDBLambda); 

    //creating apigateway so the api can interact with the backend with cors to prevent the frontend client erroring when called
    const SEDevOpsApigateway = new apigateway.LambdaRestApi(this, "SEDevOpsApigateway", {
      restApiName: "Widget Service",
      description: "This service serves widgets.",
      handler: connectorToDynamoDBLambda,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS
      }
    });

    // makes API HTTP endpoints with  a GET/health and POST /heath
    const healthcheckApi = SEDevOpsApigateway.root.addResource('health');
    healthcheckApi.addMethod('GET');

    const regsiterApi = SEDevOpsApigateway.root.addResource('register');
    regsiterApi.addMethod('POST');

    const loginApi= SEDevOpsApigateway.root.addResource('login');
    loginApi.addMethod('POST');

    const verifyApi= SEDevOpsApigateway.root.addResource('verify');
    loginApi.addMethod('POST');
  }

}
