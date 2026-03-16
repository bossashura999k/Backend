import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}`)
        console.log(`\n Connected Successfully!!!
            ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Connection Failed, Reason: ", error);
        process.exit(1);
    }
}

export default connectDB;