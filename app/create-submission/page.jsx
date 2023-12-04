'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreateSubmission = () => {

    const Router = useRouter();

    let initUploadState = {
        image: null,
        audio: null
    }

    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [uploadState, setUploadState] = useState(initUploadState);
    
    const [releaseSubmission, setReleaseSubmission] = useState({
        title: '',
        artist: '',
        link: '',
        description: '',
        imgUrl: '',
        releaseType: '',
        tags: [],
        audioUrl: ''
    }); 

    const handleImgFileChange = (e) => {
        const newImage = e.target.files[0];
        setUploadState({...uploadState, image: newImage});
    }

    const handleAudioFileChange = (e) => {
        const newAudio = e.target.files[0];
        setUploadState({...uploadState, audio: newAudio});
    }
    
    const handleTagItemAdd = (e) => {
        const newTag = e.target.value;
        if (newTag && !releaseSubmission.tags.includes(newTag)) {
            setReleaseSubmission([...releaseSubmission.tags, newTag]);
        }
    }

    const createSubmission = async(e) => {
        e.preventDefault();
        setSubmitting(true);

        let imageUrl = releaseSubmission.imgUrl;
        let audioUrl = releaseSubmission.audioUrl;

        let uploadSuccessful = false;

        try {
            console.log("Attempting to create submission");

            // Storage Logic
            if (uploadState.image || uploadState.audio){
                console.log("Attempting to send storage request")
                const formData = new FormData();
                formData.append("image", uploadState.image)
                formData.append("audio", uploadState.audio)


                const uploadResponse = await fetch('/api/submission/new/form-asset-upload', {
                    method: "POST",
                    body: formData
                })
        

                console.log(uploadResponse)

                if (uploadResponse.ok){
                    uploadSuccessful = true;
                }
                else {
                    throw new Error("Failed to upload assets.");
                }

                const uploadData = await uploadResponse.json();
                console.log(uploadData);

                if (uploadData && uploadData.data.imageUrl && uploadData.data.audioUrl) {
                    imageUrl = uploadData.data.imageUrl;
                    audioUrl = uploadData.data.audioUrl;
                }
            } else {
                console.log("Either image or audio not selected")
            }

            if (uploadSuccessful) {
                     
                // Database Logic
                const response = await fetch('/api/submission/new', {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: session?.user.id,
                        title: releaseSubmission.title,
                        artist: releaseSubmission.artist,
                        link: releaseSubmission.link,
                        description: releaseSubmission.description,
                        coverImage: imageUrl,
                        releaseType: releaseSubmission.releaseType,
                        tags: releaseSubmission.tags,
                        audioUrl: audioUrl,
                    })
                })
                console.log("Sending new submission...");

                console.log(response);

                if(response.ok) {
                    console.log("Pushing to router")
                    Router.push('/');
                }
            }
            
        } catch (error) {
            console.log('Error creating new submission...')
            console.log(error);
        } finally {
            setSubmitting(false);
        }


    }

    return (
        <section className="pb-5">
            <Form
                type="Create"
                releaseSubmission={releaseSubmission}
                setReleaseSubmission={setReleaseSubmission}
                submitting={submitting}
                handleSubmit={createSubmission}
                handleImgFileChange={handleImgFileChange}
                uploadState={uploadState}
                handleAudioFileChange={handleAudioFileChange}
            />
        </section>
    )


}
export default CreateSubmission;