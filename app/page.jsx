import EmailPrompt from '@components/EmailPrompt'
import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex flex-center flex-col mt-6 mb-6">

      {/* Welcoming Headline */}
      <div className='mb-6'>
        <h1 className="head_text text-center text-4xl md:text-5xl font-bold my-4">
          Welcome to Soundscrub!
        <br className="max-xs:hidden"/>
        <span className="text-purple-500">
          Sign In & Submit Your Best New Tracks Now
        </span>
        </h1>
        <p className="desc text-center text-lg">
          This is your moment! SoundScrub is a music community platform that aims to subvert the algorithm.
          Submit your music to be part of our first weekly release set!
        </p>
      </div>
      
      {/* General Headline */}
      {/* <div className='mb-6'>
        <h1 className="head_text text-center">
            Discover & Drop 
            <br className="max-xs:hidden"/>
            <span className="text-purple-500 ">
              The Best New Music
            </span>
        </h1>
        <p className="desc text-center">
          SoundScrub is a music discovery platform and community for independent
          and lesser-known artists & producers.
        </p>
      </div> */}

      {/* Email Signup */}
      <EmailPrompt/>

      {/* Feed */}
      {/* <Feed/> */}
    </section>
  )
}

export default Home