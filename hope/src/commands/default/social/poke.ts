import giphy from "../../../Hope";
import Embed from "../../../utils/Embed";

export default {
    name: "poke",
    description: "Poke someone!",
    execute: async (bot, message, args) => {
        const user = args[0];
        giphy.giphy.search("anime poke", (exception, result) => {
            if (exception) console.error(exception);

            const embed = new Embed.EmbedBuilder({
                image: {
                    url: result.data[0].images.original.url,
                },
            });
            bot.createMessage(message.channel.id, `${user}, you are poked!`);
            bot.createMessage(message.channel.id, { embed: embed.build() });
        });
    },
};