import giphy from "../../../Hope";
import Embed from "../../../utils/Embed";

export default {
    name: "kiss",
    description: "Kiss someone!",
    execute: async (bot, message, args) => {
        const user = args[0];
        giphy.giphy.search("anime kiss", (exception, result) => {
            if (exception) console.error(exception);

            const randomNumber = Math.floor(Math.random() * 10);
            const embed = new Embed.EmbedBuilder({
                image: {
                    url: result.data[randomNumber].images.original.url,
                },
            });
            bot.createMessage(message.channel.id, `${user}, you are kissed!`);
            bot.createMessage(message.channel.id, { embed: embed.build() });
        });
    },
};