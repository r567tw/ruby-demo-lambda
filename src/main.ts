import { App, Construct, Stack, StackProps } from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    
    new lambda.Function(this, 'ruby-demo',{
      runtime: lambda.Runtime.RUBY_2_7,
      handler: 'lambda.lambda_handler',
      code: lambda.Code.fromAsset(path.join(__dirname,"functions"))
    })
    // define resources here...
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'my-stack-dev', { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();