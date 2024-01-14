import Hope from "../../../Hope";
import Colors from "../../../utils/Colors";
import Embed from "../../../utils/Embed";

export default {
    name: "safebooru",
    description: "📷 Search images in Safebooru",
    execute: async (bot, message, args) => {
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
            })
    },
};