import { connectToDB } from '@utils/database';
import Release from '@models/release';

export const dynamic = 'force-dynamic';

export const GET = async (request) => {

    const laTimeZone = 'America/Los_Angeles';
    
    // Start of today in LA timezone
    let today = new Date(new Date().toLocaleString("en-US", {timeZone: laTimeZone}));
    today.setHours(0, 0, 0, 0);

    // Start of next day in LA timezone
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const searchCriteria = {
        postDate: { 
            $gte: today,
            $lt: tomorrow
        },
        isAccepted: true
    };

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