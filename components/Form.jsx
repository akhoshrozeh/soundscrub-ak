import Link from 'next/link';
import FormInput from './FormInput';
const Form = ( { type, releaseSubmission, setReleaseSubmission, submitting, handleSubmit }) => {
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
            className="form_textarea"
        />

        <FormInput
            label="Music URL"
            value={releaseSubmission.link}
            onChange={(e) => setReleaseSubmission({ ...releaseSubmission, link: e.target.value })}
            placeholder="What's the weblink to your music?"
        />

        <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className='text-gray-500'>
                Cancel
            </Link>

            <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            > {submitting ? `${type}... `: type}</button>

        </div>
        </form>
    </section>
  )
}

export default Form