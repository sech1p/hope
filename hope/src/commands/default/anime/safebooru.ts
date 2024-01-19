import Eris from "eris";
import Hope from "../../../Hope";
import Colors from "../../../utils/Colors";
import Embed from "../../../utils/Embed";
import Config from "../../../Config";

export default {
    name: "safebooru",
    description: "📷 Search images in Safebooru",
    category: "default/Anime",
    usage: `${Config.Prefix}safebooru [query]`,
    exampleUsage: `${Config.Prefix}safebooru tickle`,
    subcommands: "N/A",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const argument = args.slice(0).join(" ");

        await Hope.Booru("safebooru").search(argument, { limit: 1, random: false })
            .then(posts => {
                for (const post of posts) {
                    const embed = new Embed.EmbedBuilder({
                        title: `Safebooru - ${post.id}`,
                        description: `**Tags**: \`${post.tags.join(", ")}\``,
                        image: {
                            url: post.fileUrl,
                        },
                        color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                        footer: Hope.footer(message),
                    });
                    bot.createMessage(message.channel.id, { embed: embed.build() });
                }
            });
    },
};