import Eris from "eris";
import Hope from "../../../Hope";
import Colors from "../../../utils/Colors";
import Embed from "../../../utils/Embed";

export default {
    name: "tickle",
    description: "🪶 Tickle someone!",
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