import { Client } from "pg";
import Hope from "../Hope";

const init = async (postgreClient: Client) => {
    await postgreClient.query(
        "CREATE SCHEMA IF NOT EXISTS hope;",
    );
    await postgreClient.query(
        `CREATE TABLE IF NOT EXISTS servers (
            "guild" varchar(256) NOT NULL,
            "guildID" varchar(64) PRIMARY KEY,
            UNIQUE("guild", "guildID")
        );`,
    );
    await postgreClient.query(
        `CREATE TABLE IF NOT EXISTS users (
            "userID" varchar(64) PRIMARY KEY,
            "xp" INT,
            "money" DECIMAL,
            "guildID" varchar(64) REFERENCES servers("guildID"),
            UNIQUE("userID", "guildID")
        );`
    );
    Hope.log("✔ Database has been successfully initialized");
};

const initServer = async (postgreClient: Client, server, guildID: string) => {
    await Hope.postgreClient.query(
        `INSERT INTO servers ("guild", "guildID")
        VALUES ('${server.name}', '${guildID}')
        ON CONFLICT ("guildID") DO NOTHING;`
    );
}

export default {
    init,
    initServer,
};