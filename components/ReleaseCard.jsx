
import Image from 'next/image'
const initRelease = {
  id: null,
  title: '',
  artist: '',
  link: '',
  upvotes: [],
  upvotesLength: 0,
  coverImage: '',
  description: '',
  genre: '',
  tags: [],
  releaseDate: Date.now()
}

const ReleaseCard = ({release = initRelease}) => {

  return (
    
    <div className='bg-white rounded-lg overflow-hidden'>
      <div className='p-6'>

        <div className='flex flex-col justify-center items-center'>
          
          {release.coverImage ? (
              <Image 
                  src={release.coverImage}
                  alt="Placeholder"
                  width={200}
                  height={200}
                  className="mt-4 mb-4 ml-4 mr-4 rounded-lg object-cover h-80 w-80"
              /> 
          ) : (
              <Image 
                  src="/assets/images/placeholder-logo.svg" 
                  alt="Placeholder"
                  width={80}
                  height={80}
                  className="mt-4 mb-4 ml-4 mr-4"
              /> 
          )}
        
        <div className='flex flex-col'>
          <h1 className='text-2xl font-bold '>{release.title}</h1>
          <p className='text-lg font-semibold text-gray-700 mb-4'>{release.artist}</p>

          {release.link && (
            <a
              href={release.link}
              target="_blank"
              rel="noopener noreferrer"
              className='text-blue-500 hover:text-blue-700 transition duration-300'
            >
              Listen Now
            </a>
          )}

          <div className='mt-4 pb-10'>
            {release.genre && <p className='text-sm text-gray-600'>Genre: {release.genre}</p>}
            {release.tags.length > 0 && <p className='text-sm text-gray-600'>Tags: {release.tags.join(', ')}</p>}
            {release.description && <p className='mt-2 text-gray-800 my-3'>{release.description}</p>}
            <p className='text-sm text-gray-600'>Release Date: {release.releaseDate}</p>
            <p className='text-sm text-gray-600'>UpvotesLength: {release.upvotesLength}</p>
            <p className='text-sm text-gray-600'>Upvotes: {release.upvotes.length}</p>
          </div>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default ReleaseCard;