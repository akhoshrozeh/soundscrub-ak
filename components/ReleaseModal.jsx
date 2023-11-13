
const initRelease = {
  id: null,
  title: 'placeholder',
  artist: 'placeholder',
  link: '',
  upvotes: [],
  upvotesLength: 0,
  coverImage: '',
  description: '',
  genre: '',
  tags: [],
  releaseData: Date.now()
}

const ReleaseModal = ({release = initRelease}) => {

  console.log(release.title)

  return (
    
        <div className='bg-white rounded-md'>
          <h3>{release._id}</h3>
          <h1>{release.title}</h1>
          <p>{release.artist}</p>
        </div>
  );
}

export default ReleaseModal;