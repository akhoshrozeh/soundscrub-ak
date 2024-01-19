/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'soundscrub-web-storage.s3.us-east-2.amazonaws.com',
                port: '',
            }
        ]
    },
    env: {
        // Add your environment variables here
        NEXT_PUBLIC_STORAGE_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
        NEXT_PUBLIC_STORAGE_BUCKET_REGION: process.env.AWS_S3_REGION,
    }
}

module.exports = nextConfig;
