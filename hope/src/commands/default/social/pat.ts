import Eris from "eris";
import Config from "../../../Config";
import Hope from "../../../Hope";
import Colors from "../../../utils/Colors";
import Embed from "../../../utils/Embed";

export default {
    name: "pat",
    description: "(づ ˘͈ ᵕ ˘͈ )づ Pat someone!",
    category: "default/Social",
    usage: `${Config.Prefix}pat [user]`,
    exampleUsage: `${Config.Prefix}pat @user`,
    subcommands: "N/A",
    enabled: true,
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const user = args[0];
        Hope.giphy.search("anime pat", (exception, result) => {
            if (exception) console.error(exception);

            const randomNumber = Math.floor(Math.random() * 10);
            const embed = new Embed.EmbedBuilder({
                image: {
                    url: result.data[randomNumber].images.original.url,
                },
                color: Colors.Pink,
                footer: Hope.footer(message),
            });
            bot.createMessage(message.channel.id, `${user}, you have been headpated!`);
            bot.createMessage(message.channel.id, { embed: embed.build() });
        });
    },
};