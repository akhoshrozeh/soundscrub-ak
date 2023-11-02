import { connectToDB } from '@utils/database';
import Submission from '@models/submission';

export const GET = async () => {
    try {
        await connectToDB();
        
        // Eventually filter based on date
        const releases = await Submission.find({ isAccepted: true }).populate('creator').sort({ upvotes: -1 });
        console.log('Awaiting release retrieval...')
        // console.log(releases)
        return new Response(JSON.stringify(releases), {status: 200})
    } catch(error) {

        console.log('error retrieving releases')
        return new Response("failed to fetch all releases", {status:500})
    }
}