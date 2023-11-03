'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreateSubmission = () => {

    const Router = useRouter();

    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    
    const [releaseSubmission, setReleaseSubmission] = useState({
        title: '',
        artist: '',
        link: '',

    });

    const createSubmission = async(e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            console.log("Attempting to create submission");

            const response = await fetch('/api/submission/new', {
                method: 'POST',
                body: JSON.stringify({
                    userId: session?.user.id,
                    title: releaseSubmission.title,
                    artist: releaseSubmission.artist,
                    link: releaseSubmission.link
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
        <section>
            <Form
                type="Create"
                releaseSubmission={releaseSubmission}
                setReleaseSubmission={setReleaseSubmission}
                submitting={submitting}
                handleSubmit={createSubmission}
            />
        </section>
    )


}
export default CreateSubmission;