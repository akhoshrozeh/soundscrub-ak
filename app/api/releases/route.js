import { connectToDB } from '@utils/database';
import Release from '@models/release';

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
    const laTimeZone = 'America/Los_Angeles';
    
    // Get today's date in LA timezone
    let today = new Date(new Date().toLocaleString("en-US", {timeZone: laTimeZone}));
    today.setHours(0, 0, 0, 0);

    // Calculate last Monday
    let lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1));

    // Calculate next Sunday
    let nextSunday = new Date(lastMonday);
    nextSunday.setDate(lastMonday.getDate() + 6); // From last Monday to next Sunday is always +6 days

    // Adjust searchCriteria to include releases from last Monday to next Sunday
    const searchCriteria = {
        postDate: { 
            $gte: lastMonday,
            $lt: nextSunday
        },
        isAccepted: true
    };

    try {
        await connectToDB();
        
        // Filter based on updated date range
        const releases = await Release.find(searchCriteria).populate('creator').sort({ upvotesLength: -1 });
        console.log('Awaiting release retrieval...')
        // console.log(releases)
        return new Response(JSON.stringify(releases), {status: 200})
    } catch(error) {

        console.log('error retrieving releases')
        return new Response("failed to fetch all releases", {status:500})
    }
}
