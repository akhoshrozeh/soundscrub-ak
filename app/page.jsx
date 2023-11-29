import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col mt-6 mb-6">
      <div className='mb-6'>
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
      </div>
      {/* Feed */}

      <br/>
      <Feed/>
    </section>
  )
}

export default Home