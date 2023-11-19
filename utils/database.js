import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        console.log("Attempting MongoDB connection")
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "soundscrub_db",
            useNewUrlParser: true,
            useUnifiedTopology: true,

        }) 

        isConnected = true;
    
        console.log('MongoDB connected!') 
    } catch(error) {
        console.log("Failed MongoDB connection")
        console.log(error);
    }
}