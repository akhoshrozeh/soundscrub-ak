'use client'
import React from 'react'
import ReactHowler from 'react-howler'
import "@styles/volume-slider.css"
import "@styles/seeking-slider.css"
import "@styles/loading-spinner.css"
import Image from 'next/image';
import Link from 'next/link';
import raf from 'raf' // requestAnimationFrame polyfill
import { PlaybackContext } from '@contexts/PlaybackContext';
import lodash from 'lodash';



class FullControlPlaybackFooter extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
        currentSong: {
          id: null,
          title: 'No Songs Loaded',
          artist: 'N/A',
          audioUrl: '',
          coverImage: ''
        },
        playlist: [],
        currentSongIdx: 0,
        loaded: false,
        playing: false,
        isSeeking: false, 
        volume: 0.2,
        seek: 0.0,
        duration: 0.0
    }

    this.playerState = {
      currentSong: {
        id: null,
        title: 'No Songs Loaded',
        artist: 'N/A',
        audioUrl: '',
        coverImage: ''
      },
      playlist: [],
      currentSongIdx: 0
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
    this.handleBackArrow = this.handleBackArrow.bind(this)
    this.handleForwardArrow = this.handleForwardArrow.bind(this)
    this.handleLink = this.handleLink(this)
    this.formatSecondsToMinutes = this.formatSecondsToMinutes.bind(this)
  }
  static contextType = PlaybackContext;

  componentDidMount() {
    // Sync with context when the component mounts
    if (!lodash.isEqual(this.playerState, this.context.playbackState)) {
      this.playerState = this.context.playbackState;
      
    }
  }

  componentDidUpdate() {

    console.log("component did update")
    console.log(this.context)

      // Sync local state with context if context data changes
      if (!lodash.isEqual(this.playerState, this.context.playbackState)) {
        this.playerState = this.context.playbackState;

        if (!lodash.isEqual(this.playerState.currentSongIdx, this.context.playbackState.currentSongIdx)){
          this.handleStop()
          this.setState(prevState => ({
            loaded: false,
            playing: true,
            isSeeking: false,
            seek: 0.0,
            duration: 0.0
          }))
        }
      }
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
    this.setState(prevState => ({
      ...prevState,
      loaded: true,
      duration: this.player.duration()
    }))
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

  handleBackArrow () {
    this.handleStop();
    console.log("set prev song")
    if (this.playerState.currentSongIdx > 0){
        let prevSongIdx = this.playerState.currentSongIdx - 1;
        let prevSong = this.playerState.playlist[prevSongIdx];
        this.playerState.currentSong = prevSong;
        this.playerState.currentSongIdx = prevSongIdx;

        this.setState(prevState => ({
          loaded: false,
          playing: true,
          isSeeking: false,
          seek: 0.0,
          duration: 0.0
        }))
    }
  }

  handleForwardArrow () {
    this.handleStop();
    console.log("set next song")
    console.log(this.playerState.currentSongIdx)
    if (this.playerState.currentSongIdx < this.playerState.playlist.length - 1){
        let nextSongIdx = this.playerState.currentSongIdx + 1;
        let nextSong = this.playerState.playlist[nextSongIdx];
        this.playerState.currentSong = nextSong;
        this.playerState.currentSongIdx = nextSongIdx;

        this.setState(prevState => ({
            loaded: false,
            playing: true,
            isSeeking: false,
            seek: 0.0,
            duration: 0.0
        }))
    }
    console.log(this.playerState.currentSongIdx)
  }

  handleLink () {
    // setCurrentRelease(release);
    // console.log(currentRelease)
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
  static contextType = PlaybackContext;

  render () {

    return (
      <div>
        {!this.playerState.currentSong.audioUrl ? (

          <>
          </>


          ) : (

            <ReactHowler
              src={this.playerState.currentSong.audioUrl}
              html5={true}
              playing={this.state.playing}
              onLoad={this.handleOnLoad}
              onPlay={this.handleOnPlay}
              onEnd={this.handleOnEnd}
              loop={this.state.loop}
              mute={this.state.mute}
              volume={this.state.volume}
              ref={(ref) => (this.player = ref)}
            />


          )}

      {/* Desktop */}
      <footer className='hidden sm:block w-full z-20 bg-stone-800 shadow-full px-4 py-4 fixed bottom-0'>



        <div className="grid grid-cols-4 gap-4 items-center justify-between">

          {/* Left Section: Now Playing */}
          <div className="col-span-1 justify-start">

            
            {this.playerState.currentSong.id ? (
                          <Link href={`/releases/${this.playerState.currentSong.id}`} onClick={this.handleLink}>
                          <div className="flex px-1 py-1">
                                  <Image
                                      className="mr-1 rounded-md object-cover h-12 w-12"
                                      src={this.playerState.currentSong.coverImage}
                                      alt="placeholder"
                                      width={35}
                                      height={35}
                                  />
          
                              <div className='flex flex-col px-2'>
                                  <span className='text-white text-md'>
                                      {this.playerState.currentSong.title}
                                  </span>
                                  <h2 className='text-stone-400 text-sm'> {this.playerState.currentSong.artist}</h2>
                              </div>
          
                              <div className='mt-1'>
                                  {!this.state.loaded && <div className="loader"></div>}
                              </div>
                          </div>
          
                      </Link>
            ) : (

              <div className="flex px-1 py-1">
                        <Image
                          className="mr-1 rounded-md object-cover h-12 w-12"
                          src="/assets/images/placeholder-logo.svg"
                          alt="placeholder"
                          width={35}
                          height={35}
                        />

                  <div className='flex flex-col px-2'>
                      <span className='text-white text-md'>
                          Loading Songs...
                      </span>
                      <h2 className='text-stone-400 text-sm'> {this.playerState.currentSong.artist}</h2>
                  </div>

                  <div className='mt-1'>
                      {!this.state.loaded && <div className="loader"></div>}
                  </div>
              </div>

            )}


            
          </div>

          {/* Center Section: Control Buttons */}
          <div className="col-span-2 flex flex-col justify-center">
              <div className="flex justify-center space-x-7 mb-2">
                  <button onClick={this.handleBackArrow}>
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

                  <button onClick={this.handleForwardArrow}>
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
                      onChange={()=>{}}
                      onMouseDown={()=>{alert('Seeking is not currently supported!')}}
                      onMouseUp={()=>{}}
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

      {/* Mobile */}
      <footer className='sm:hidden block w-full z-20 bg-stone-800 shadow-full px-4 py-4 fixed bottom-0'>

      <div className="grid grid-cols-4 gap-4 items-center justify-between">

        {/* Left Section: Now Playing */}
        <div className="col-span-1 justify-start">

          
          {this.playerState.currentSong.id ? (
                        <Link href={`/releases/${this.playerState.currentSong.id}`} onClick={this.handleLink}>
                        <div className="flex px-1 py-1">
                                <Image
                                    className="mr-1 rounded-md object-cover h-12 w-12"
                                    src={this.playerState.currentSong.coverImage}
                                    alt="placeholder"
                                    width={35}
                                    height={35}
                                />
        
                            <div className='flex flex-col px-2'>
                                <span className='text-white text-md'>
                                    {this.playerState.currentSong.title}
                                </span>
                                <h2 className='text-stone-400 text-sm'> {this.playerState.currentSong.artist}</h2>
                            </div>
        
                            <div className='mt-1'>
                                {!this.state.loaded && <div className="loader"></div>}
                            </div>
                        </div>
        
                    </Link>
          ) : (

            <div className="flex px-1 py-1">
                      <Image
                        className="mr-1 rounded-md object-cover h-12 w-12"
                        src="/assets/images/placeholder-logo.svg"
                        alt="placeholder"
                        width={35}
                        height={35}
                      />

                <div className='flex flex-col px-2'>
                    <span className='text-white text-xs'>
                        Loading Songs...
                    </span>
                    <h2 className='text-stone-400 text_xxs'> {this.playerState.currentSong.artist}</h2>
                </div>

                <div className='mt-1'>
                    {!this.state.loaded && <div className="loader"></div>}
                </div>
            </div>

          )}


          
        </div>

        {/* Center Section: Control Buttons */}
        <div className="col-span-2 flex flex-col justify-center">
            <div className="flex justify-center space-x-3 mb-2">
                <button onClick={this.handleBackArrow}>
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
                            width={25}
                            height={25}                                                         
                        />
                    </button>
                ) : (
                    <button onClick={this.handleToggle}>
                        <Image 
                            src="/assets/images/pause-button.svg"
                            alt="Pause button"
                            width={25}
                            height={25}                                                         
                        />
                    </button>
                )}

                <button onClick={this.handleForwardArrow}>
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
                    onChange={()=>{}}
                    onMouseDown={()=>{alert('Seeking is not currently supported!')}}
                    onMouseUp={()=>{}}
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
              className='purple-slider-sm'
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
      </div>

    )
  }
}
export default FullControlPlaybackFooter