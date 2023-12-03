import { connectToDB } from '@utils/database';
import Release from '@models/release';

export const POST = async (req) => {

    const { userId, title, artist, link, description, coverImage, releaseType, tags, audioUrl} = await req.json();

    console.log("preparing to send new Release route");

    try {
        await connectToDB();
        // currently isAccepted is set to true for development mode
        const newRelease = new Release({ creator: userId, title, artist, link, description, coverImage, releaseType, tags, audioUrl, isAccepted: true});
        console.log(newRelease)
        console.log("Attempting to save the new Release to db")
        await newRelease.save();
        
        return new Response(JSON.stringify(newRelease), {status: 201})
    } catch(error){
        console.log(error);

        return new Response("Failed to create a new Release", {status: 500});
    }
}