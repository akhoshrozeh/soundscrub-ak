import { connectToDB } from '@utils/database';
import Release from '@models/release';

export const PATCH = async (request, { params }) => {
    const { user, voteType } = await request.json();
    console.log(params.id)
    try {
        await connectToDB();

        const existingRelease = await Release.findById(params.id);
        if (!existingRelease) return new Response("Release not found", { status: 404 });

        if (voteType === "upvote" && !existingRelease.upvotes.includes(user)){
            existingRelease.upvotes.push(user);
            existingRelease.upvotesLength++;
            await existingRelease.save();
        }
        else if (voteType === "downvote" && existingRelease.upvotes.includes(user)){
            existingRelease.upvotes.pull(user);
            existingRelease.upvotesLength--;
            await existingRelease.save();
        }

        return new Response(JSON.stringify(existingRelease), { status: 200 });
    
    } catch(error){
        console.log('error updating release')
        return new Response("failed to update release", {status:500})
    }
}