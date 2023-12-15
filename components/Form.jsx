import Link from 'next/link';
import FormInput from './FormInput';
import { INPUT_TYPES } from "@constants/enums";

// const TagPool = ({tags}) => {
//     return (
//         <div className="flex flex-row space-x-2">
//             {tags.map((tag) => (
//                 <button className='form_btn' disabled>
//                     {tag}
//                 </button>
//             ))} 
//         </div>
//     )
// }


const Form = ( { type, releaseSubmission, setReleaseSubmission, submitting, handleSubmit, handleImgFileChange, uploadState, handleAudioFileChange }) => {

    return (
        <section className="w-full max-w-full flex-start flex-col pb-20">
            <form 
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl flex flex-col gap-7"
            >

            <h1 className="head_text text-left">
                <span>Submit Your Music</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} a submission for your newest release. If we like your submission, it'll be posted on our main feed for the world to see!
            </p>
            <p className='text-sm text-center'>
                <a href="/how-it-works" className="font-semibold text-red-400">How does it work? Click here!</a>
            </p>


            {/* Text-based form inputs  */}
            <FormInput
                label="Release Title"
                value={releaseSubmission.title}
                onChange={(e) => setReleaseSubmission({ ...releaseSubmission, title: e.target.value })}
                placeholder="What's the name of your album?"
            />
            <FormInput
                label="Artist Name"
                value={releaseSubmission.artist}
                onChange={(e) => setReleaseSubmission({ ...releaseSubmission, artist: e.target.value })}
                placeholder="What's your artist name?"
            />
            <FormInput
                label="Description"
                value={releaseSubmission.description}
                onChange={(e) => setReleaseSubmission({ ...releaseSubmission, description: e.target.value })}
                placeholder="Enter a description for your release!"
                inputType={INPUT_TYPES.FORM_TEXTAREA}
            />
            <FormInput
                label="Music URL"
                value={releaseSubmission.link}
                onChange={(e) => setReleaseSubmission({ ...releaseSubmission, link: e.target.value })}
                placeholder="What's the weblink to your music?"
            />

            {/* <div className='flex flex-col space-y-4'>
                <div className="flex flex-col">
                    <label className='flex flex-col'>
                        <span className="font-satoshi font-semibold text-base text-gray-700">
                            Genre Tags
                        </span>
                    </label>
                    <div className="flex flex-row space-x-1 mt-1">
                        <input
                            placeholder="#dubstep, #hiphop, #thrashmetal, etc."
                            className="w-6/12 flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0;"
                        />
                        
                        <button 
                            className="form_btn bg-red-500 text-white"
                            onChange={(e) => setReleaseSubmission({ ...releaseSubmission, tags: e.target.value })}
                        >
                            + Add Tags
                        </button>
                    </div>
                </div>
                <TagPool
                    tags={releaseSubmission.tags}
                />
            </div> */}

            {/* Release Type Tags */}
            {/* <div className="flex flex-col">
                <label className='flex flex-col'>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Release Type
                    </span>
                </label>
                <div className="flex flex-row space-x-2 mt-1">
                    <button 
                        className={`form_btn ${releaseSubmission.releaseType === "song" ? "bg-blue-500 text-white" : "bg-stone-900 text-white hover:bg-stone-300"}`}
                        onChange={(e) => setReleaseSubmission({ ...releaseSubmission, releaseType: "song" })}
                    >
                        Song
                    </button>
                    <button 
                        className={`form_btn ${releaseSubmission.releaseType === "album" ? "bg-blue-500 text-white" : "bg-stone-900 text-white hover:bg-stone-300"}`}
                        onChange={(e) => setReleaseSubmission({ ...releaseSubmission, releaseType: "album" })}
                    >
                        Album
                    </button>
                    <button 
                        className={`form_btn ${releaseSubmission.releaseType === "ep" ? "bg-blue-500 text-white" : "bg-stone-900 text-white hover:bg-stone-300"}`}
                        onChange={(e) => setReleaseSubmission({ ...releaseSubmission, releaseType: "ep" })}
                    >
                        EP
                    </button>
                </div>
            </div> */}

            {/* Storage upload inputs */}
            <div className="flex flex-col space-y-2 ">
                <span className="font-satoshi font-semibold text-base text-gray-700">
                    Upload Cover Artwork
                </span>
                <input className="border-2 border-stone-300 p-2 rounded-lg" type="file" accept="image/" onChange={handleImgFileChange}/>
            </div>
            
            <div className="flex flex-col space-y-2 ">
                <span className="font-satoshi font-semibold text-base text-gray-700">
                    Upload Audio File
                </span>
                <input className="border-2 border-stone-300 p-2 rounded-lg" type="file" accept="audio/" onChange={handleAudioFileChange}/>
            </div>

            {/* Form submit/cancel mechanism */}
            <div className="flex-end mx-3 mb-5 gap-4">
                <Link href="/" className='text-gray-500'>
                    Cancel
                </Link>

                <button
                    type="submit"
                    disabled={!uploadState.audio && !uploadState.image || submitting}
                    className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white hover:bg-orange-300"
                > {submitting ? `${type}... `: type}</button>

            </div>
            </form>
        </section>
  )
}

export default Form