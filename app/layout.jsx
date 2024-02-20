import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { ReleaseViewProvider } from '@contexts/ReleaseViewContext'
import { PlaybackProvider } from '@contexts/PlaybackContext'
import PlaybackFooter from '@components/PlaybackFooter'
import Head from 'next/head';
import FullControlPlaybackFooter from '@components/FullControlPlaybackFooter'
import { Analytics } from '@vercel/analytics/react';


export const metadata = {
    title: "SoundScrub",
    description: "Tech-enabled music discovery & community platform"
}
const RootLayout = ({children, modal}) => {
  return (
    <html lang="en">
        <body suppressHydrationWarning={true}>
            <Provider>
                <PlaybackProvider>
                    <ReleaseViewProvider>
                        <div className="main">
                            <div className="gradient"/>
                        </div>
                        <main>
                            <Nav className="app_navbar"/>
                                <div className="app">
                                    {children}
                                    {modal}
                                    <Analytics />
                                </div>
                            {/* <PlaybackFooter className="app_footer"/>   */}
                            <FullControlPlaybackFooter/>
                        </main>
                    </ReleaseViewProvider>
                </PlaybackProvider>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout