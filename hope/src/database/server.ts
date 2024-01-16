import Eris from "eris";
import { Client } from "pg";

const PutIntoUsers = async (postgreClient: Client, message: Eris.Message) => {
    const guildID = message.guildID;
    const query = {
        text: `INSERT INTO users ("userID", "guildID")
        VALUES ($1, $2)
        ON CONFLICT ("userID", "guildID") DO NOTHING`,
        values: [message.author.id, guildID],
    };
    await postgreClient.query(query);
};

export default {
    PutIntoUsers,
};