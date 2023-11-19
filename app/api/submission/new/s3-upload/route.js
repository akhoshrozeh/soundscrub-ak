import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const storageClient = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
})

async function uploadFileToS3(file, fileName, fileType="image/png") {
    const fileBuffer = file;
    console.log(fileName);

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${fileName}-${Date.now()}`,
        Body: fileBuffer,
        ContentType: fileType
    }
    const command = new PutObjectCommand(params);
    console.log("About to send to storageClient")   
    console.log(process.env.AWS_S3_BUCKET_NAME)
    await storageClient.send(command)
 

    return fileName

}

export const POST = async (request) => {

    console.log("s3 upload post data")
    console.log(request.formData())

    try {
        console.log("Beginning asset upload")
        const formData = await request.formData();
        const image = formData.get("image");
        if (!image){
            return NextResponse.json({ error: "File is required"}, {status: 400})
        }
        const buffer = Buffer.from(await image.arrayBuffer());
        console.log("Attempting to upload file")
        const imageName = await uploadFileToS3(buffer, image.name);
        console.log("Upload success!")
        return NextResponse.json({success: true, imageName})

    } catch (error) {
        console.log("failed to upload")
        return NextResponse.json({error})
    }
}