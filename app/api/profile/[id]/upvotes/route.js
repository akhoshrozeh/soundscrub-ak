import { connectToDB } from '@utils/database';
import Release from '@models/release';


export const GET = async (req, {params}) => {
    try {
        await connectToDB();


        let query = {
            upvotes: params.id
        }

        const releases = await Release.find(query).populate('creator').sort({ upvotesLength: -1 });
        console.log('Awaiting release retrieval...')

        return new Response(JSON.stringify(releases), {status: 200})
    } catch(error) {

        console.log('error retrieving releases')
        return new Response("failed to fetch all releases", {status:500})
    }
}