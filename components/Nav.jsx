'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession(false);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProviders();
    }, [])
    return (

    <nav className="w-full z-20 flex flex-between mb-16 px-6 pt-3 pb-3 bg-stone-800 fixed top-0">
        <div className="hidden md:flex flex-row gap-2 items-center">
            <Link href="/">
                <div className="flex w-[200px] h-[50px] overflow-hidden items-center">
                <Image
                    src="/assets/images/soundscrub-logo.svg"
                    alt="SoundScrub Logo"
                    width={200}
                    height={200}
                    className="object-contain"
                />
                </div>
            </Link>

            {/* Navbar Links */}
            <div className="md:flex hidden">
                <Link href="/how-it-works" className="ml-6 mt-3 text-white text-md font-semibold">
                    How It Works
                </Link>
                {/* <Link href="/blog" className="ml-6 mt-4 text-white text-md font-semibold">
                    Blog
                </Link> */}
                <Link href="/about" className="ml-6 mt-3 text-white text-md font-semibold">
                    About
                </Link>
            </div>
        </div>

        <div className='md:hidden flex flex-row gap-2 items-center'>
            
            <div className="flex overflow-hidden items-center">
            <Image
                src="/assets/icons/menu-button.svg"
                alt="SoundScrub Logo"
                width={30}
                height={30}
                className="object-contain"
                onClick={() => setToggleMenu((prev) => !prev)}
            />
            {toggleMenu && (
                <div className='menu'>
                    <Link
                        href="/"
                        className="menu_link font-bold text-xl"
                        onClick={() => setToggleMenu(false)}
                    >
                        Feed
                    </Link>
                    <Link
                        href="/how-it-works"
                        className="menu_link font-bold text-xl"
                        onClick={() => setToggleMenu(false)}
                    >
                        How It Works
                    </Link>
                    <Link
                        href="/about"
                        className="menu_link font-bold text-xl"
                        onClick={() => setToggleMenu(false)}
                    >
                        About
                    </Link>

                </div>
            )}
            </div>
        
        </div>

        <div className='md:hidden flex items-center'>
            <Link href="/" >
                <Image
                    src="/assets/images/soundscrub-scrub-circle-logo.svg"
                    alt="SoundScrub Logo"
                    width={50}
                    height={50}
                    className="object-contain"
                />
            </Link>
        </div>

        {/* Desktop Navigation*/}
        <div className="md:flex hidden">
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
        <div className="md:hidden flex relative">
            {session?.user ? (
                <div className="flex ml-3">
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
                            className='signin_sm_btn'
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