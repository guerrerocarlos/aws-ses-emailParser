## How to

# Requirements

 - Have AWS SES configured with your domain
 - Create a bucket in AWS S3
 - Add this policy to the bucket, replace BUCKET_NAME and YOUR_ACCOUNT_ID with yours:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowSESPuts-1501162912388",
            "Effect": "Allow",
            "Principal": {
                "Service": "ses.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::BUCKET_NAME/*",
            "Condition": {
                "StringEquals": {
                    "aws:Referer": "YOUR_ACCOUNT_ID"
                }
            }
        }
    ]
}
```

## Deployment

# Deploy this serverless function 

 npm install
 serverless deploy

# Go to AWS SES Management Console and setup a Rule Set 
