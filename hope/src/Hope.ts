import { Client, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import Config from "./Config";
import startServer from "./web/HopeServer";

dotenv.config();

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

bot.on("ready", () => {
    console.log("? Bot is ready!");
});

bot.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(Config.Prefix)) return;

    const args = message.content.slice(Config.Prefix.length).trim().split(/ +/g);
    const command = args.shift()?.toLowerCase();

    if (command === "ping") {
        message.channel.send("Pong!");
    }
});

startServer();
bot.login(Config.Token);