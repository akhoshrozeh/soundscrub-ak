
const HowPage = () => {
  return (
    <div className="w-full flex flex-col">

            <div className="flex mt-8 mb-12">
              <h1 className="head_text text_full"> 
                  <span className="">
                      How It Works
                  </span>
              </h1>
              <p className=" text-sm text_full">
                  
              </p>
            </div>

            <div className="flex flex-row justify-between">
                {/* Card 1 */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mr-4">
                    <h2 className="font-semibold text-lg">Step 1</h2>
                    <p className="text-gray-600">
                      Submit a ready-for-release song. The song can be
                      part of an album, ep, or single. Fill in the details
                      including the cover art, audio, description, links, etc.

                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-2">
                    <h2 className="font-semibold text-lg">Step 2</h2>
                    <p className="text-gray-600">
                      Once you create your submission, you'll be able to view
                      the pending submission in the profile page. Now, all you
                      have to do is wait for your submission to be reviewed. 
                      If it's accepted, it will be added to our main feed and 
                      can then be voted on.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 ml-4">
                    <h2 className="font-semibold text-lg">Step 3</h2>
                    <p className="text-gray-600">
                      Once your submission is accepted, you can invite your followers
                      and fans to vote on your submission. If you're submission attains
                      the top spot by the end of the voting period, we will do a full
                      feature exposé on your music. This includes social media and 
                      website coverage.
                      
                    </p>
                </div>
            </div>


    </div>
  )
}

export default HowPage