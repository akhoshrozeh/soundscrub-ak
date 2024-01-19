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

    const getPresignedUrl = async (fileName, fileType) => {
        const response = await fetch(`/api/submission/new/get-presigned-url?fileName=${fileName}&fileType=${fileType}`);
        const data = await response.json();
        return data;
    }

    const directUploadToS3 = async (file) => {
        const { presignedUrl, key } = await getPresignedUrl(file.name, file.type);

        // Upload the file directly to S3 using the presigned URL
        const response = await fetch(presignedUrl, {
            method: "PUT",
            headers: {
                "Content-Type": file.type
            },
            body: file
        });

        if (response.ok) {
            // The file URL in S3
            const fileUrl = `https://${process.env.NEXT_PUBLIC_STORAGE_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_STORAGE_BUCKET_REGION}.amazonaws.com/${key}`;
            return fileUrl;
        } else {
            throw new Error('Failed to upload file to S3');
        }

    }


    const createSubmission = async(e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            console.log("Attempting to create submission");

            const imageUrl = await directUploadToS3(uploadState.image);
            const audioUrl = await directUploadToS3(uploadState.audio);
        
            if (!imageUrl || !audioUrl) {
                throw new Error('Failed to get image or audio URL');
            }
                     
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

            if(response.ok) {
                console.log("Pushing to router")
                Router.push('/');
            }
            
        } catch (error) {
            console.error('Error creating new submission:', error);
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