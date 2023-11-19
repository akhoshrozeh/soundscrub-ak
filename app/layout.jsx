import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { ReleaseViewProvider } from '@contexts/ReleaseViewContext'
import PlaybackFooter from '@components/PlaybackFooter'

export const metadata = {
    title: "SoundScrub",
    description: "Tech-enabled music discovery & community platform"
}
const RootLayout = ({children, modal}) => {
  return (
    <html lang="en">
        <body suppressHydrationWarning={true}>
            <Provider>
                <ReleaseViewProvider>
                    <div className="main">
                        <div className="gradient"/>
                    </div>
                    
                        <Nav/>
                        <main className="app">
                        {children}
                        {modal}
                        </main>
                        <PlaybackFooter/>  
                    
                </ReleaseViewProvider>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout