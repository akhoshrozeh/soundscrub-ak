import { connectToDB } from '@utils/database';
import Release from '@models/release';

export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        
        // Eventually filter based on date
        const releases = await Release.findOne({ _id: params.id });
        console.log('Awaiting release retrieval...')
        // console.log(releases)
        return new Response(JSON.stringify(releases), {status: 200})
    } catch(error) {

        console.log('error retrieving releases')
        return new Response("failed to fetch all releases", {status:500})
    }
}