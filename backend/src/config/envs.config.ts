import env from 'env-var';
import 'dotenv/config';

export const envs = {
    port: env.get('PORT').required().asInt(),
    mongoUser: env.get('DB_MONGO_USER').required().asString(),
    mongoPassword: env.get('DB_MONGO_PASS').required().asString(),
    Mongo: env.get('DB_MONGO_URL').required().asString(),
    dbName: env.get('DB_MONGO_NAME').required().asString(),
    JWT_SEED: env.get('JWT_SEED').required().asString(),

}