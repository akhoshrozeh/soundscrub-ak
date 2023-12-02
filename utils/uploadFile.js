import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const storageClient = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
})

export const uploadFileToS3 = async ({file, fileName, fileType="image/png"}) => {
    const fileBuffer = file;
    console.log(fileName);

    const key = `${fileName}-${Date.now()}`;
    
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType: fileType
    }
    const command = new PutObjectCommand(params);
    await storageClient.send(command)
 
    const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;
    
    return fileUrl

}