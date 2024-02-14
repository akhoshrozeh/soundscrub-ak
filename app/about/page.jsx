const About = () => {
    return (
        <div className="w-full flex flex-col pb-32">
            <div className="flex mb-12">
              <h1 className="head_text text_full"> 
                  <span className="">
                      About
                  </span>
              </h1>
            </div>

            <div className="mb-12 glassmorphism">
                <p className="desc">
                    Welcome to <strong className="purple_gradient">SoundScrub</strong>, a New Era in Music Discovery and Promotion!
                </p>
                <p className="desc">
                    At SoundScrub, we're not just another digital platform; we're a vibrant community deeply passionate about music. Our mission? To transcend the limitations of algorithms in music discovery and promotion, offering a more authentic, human-centric approach.
                </p>
            </div>

            <div className="glassmorphism [">
                

                <h2 className="mt-4 head_text">Why SoundScrub?</h2>
                <p className="desc">
                    In today's digital age, music promotion is often at the mercy of complex algorithms. These algorithms, while powerful, can inadvertently stifle creativity and diversity, promoting a narrow spectrum of sounds and artists. This not only limits the exposure of incredibly talented musicians but also restricts listeners from discovering the full richness of musical diversity.
                </p>

                <h2 className="mt-4 head_text">Our Mission</h2>
                <p className="desc">
                    SoundScrub was born out of a desire to supercede these algorithms. We believe that music discovery should be an adventure, not a predictable journey dictated by lines of code. Our platform is designed to bring the human element back to the forefront of music promotion.
                </p>

                <h2 className="mt-4 head_text">How We're Different</h2>
                <p className="desc">
                    - <strong className="blue_gradient">Community-Driven Discovery:</strong> At SoundScrub, we harness the collective power of our community to unearth...
                </p>
                {/* You can continue with the rest of the content here */}

                <h2 className="mt-4 head_text">Contact Us</h2>
                <p className="desc">
                    - <strong className="blue_gradient">Questions & Feedback:</strong> 
                    Feel free to email us at soundscrubme@gmail.com for any questions or feedback!
                </p>


            </div>
        </div>
    )
}

export default About