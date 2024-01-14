import Hope from "../../../Hope";
import Colors from "../../../utils/Colors";
import Embed from "../../../utils/Embed";

export default {
    name: "hug",
    description: "Hug someone!",
    execute: async (bot, message, args) => {
        const user = args[0];
        Hope.giphy.search("anime hug", (exception, result) => {
            if (exception) console.error(exception);

            const randomNumber = Math.floor(Math.random() * 10);
            const embed = new Embed.EmbedBuilder({
                image: {
                    url: result.data[randomNumber].images.original.url,
                },
                color: Colors.Pink,
                footer: Hope.footer(message),
            });
            bot.createMessage(message.channel.id, `${user}, you are hugged!`);
            bot.createMessage(message.channel.id, { embed: embed.build() });
        });
    },
};