import { connectToDB } from '@utils/database';
import Release from '@models/release';

export const PATCH = async (request, { params }) => {
    const { user, voteType } = await request.json();
    console.log(params.id)
    try {
        await connectToDB();

        if (voteType === "upvote"){

            const existingRelease = await Release.findOneAndUpdate(
                { _id: params.id},
                { 
                    $addToSet: { upvotes: user },
                    $inc: { upvotesLength: 1 }
                }
            );
    
            if(!existingRelease) return new Response("Release not found", {status:404});
    
            return new Response(JSON.stringify(existingRelease), {status:200})

        }
        else if (voteType === "downvote"){

            const existingRelease = await Release.findOneAndUpdate(
                {_id: params.id},
                {
                    $pull: { upvotes: user },
                    $inc: { upvotesLength: -1 }
                }
            )

            if(!existingRelease) return new Response("Release not found", {status:404});
    
            return new Response(JSON.stringify(existingRelease), {status:200})

        }


    } catch(error){
        console.log('error updating release')
        return new Response("failed to update release", {status:500})
    }
}