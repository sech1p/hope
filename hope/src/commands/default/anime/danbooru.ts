import Eris from "eris";
import Hope from "../../../Hope"
import Colors from "../../../utils/Colors";
import Embed from "../../../utils/Embed";
import Config from "../../../Config";

export default {
    name: "danbooru",
    description: "📷 Search images in Danbooru",
    category: "default/Anime",
    usage: `${Config.Prefix}danbooru [query]`,
    exampleUsage: `${Config.Prefix}danbooru catgirl`,
    subcommands: "N/A",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const argument = args.slice(0).join(" ");

        await Hope.Booru("danbooru").search(argument, { limit: 1, random: false })
            .then(posts => {
                for (const post of posts) {
                    const embed = new Embed.EmbedBuilder({
                        title: `Danbooru - ${post.id}`,
                        description: `**Tags**: \`${post.tags.join(", ")}\``,
                        image: {
                            url: post.fileUrl,
                        },
                        color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                        footer: Hope.footer(message),
                    });
                    bot.createMessage(message.channel.id, { embed: embed.build() });
                };
            });
    },
};