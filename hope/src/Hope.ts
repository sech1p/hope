import Eris from "eris";
import fs from "node:fs";
import path from "node:path";
import Config from "./Config";
import startServer from "./web/HopeServer";

const bot = Eris(Config.Token);

bot.on("ready", () => {
    console.log("? Bot is ready!");
});

bot.on("messageCreate", (message) => {
    if (message.content === "!ping") {
        bot.createMessage(message.channel.id, "pong!");
    };
});

const start = async () => {
    await Promise.all([startServer(), bot.connect()]);
}
start();