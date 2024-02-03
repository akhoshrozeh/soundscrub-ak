import { connectToDB } from '@utils/database';
import Release from '@models/release';

export const dynamic = 'force-dynamic';

export const GET = async (request) => {

    const today = new Date();
    today.setHours(0,0,0,0); // Resets hours, minutes, seconds, and milliseconds to 0

    console.log(today)

    const searchCriteria = {
        postDate: { 
            $gte: today
        },
        isAccepted: true
    }
    try {
        await connectToDB();
        
        // Eventually filter based on date
        const releases = await Release.find(searchCriteria).populate('creator').sort({ upvotesLength: -1 });
        console.log('Awaiting release retrieval...')
        // console.log(releases)
        return new Response(JSON.stringify(releases), {status: 200})
    } catch(error) {

        console.log('error retrieving releases')
        return new Response("failed to fetch all releases", {status:500})
    }
}