
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
      {release.coverImage ? (
          <Image
            src={release.coverImage}
            alt={release.title}
            className='w-full h-64 object-cover'
            width={70}
            height={70}
          /> 
          ) : ( 
          <Image
            src="/assets/images/placeholder-logo.svg"
            alt={release.title}
            className='w-full h-64 object-cover'
            width={70}
            height={70}
          />
        )
      }
      
      <div className='p-4'>
        <h1 className='text-2xl font-bold mb-2'>{release.title}</h1>
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

        <div className='mt-4'>
          {release.genre && <p className='text-sm text-gray-600'>Genre: {release.genre}</p>}
          {release.tags.length > 0 && <p className='text-sm text-gray-600'>Tags: {release.tags.join(', ')}</p>}
          {release.description && <p className='mt-2 text-gray-800'>{release.description}</p>}
          <p className='text-sm text-gray-600'>Release Date: {release.releaseDate}</p>
          <p className='text-sm text-gray-600'>Upvotes: {release.upvotesLength}</p>
        </div>
      </div>
    </div>
  );
}

export default ReleaseCard;