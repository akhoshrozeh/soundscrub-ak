import Link from 'next/link';
import FormInput from './FormInput';
import { INPUT_TYPES } from "@constants/enums";
const Form = ( { type, releaseSubmission, setReleaseSubmission, submitting, handleSubmit, handleImgFileChange,image }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
        <form 
            onSubmit={handleSubmit}
            className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >

        <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Your Submission</span>
        </h1>
        <p className="desc text-left max-w-md">
            {type} a submission for your newest release. If we like your submission, it'll be posted on our main feed for the world to see!
        </p>
        <p className='text-sm text-center'>
            <a href="/about" className="font-semibold text-red-400">How does it work? Click here!</a>
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

        <div>
            <label className='flex flex-col'>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                    Release Type
                </span>
            </label>
            <div className="flex flex-row space-x-3 ">
                <button className="bg-red-400 border-2 border-black rounded-full text-sm px-1 py-1 transition-all hover:bg-red-100" onClick={(e) => setReleaseSubmission({ ...releaseSubmission, tag: "song" })}>Song</button>
                <button className="bg-cyan-400 border-2 border-black rounded-full text-sm px-1 py-1 transition-all hover:bg-cyan-100" onClick={(e) => setReleaseSubmission({ ...releaseSubmission, tag: "album" })}>Album</button>
                <button className="bg-orange-400 border-2 border-black rounded-full text-sm px-3 py-1 transition-all hover:bg-orange-100" onClick={(e) => setReleaseSubmission({ ...releaseSubmission, tag: "ep" })}>EP</button>
            </div>
        </div>

            

        

        {/* Storage upload inputs */}
        <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
                Upload Cover Artwork
            </span>
            <input type="file" accept="image/" onChange={handleImgFileChange}/>
        </label>

        {/* Form submit/cancel mechanism */}
        <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className='text-gray-500'>
                Cancel
            </Link>

            <button
            type="submit"
            disabled={!image || submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            > {submitting ? `${type}... `: type}</button>

        </div>
        </form>
    </section>
  )
}

export default Form