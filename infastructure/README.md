# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`InfastructureStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


Infastrcuture commands:
- sudo apt-get update && sudo apt-get install awscli
- cdk diff
- npm i -g aws cdk
- export AWS_PROFILE= {accountnumber}-its-admin
- aws configure set default.region eu-west-2
- add onto the end of a deploy command '--region eu-west-2'
