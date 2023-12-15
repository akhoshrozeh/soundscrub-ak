
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
                    <p className="text-gray-600">Card content goes here...</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-2">
                    <h2 className="font-semibold text-lg">Step 2</h2>
                    <p className="text-gray-600">Card content goes here...</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 ml-4">
                    <h2 className="font-semibold text-lg">Step 3</h2>
                    <p className="text-gray-600">Card content goes here...</p>
                </div>
            </div>


    </div>
  )
}

export default HowPage