import Eris from "eris";
import Hope from "../../../Hope";
import Colors from "../../../utils/Colors";
import Embed from "../../../utils/Embed";
import Config from "../../../Config";

export default {
    name: "tickle",
    description: "🪶 Tickle someone!",
    category: "default/Social",
    usage: `${Config.Prefix}queue`,
    exampleUsage: `${Config.Prefix}queue`,
    subcommands: "N/A",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const tickleGifs = [
            "FDPJjtvBkIRYA",
            "2QHLYZFJgjsFq",
            "FNyJEVi76JgzK",
        ]
        const MAX = tickleGifs.length - 1;
        const MIN = 0;
        const user = args[0];
        const randomNumber = Math.floor(Math.random() * (MAX - MIN + 1) + MAX); // Generate random number between 0-2 indexes
        Hope.giphy.id(tickleGifs[randomNumber], (exception, result) => {
            if (exception) console.error(exception);

            const embed = new Embed.EmbedBuilder({
                image: {
                    url: result.data[0].images.original.url,
                },
                color: Colors.Pink,
                footer: Hope.footer(message),
            });
            bot.createMessage(message.channel.id, `${user}, you have been tickled!`);
            bot.createMessage(message.channel.id, { embed: embed.build() });
        });
    },
};