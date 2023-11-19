'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreateSubmission = () => {

    const Router = useRouter();

    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [image, setImage] = useState(null);
    
    const [releaseSubmission, setReleaseSubmission] = useState({
        title: '',
        artist: '',
        link: '',
        description: '',
        imgUrl: ''

    }); 

    const handleImgFileChange = (e) => {
        const newImage = e.target.files[0];
        setImage(newImage);
        
    }

    const createSubmission = async(e) => {
        e.preventDefault();
        setSubmitting(true);

        let imageUrl = releaseSubmission.imgUrl;

        try {
            console.log("Attempting to create submission");

            // Storage Logic
            if (image){
                console.log("Attempting to send storage request")
                const formData = new FormData();
                formData.append("image", image)

                const uploadResponse = await fetch('/api/submission/new/s3-upload', {
                    method: "POST",
                    body: formData
                })

                const uploadData = await uploadResponse.json();
                console.log(uploadData)
                if (uploadData && uploadData.fileUrl) {
                    imageUrl = uploadData.fileUrl; // Update imgUrl with the new file URL
                    console.log(imageUrl)
                }
            } else {
                
                console.log("No image selected")
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
                    coverImage: imageUrl
                })
            })
            console.log("Sending new submission...");

            console.log(response);

            if(response.ok) {
                console.log("Pushing to router")
                Router.push('/');
            }
        } catch (error) {
            console.log('Error creating new submission...')
            console.log(error);
        } finally {
            setSubmitting(false);
        }


    }

    return (
        <section className="pb-10">
            <Form
                type="Create"
                releaseSubmission={releaseSubmission}
                setReleaseSubmission={setReleaseSubmission}
                submitting={submitting}
                handleSubmit={createSubmission}
                handleImgFileChange={handleImgFileChange}
                image={image}
            />
        </section>
    )


}
export default CreateSubmission;