import { envs } from "./config/envs.config";
import { MongoDataBase } from "./config/mongodb.config";
import { Server } from "./server";

(() => {
  main();
})();

async function main() {
  await MongoDataBase.connect({
    connectionUrl: envs.Mongo,
    dbName: envs.dbName
  });

  const server = new Server();

  server.start();
}