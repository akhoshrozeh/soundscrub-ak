import { connectToDB } from '@utils/database';
import Submission from '@models/submission';

export const GET = async () => {
    try {
        await connectToDB();
        
        const releases = await Submission.find({ isAccepted: true }).populate('creator');
        console.log('Awaiting release retrieval...')
        
        return new Response(JSON.stringify(releases), {status: 200})
    } catch(error) {

        console.log('error retrieving releases')
        return new Response("failed to fetch all releases", {status:500})
    }
}