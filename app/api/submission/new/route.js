import { connectToDB } from '@utils/database';
import Submission from '@models/submission';

export const POST = async (req) => {

    const { userId, title, artist, link} = await req.json();

    console.log("preparing to send new submission route");

    try {
        await connectToDB();
        const newSubmission = new Submission({ creator: userId, title, artist, link});

        console.log("Attempting to save the new submission to db")
        await newSubmission.save();
        
        return new Response(JSON.stringify(newSubmission), {status: 201})
    } catch(error){
        console.log(error);

        return new Response("Failed to create a new submission", {status: 500});
    }
}