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

    const key = `${Date.now()}-${fileName}`;
    

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

export const POST = async (request) => {

    try {
        console.log("Beginning asset upload")
        const formData = await request.formData();
        const image = formData.get("image");
        const audio = formData.get("audio")
        if (!image || !audio){
            console.log("Failed to reach buffer")
            return NextResponse.json({ error: "File is required"}, {status: 400})
        }
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        const audioBuffer = Buffer.from(await audio.arrayBuffer());
        const [imageUrl, audioUrl] = await Promise.all([
            uploadFileToS3(imageBuffer, image.name, "image/jpeg"),
            uploadFileToS3(audioBuffer, audio.name, "audio/wav")
        ]);
        
        console.log("Upload success!")
        const data = {
            imageUrl: imageUrl,
            audioUrl: audioUrl
        }
        return NextResponse.json({success: true, data})

    } catch (error) {
        console.log("failed to upload")
        return NextResponse.json({error})
    }
}