import axios from "axios";
import Config from "../../../Config";
import Hope from "../../../Hope";
import Embed from "../../../utils/Embed";

export default {
    name: "anilist",
    description: "anilist",
    execute: async (bot, message, args) => {
        const argument = args[0];
        switch (argument) {
            case "anime":
                const animeArgument = args.slice(1).join(" ");
                //
                break;
            case "manga":
                const mangaArgument = args.slice(1).join(" ");
                //
                break;
            case "user":
                const userArgument = args[1];
                //
                break;
            default:
                const defaultEmbed = new Embed.EmbedBuilder({
                    title: "❌ This subcommand does not exists",
                    description: `For correctly usage check \`${Config.Prefix}help\``,
                });
                bot.createMessage(message.channel.id, { embed: defaultEmbed.build() });
                break;
        }
    },
};