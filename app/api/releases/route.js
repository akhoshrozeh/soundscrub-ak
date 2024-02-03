import { connectToDB } from '@utils/database';
import Release from '@models/release';

export const dynamic = 'force-dynamic';

export const GET = async (request) => {

    // const today = new Date();
    // today.setHours(0,0,0,0); // Resets hours, minutes, seconds, and milliseconds to 0

    // console.log(today)

    // // const searchCriteria1 = {
    // //     postDate: { 
    // //         $gte: today
    // //     },
    // //     isAccepted: true
    // // }

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // Go back 14 days
    twoWeeksAgo.setHours(0,0,0,0); // Resets hours, minutes, seconds, and milliseconds to 0

    console.log(twoWeeksAgo)

    const searchCriteria = {
        postDate: { 
            $gte: twoWeeksAgo
        },
        isAccepted: true
    };

    // const searchCriteria = { isAccepted: true };
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