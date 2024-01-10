import Eris from "eris";
import fs from "node:fs";
import path from "node:path";
import Config from "./Config";
import startServer from "./web/HopeServer";
import glob from "glob-promise";
import moment from "moment";
import osu from "node-osu";

const bot = Eris(Config.Token);
const giphy = require("giphy-api")(Config.GiphyToken);
const osuApi = new osu.Api(Config.osuApiKey, {});

const log = (message: string): any => {
    console.log(`[${moment().format("DD-MM-YYYY HH:MM:ss")}]: ${message}`);
};

const logError = (message: string): any => {
    console.error(`[${moment().format("DD-MM-YYYY HH:MM:ss")}]: ${message}`);
};

const loadEvents = async (bot: Eris.Client) => {
    log(`⏳ Loading events...`)
    await glob(`dist/events/*.js`).then(async (eventsFiles) => {
        for (const eventFile of eventsFiles) {
            try {
                const { default: event } = await import(path.join(process.cwd(), eventFile));
                if (typeof event.run === "function") {
                    bot.on(event.name, event.run.bind(null, bot));
                } else {
                    logError("❌ Invalid event file, run function is missing");
                };
            } catch (exception) {
                logError(`❌ Failed to load events: ${exception}`);
            };
        };
    });
};

const loadCommands = async (bot: Eris.Client) => {
    log(`⏳ Loading commands...`)
    await glob(`dist/commands/**/**/*.js`).then(async (commandFiles) => {
        for (const commandFile of commandFiles) {
            try {
                const { default: command } = await import(path.join(process.cwd(), commandFile));
                if (typeof command.execute === "function") {
                    bot.on("messageCreate", (message: Eris.Message) => {
                        const content = message.content.trim();

                        if (content.startsWith(Config.Prefix)) {
                            const args = content.slice(Config.Prefix.length).split(" ");
                            const commandName = args.shift().toLowerCase();

                            if (commandName === command.name.toLowerCase()) {
                                command.execute(bot, message, args);
                            };
                        };
                    });
                } else {
                    logError(`❌ Invalid command file, execute function in ${commandFile} is missing`);
                };
            } catch (exception) {
                logError(`❌ Failed to load commands: ${exception}`);
            };
        };
    });
};

const start = async () => {
    await loadEvents(bot);
    await loadCommands(bot);
    await Promise.all([startServer(), bot.connect()]);
}
start();

export default {
    log,
    logError,
    giphy,
    osuApi,
};