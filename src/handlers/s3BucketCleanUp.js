/**
 * A Lambda function that returns a static string
 */

const AWS = require('aws-sdk');
var s3 = new AWS.S3();


const BUCKET_NAMES = [];

exports.handler = async () => {

    for( bucket of BUCKET_NAMES){
        const contents = await bucketContents(bucket);

        if(contents.Contents.length === 0) {
            console.log(bucket,'- bucket is empty, commence deleting..');
            await deleteBucket(bucket);
        } else {
            console.log(bucket,'- is not empty with',contents.Contents.length,'objects');
            const res = await deleteManyObjs(bucket,contents.Contents);
            // console.log('Contents',contents.Contents)
        }
    };

    return;
}


const bucketContents = async (bucket) => {
    var params = { Bucket: bucket };
    return s3.listObjects(params).promise()
}

const deleteBucket = async (bucket) => {
    var params = { Bucket: bucket };
    return s3.deleteBucket(params).promise();
}

const deleteManyObjs = async (bucket,contents) => {

    let objects = [];

    for (content of contents) {
        objects.push({Key:content.Key})
    }
    var params = {
        Bucket: bucket, 
        Delete: {
            Objects: objects, 
            Quiet: false
        }
    };

    console.log('Deleting',objects.length,'items...')
    
    return s3.deleteObjects(params).promise();   
}