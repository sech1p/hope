import giphy from "../../../Hope";
import Colors from "../../../utils/Colors";
import Embed from "../../../utils/Embed";

export default {
    name: "cuddle",
    description: "Cuddle someone!",
    execute: async (bot, message, args) => {
        const user = args[0];
        giphy.giphy.search("anime cuddle", (exception, result) => {
            if (exception) console.error(exception);

            const randomNumber = Math.floor(Math.random() * 10);
            const embed = new Embed.EmbedBuilder({
                image: {
                    url: result.data[randomNumber].images.original.url,
                },
                color: Colors.Pink,
            });
            bot.createMessage(message.channel.id, `${user}, you are cuddled!`);
            bot.createMessage(message.channel.id, { embed: embed.build() });
        });
    },
};