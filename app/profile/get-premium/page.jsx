const PremiumPage = () => {
    return (
        <div className="w-full flex flex-col">

            <div className="flex mt-8 mb-12">
            <h1 className="head_text text_full"> 
                <span className="">
                    Get Premium
                </span>
            </h1>
            <p className=" text-sm text_full">
                
            </p>
            </div>

            <div className="flex flex-row justify-center">
                {/* Card 1 */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mr-4">
                    <h2 className="font-semibold text-lg">Free</h2>
                    <p className="text-gray-600">
                    </p>
                </div>
                {/* Card 2 */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-2">
                    <h2 className="font-semibold text-lg">Premium</h2>
                    <p className="text-gray-600">
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PremiumPage