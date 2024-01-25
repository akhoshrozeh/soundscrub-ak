import React from 'react'
import ReactHowler from 'react-howler'
import "@styles/volume-slider.css"
import "@styles/seeking-slider.css"
import Image from 'next/image';
import raf from 'raf' // requestAnimationFrame polyfill

class FullControl extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      playing: false,
      loaded: false,
      loop: false,
      mute: false,
      volume: 1.0,
      seek: 0.0,
      rate: 1,
      isSeeking: false
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleOnLoad = this.handleOnLoad.bind(this)
    this.handleOnEnd = this.handleOnEnd.bind(this)
    this.handleOnPlay = this.handleOnPlay.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.renderSeekPos = this.renderSeekPos.bind(this)
    this.handleLoopToggle = this.handleLoopToggle.bind(this)
    this.handleMuteToggle = this.handleMuteToggle.bind(this)
    this.handleMouseDownSeek = this.handleMouseDownSeek.bind(this)
    this.handleMouseUpSeek = this.handleMouseUpSeek.bind(this)
    this.handleSeekingChange = this.handleSeekingChange.bind(this)
    this.formatSecondsToMinutes = this.formatSecondsToMinutes.bind(this)
  }

  componentWillUnmount () {
    this.clearRAF()
  }

  handleToggle () {
    this.setState({
      playing: !this.state.playing
    })
  }

  handleOnLoad () {
    this.setState({
      loaded: true,
      duration: this.player.duration()
    })
  }

  handleOnPlay () {
    this.setState({
      playing: true
    })
    this.renderSeekPos()
  }

  handleOnEnd () {
    this.setState({
      playing: false
    })
    this.clearRAF()
  }

  handleStop () {
    this.player.stop()
    this.setState({
      playing: false // Need to update our local state so we don't immediately invoke autoplay
    })
    this.renderSeekPos()
  }

  handleLoopToggle () {
    this.setState({
      loop: !this.state.loop
    })
  }

  handleMuteToggle () {
    this.setState({
      mute: !this.state.mute
    })
  }

  handleMouseDownSeek () {
    this.setState({
      isSeeking: true
    })
  }

  handleMouseUpSeek (e) {
    this.setState({
      isSeeking: false
    })

    this.player.seek(e.target.value)
  }

  handleSeekingChange (e) {
    this.setState({
      seek: parseFloat(e.target.value)
    })
  }

  renderSeekPos () {
    if (!this.state.isSeeking) {
      this.setState({
        seek: this.player.seek()
      })
    }
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos)
    }
  }

  clearRAF () {
    raf.cancel(this._raf)
  }

  formatSecondsToMinutes(seconds) {
    // Ensure the value is non-negative
    seconds = Math.max(0, seconds);

    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format the time. Pad the seconds with a leading zero if necessary
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

  render () {
    return (
      <footer className='w-full z-20 bg-stone-800 shadow-full px-4 py-4 fixed bottom-0'>
        <ReactHowler
          src="https://soundscrub-web-storage.s3.us-east-2.amazonaws.com/1705689242364-SCNTST+-+_The+Ends+from+Castle+Road_.mp3"
          playing={this.state.playing}
          onLoad={this.handleOnLoad}
          onPlay={this.handleOnPlay}
          onEnd={this.handleOnEnd}
          loop={this.state.loop}
          mute={this.state.mute}
          volume={this.state.volume}
          ref={(ref) => (this.player = ref)}
        />

        <div className="grid grid-cols-4 gap-4 items-center justify-between">

          {/* Left Section: Now Playing */}
          <div className="col-span-1 justify-start">

          </div>

          {/* Center Section: Control Buttons */}
          <div className="col-span-2 flex flex-col justify-center">

              <div className="flex justify-center space-x-7 mb-2">
                  <button onClick={()=>{}}>
                      <Image 
                          src="/assets/images/skip-backward-white.svg"
                          alt="Skip backward"
                          width={20}
                          height={20}                                                         
                      />
                  </button>
                  {!this.state.playing ? (
                      <button onClick={this.handleToggle}>
                          <Image 
                              src="/assets/images/play-button.svg"
                              alt="Play button"
                              width={30}
                              height={30}                                                         
                          />
                      </button>
                  ) : (
                      <button onClick={this.handleToggle}>
                          <Image 
                              src="/assets/images/pause-button.svg"
                              alt="Pause button"
                              width={30}
                              height={30}                                                         
                          />
                      </button>
                  )}

                  <button onClick={()=>{}}>
                      <Image 
                          src="/assets/images/skip-forward-white.svg"
                          alt="Skip forward"
                          width={20}
                          height={20}                                                         
                      />
                  </button>
              </div>

              <div className='flex flex-row text-white text-xs justify-center items-center text-center '>
                  <div className='pr-2'>
                      <span>
                          {this.formatSecondsToMinutes(this.state.seek.toFixed(2))}
                      </span>
                  </div>
                  <input
                      className='w-8/12 purple-seeking-slider'
                      type='range'
                      min='0'
                      max={this.state.duration ? this.state.duration.toFixed(2) : 0}
                      step='.01'
                      value={this.state.seek}
                      onChange={this.handleSeekingChange}
                      onMouseDown={this.handleMouseDownSeek}
                      onMouseUp={this.handleMouseUpSeek}
                  />
                  <div className='pl-2'>
                      <span>
                          {(this.state.duration) ? this.formatSecondsToMinutes(this.state.duration.toFixed(2)) : '0:00'}
                      </span>
                  </div>
              </div>
          </div>

          {/* Right Section: Volume Slider */}
          <div className="col-span-1 justify-self-end ml-4">
              <input
                className='purple-slider'
                type='range'
                min='0'
                max='1'
                step='.05'
                value={this.state.volume}
                onChange={e => this.setState({ volume: parseFloat(e.target.value) })}
              />
          </div>

        </div>
      </footer>
    )
  }
}

export default FullControl