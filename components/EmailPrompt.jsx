'use client'
import { useState } from 'react';

const EmailPrompt = () => {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const validateEmail = (email) => {
        console.log(email)
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,16}$/;
        return regex.test(email);
    }

    const addEmailToWaitlist = async (emailData) => {
        try {
            const response = await fetch('/api/newsletter/join-waitlist', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: emailData })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const res = await response.json();
            console.log(res)
            
    
        } catch (error) {
            console.log('Error in fetching:', error.message);
        }
    }
    
    const handleJoinButtonClick = async () => {
        if (validateEmail(email)) {
            await addEmailToWaitlist(email);
            setEmailValid(true);
            // Additional actions on successful validation
        } else {
            setEmailValid(false);
            alert('Invalid Email!');
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <>
            {/* Desktop Prompt */}
            <div className='hidden md:flex w-full flex-row mb-5 items-center p-4 rounded-full shadow-md bg-gradient-to-r from-purple-300 to-orange-200 justify-between'>
                <span className="font-semibold">
                    Join our newsletter waitlist!
                </span>
                { (emailValid) ? (

                    <div>
                        <span className='text-gray-400 text-md'>
                            You're email has been recorded!
                        </span>
                    </div>

                    ) : (

                        <div>
                            <input
                                placeholder='Email'
                                className='w-72 rounded-xl p-2'
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <button className="ml-3 mr-2 p-2 bg-red-400 hover:bg-red-200 rounded-full text-white" onClick={handleJoinButtonClick}>
                                Join
                            </button>
                        </div>

                    )}
                
            </div>

            {/* Mobile Prompt */}
            <div className='md:hidden w-full flex flex-row mb-5 items-center p-4 rounded-full shadow-md bg-gradient-to-r from-purple-300 to-orange-200 justify-between'>
                <span className="font-semibold">
                    Join our newsletter waitlist!
                </span>

                { (emailValid) ? (

                    <>
                        <span className='text-gray-400 text-sm'>
                            You're email has been recorded!
                        </span>
                    </>

                ) : (

                    <>
                        <input
                            placeholder='Email'
                            className='w-32 rounded-xl p-2'
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <button className="ml-3 mr-2 p-2 bg-red-400 hover:bg-red-200 rounded-full text-white" onClick={handleJoinButtonClick}>
                            Join
                        </button>
                    </>

                )}
                
            </div>
        </>
    )
}

export default EmailPrompt;
