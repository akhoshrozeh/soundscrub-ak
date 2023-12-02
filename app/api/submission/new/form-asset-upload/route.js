import { NextResponse } from "next/server"
import { uploadFileToS3 } from "@utils/uploadFile"
import { validateAudio } from "@utils/validateAudio"
import { validateImage } from "@utils/validateImage"

// form upload for audio and image
export const POST = async (request) => {

    try {
        console.log("Beginning asset upload")
        const formData = await request.formData();
        const image = formData.get("image");
        const audio = formData.get("audio")
        
        if (!validateImage(image) || !validateAudio(audio)){
            console.log("Failed to reach buffer")
            return NextResponse.json({ error: "File is required"}, {status: 400})
        }

        const uploads = await Promise.all([
            uploadFileToS3(Buffer.from(await image.arrayBuffer()), image.name),
            uploadFileToS3(Buffer.from(await audio.arrayBuffer()), audio.name)
        ]);

        console.log("File Upload success!")
        return NextResponse.json({success: true, imageUrl: uploads[0], audioUrl: uploads[1] })

    } catch (error) {
        console.log("failed to upload")
        return NextResponse.json({error})
    }
}