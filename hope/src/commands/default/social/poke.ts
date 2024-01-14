import Eris from "eris";
import Hope from "../../../Hope";
import Colors from "../../../utils/Colors";
import Embed from "../../../utils/Embed";

export default {
    name: "poke",
    description: "Poke someone!",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const user = args[0];
        Hope.giphy.search("anime poke", (exception, result) => {
            if (exception) console.error(exception);

            const embed = new Embed.EmbedBuilder({
                image: {
                    url: result.data[0].images.original.url,
                },
                color: Colors.Pink,
                footer: Hope.footer(message),
            });
            bot.createMessage(message.channel.id, `${user}, you are poked!`);
            bot.createMessage(message.channel.id, { embed: embed.build() });
        });
    },
};