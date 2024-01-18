import { connectToDB } from '@utils/database';
import Email from '@models/email';

export const POST = async (req) => {

    const { email } = await req.json();
    console.log(email);
    const currentDate = new Date();

    console.log("preparing to send new Release route");

    try {
        await connectToDB();

        const newEmail = new Email({ email, currentDate });
        console.log(newEmail)
        console.log("Attempting to save the email to waitlist")
        await newEmail.save();
        
        return new Response(JSON.stringify(newEmail), {status: 201})
    } catch(error){
        console.log(error);

        return new Response("Failed to create a new Release", {status: 500});
    }
}