import Eris from "eris";
import fs from "node:fs";
import path from "node:path";
import Config from "./Config";
import startServer from "./web/HopeServer";
import glob from "glob-promise";

const bot = Eris(Config.Token);

const loadEvents = async (bot) => {
    console.log(`? Loading events...`)
    await glob(`dist/events/*.js`).then(async (eventsFiles) => {
        for (const eventFile of eventsFiles) {
            try {
                const { default: event } = await import(path.join(process.cwd(), eventFile));
                if (typeof event.run === "function") {
                    bot.on(event.name, event.run.bind(null, bot));
                } else {
                    console.error("? Invalid event file, run function is missing");
                };
            } catch (exception) {
                console.error(`? Failed to load events: ${exception}`);
            }
        }
    });
};

bot.on("messageCreate", (message) => {
    if (message.content === "!ping") {
        bot.createMessage(message.channel.id, "pong!");
    };
});

const start = async () => {
    await loadEvents(bot);
    await Promise.all([startServer(), bot.connect()]);
}
start();