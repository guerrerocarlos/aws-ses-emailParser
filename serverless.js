const config = require("./config.js")

const serverless = {
   "service": "aws-ses-mailparser",
   "frameworkVersion": "2",
   "provider": {
      "name": "aws",
      "runtime": "nodejs12.x",
      "lambdaHashingVersion": 20201221,
      "stage": "dev",
      "region": "us-west-2",
      "deploymentBucket": { name: 'serverless-bucket-${self:provider.region}' },
      "iamRoleStatements": [
         {
            "Effect": "Allow",
            "Action": [
               "s3:ListBucket"
            ],
            "Resource": {
               "Fn::Join": [
                  "",
                  [
                     "arn:aws:s3:::",
                     "/${self:custom.s3StorageBucket}"
                  ]
               ]
            }
         },
         {
            "Effect": "Allow",
            "Action": [
               "s3:PutObject"
            ],
            "Resource": {
               "Fn::Join": [
                  "",
                  [
                     "arn:aws:s3:::",
                     "/${self:custom.s3StorageBucket}/*"
                  ]
               ]
            }
         }
      ]
   },
   "custom": {
      "s3StorageBucket": config.destinationBucket,
   },
   "resources": {
      "Resources": {
         "LambdaRole": {
            "Type": "AWS::IAM::Role",
            "Properties": {
               "ManagedPolicyArns": [
                  "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess",
                  "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
                  "arn:aws:iam::aws:policy/AmazonS3FullAccess"
               ],
               "AssumeRolePolicyDocument": {
                  "Version": "2012-10-17",
                  "Statement": [
                     {
                        "Action": [
                           "sts:AssumeRole"
                        ],
                        "Effect": "Allow",
                        "Principal": {
                           "Service": [
                              "lambda.amazonaws.com"
                           ]
                        }
                     }
                  ]
               }
            }
         }
      }
   },
   "functions": {
      "receiveEmail": {
         "handler": "handler.emailHandler",
         "role": "LambdaRole"
      }
   }
}

module.exports = serverless