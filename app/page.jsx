import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
          Discover & Drop 
          <br className="max-xs:hidden"/>
          <span className="blue_gradient">
            The Best New Music
          </span>
      </h1>
      <p className="desc text-center">
        SoundScrub is a music discovery platform and community for independent
        and lesser-known artists & producers.
      </p>
      {/* Feed */}

      <br/>
      <Feed/>
    </section>
  )
}

export default Home