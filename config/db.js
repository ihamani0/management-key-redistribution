import mongoose from "mongoose";

const connectDB = async () => {

    try {
        const response = await mongoose.connect(process.env.URL_DB)
        console.log(`--- DataBase Connection---- ${response.connection.host}`)
    } catch (error) {
        console.log(`--- DataBase Error---- ${error}`)

    }

}

export default connectDB;