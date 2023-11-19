'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession(false);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProviders();
    }, [])
    return (
    <nav className="w-full flex flex-between mb-16 px-6 pt-3 pb-3 bg-stone-800 sticky top-0">
        <Link href="/" className="flex gap-2 flex-center">
            <Image
                src="/assets/images/placeholder-logo.svg"
                alt="SoundScrub Logo"
                width={30}
                height={30}
                className="object-contain"
            />
            <p className='logo_text'>SoundScrub</p>
        </Link>

        {/* Desktop Navigation*/}

        <div className="sm:flex hidden">
            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-submission" className="black_btn">
                        Submit Music
                    </Link>
                    <button type="button" onClick={signOut} className="outline_btn">
                        Sign Out
                    </button>

                    <Link href="/profile">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                        />
                    </Link>
                </div>
            ) : (
                <>
                    
                    {providers && Object.values(providers).map((provider) => (
                        <button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className='black_btn'
                        >
                            Sign In
                        </button>
                    ))}
                </>
            )}
        </div>

        {/* Mobile Navigation*/}

        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image
                        src={session?.user.image}
                        alt="SoundScrub Logo"
                        width={30}
                        height={30}
                        className="rounded-full"
                        onClick={() => setToggleDropdown((prev) => !prev)}
                    />
                    {toggleDropdown && (<div className="dropdown">
                        <Link
                            href="/profile"
                            className="dropdown_link"
                            onClick={() => setToggleDropdown(false)}
                        >
                            My Profile
                        </Link>
                        <Link
                            href="/create-submission"
                            className="dropdown_link"
                            onClick={() => setToggleDropdown(false)}
                        >
                            Submit Music
                        </Link>
                        <button
                            type="button"
                            onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                            }}
                            className="mt-5 w-full black_btn"
                        >
                            Sign Out
                        </button>
                    </div>)}
                </div> ): ( 
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className='black_btn'
                        >
                            Sign In
                        </button>
                    ))}
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav