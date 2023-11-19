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
                    
                    <main>
                        <Nav className="app_navbar"/>
                            <div className="app">
                                {children}
                                {modal}
                            </div>
                        <PlaybackFooter className="app_footer"/>  
                    </main>
                    
                </ReleaseViewProvider>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout