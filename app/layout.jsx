import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: "SoundScrub",
    description: "Tech-enabled music discovery & community platform"
}
const RootLayout = ({children, modal}) => {
  return (
    <html lang="en">
        <body suppressHydrationWarning={true}>
            <Provider>
                <div className="main">
                    <div className="gradient"/>
                </div>

                <main className="app">
                    <Nav/>
                    {children}
                    {modal}  
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout