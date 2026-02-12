import mongoose from "mongoose";

interface MongoDBConfig {
    connectionUrl: string;
    dbName: string;
    }

    export class MongoDataBase {
        static connect = async (options: MongoDBConfig) => { 
            const{connectionUrl, dbName}= options;

            try {
                await mongoose.connect(connectionUrl, {
                    dbName: dbName
                });
            } catch (error) {
                console.error("Error connecting to MongoDB:", error);
                throw error;
            }
            console.log("Connecting to MongoDB...");
        }

        static disconnect = async() => {
            await mongoose.disconnect();
            console.log("Disconnecting from MongoDB...");
        }
    }

