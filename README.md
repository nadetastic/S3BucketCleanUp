# S3 Bucket CleanUp

Provide a list of bucket names to the `BUCKET_NAMES` array and invoke the function. This process be ran locally with `sam local invoke` assuming you have the SAM CLI and Docker installed, as well as a profile with permissions configured for the CLI - but can also be deployed as a stand alone Lambda function.

## Use the AWS SAM CLI to build and invoke locally

Build your application by using the `sam build` command.

```bash
$ sam build
```

The AWS SAM CLI installs dependencies that are defined in `package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
$ sam local invoke --profile <profile_name>
```

## Deploy to Lambda

To build and deploy your application for the first time, run the following in your shell:

```bash
$ sam build
$ sam deploy --guided --profile <profile_name>
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts.