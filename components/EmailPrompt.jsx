
const EmailPrompt = () => {
    return (
        <>
            {/* Desktop Prompt */}
            <div className='hidden md:flex w-full flex-row mb-5 items-center p-4 rounded-full shadow-md bg-gradient-to-r from-purple-300 to-orange-200 justify-between'>
                <span className="font-semibold">
                    Join our newsletter waitlist!
                </span>
                <div className="">
                <input
                    placeholder=' Email'
                    className='w-72 rounded-xl p-2'
                />
                <button className="ml-3 mr-2 p-2 bg-red-400 hover:bg-red-200 rounded-full text-white">
                    Join
                </button>
                </div>
            </div>

            {/* Mobile Prompt */}
            <div className='md:hidden w-full flex flex-row mb-5 items-center p-4 rounded-full shadow-md bg-gradient-to-r from-purple-300 to-orange-200 justify-between'>
                <span className="font-semibold">
                    Join our newsletter waitlist!
                </span>
                <div className="">
                    <input
                        placeholder=' Email'
                        className='w-32 rounded-xl p-2'
                    />
                    <button className="ml-3 mr-2 p-2 bg-red-400 hover:bg-red-200 rounded-full text-white">
                        Join
                    </button>
                </div>
            </div>
        </>
    )
}

export default EmailPrompt