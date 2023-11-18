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
            };
        };
    });
};

const loadCommands = async (bot) => {
    console.log(`? Loading commands...`)
    await glob(`dist/commands/**/**/*.js`).then(async (commandFiles) => {
        for (const commandFile of commandFiles) {
            try {
                const { default: command } = await import(path.join(process.cwd(), commandFile));
                if (typeof command.execute === "function") {
                    bot.on("messageCreate", (message) => {
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
                    console.error(`? Invalid command file, execute function in ${commandFile} is missing`);
                };
            } catch (exception) {
                console.error(`? Failed to load commands: ${exception}`);
            };
        };
    });
};

bot.on("messageCreate", (message) => {
    if (message.content === "!ping") {
        bot.createMessage(message.channel.id, "pong!");
    };
});

const start = async () => {
    await loadEvents(bot);
    await loadCommands(bot);
    await Promise.all([startServer(), bot.connect()]);
}
start();