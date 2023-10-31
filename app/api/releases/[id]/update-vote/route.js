import { connectToDB } from '@utils/database';
import Submission from '@models/submission';

export const PATCH = async (request, { params }) => {
    const { new_upvote } = await request.json();

    console.log("reached patch")
    try {
        await connectToDB();

        const existingRelease = await Submission.findOneAndUpdate(
            { _id: params.id},
            {$addToSet: { upvotes: new_upvote }}
        );

        if(!existingRelease) return new Response("Release not found", {status:404});

        return new Response(JSON.stringify(existingRelease), {status:200})

    } catch(error){
        console.log('error updating release')
        return new Response("failed to update release", {status:500})
    }
}