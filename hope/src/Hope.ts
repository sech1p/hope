import { Client, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import Config from "./Config";

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

bot.login(Config.Token);