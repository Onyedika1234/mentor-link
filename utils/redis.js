import { createClient } from "redis";

const client = createClient();

client.on("error", (error) => console.error("Redis Client Error", error));

await client.connect();

export default client;
