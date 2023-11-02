import { connectToDB } from '@utils/database';
import Release from '@models/release';

export const POST = async (req) => {

    const { userId, title, artist, link} = await req.json();

    console.log("preparing to send new Release route");

    try {
        await connectToDB();
        const newRelease = new Release({ creator: userId, title, artist, link});

        console.log("Attempting to save the new Release to db")
        await newRelease.save();
        
        return new Response(JSON.stringify(newRelease), {status: 201})
    } catch(error){
        console.log(error);

        return new Response("Failed to create a new Release", {status: 500});
    }
}