#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { InfastructureStack } from '../lib/infastructure-stack';

const app = new cdk.App();
new InfastructureStack(app, 'InfastructureStack');
