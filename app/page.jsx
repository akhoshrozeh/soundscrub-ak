import EmailPrompt from '@components/EmailPrompt'
import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex flex-center flex-col mt-6 mb-6">


      
      {/* Headline */}
      <div className='mb-6'>
        <div className='mb-6'>
          <h1 className="head_text text-center">
              Drop Your Bangers 🔥
              <br className="max-xs:hidden"/>
              <span className="text-4xl text-purple-500 ">
                Let's Ditch the Algorithm Together
              </span>
          </h1>
          <p className="desc text-center">
            SoundScrub is a human-sourced music discovery platform. <br/> Built by and for up-and-coming artists & producers.
          </p>
        </div>

        {/* Email Signup */}
      <EmailPrompt/>
        
      </div>

         
      
      {/* Message */}
      {/* <div className='mb-36'>
      <div className="flex-grow border-t border-stone-300"/>
        <h1 className="head_text text-center">
            Voting Period Starts <span className='text-red-400'>Feb. 19th </span>
            <br/>
            <span className='text-purple-500'>Submit Your Music Now!</span>
        </h1>
      </div> */}

      {/* Feed */}
      <Feed/>

    </section>
  )
}

export default Home