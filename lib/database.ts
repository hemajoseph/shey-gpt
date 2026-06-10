import mongoose from "mongoose";
export const connectMongoDB = async () => {
    try {
        console.log(process.env.DATABASE_URL);
        await mongoose.connect(process.env.DATABASE_URL!);
        //await mongoose.connect("mongodb://hjoseph:123%24@ac-kbscipj-shard-00-00.wg6nkbu.mongodb.net:27017,ac-kbscipj-shard-00-01.wg6nkbu.mongodb.net:27017,ac-kbscipj-shard-00-02.wg6nkbu.mongodb.net:27017/sheyDB?ssl=true&replicaSet=atlas-movxls-shard-0&authSource=admin&appName=Cluster0");
        
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}