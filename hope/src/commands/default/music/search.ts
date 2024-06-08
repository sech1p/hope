import Eris from "eris";
import Config from "../../../Config";
import searchYoutube from "youtube-api-v3-search";
import Embed from "../../../utils/Embed";
import Colors from "../../../utils/Colors";
import Hope from "../../../Hope";

export default {
    name: "search",
    description: "🎵 Search videos on YouTube",
    category: "default/Music",
    usage: `${Config.Prefix}search [query]`,
    exampleUsage: `${Config.Prefix}search Rick Astley`, // you have been rickrolled
    subcommands: "N/A",
    enabled: true,
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const queryArgument = args.slice(0).join(" ");
        const options = {
            q: queryArgument,
            part: "snippet",
            type: "video",
        };
        let description;

        await searchYoutube(Config.YoutubeKey, options)
            .then(results => {
                for (let item of results.items) {
                    description += `${item.snippet.channelTitle} - ${item.snippet.title} (${item.id.videoId})\n\n`;
                }
                description = description.replace(undefined, "");
                const embed = new Embed.EmbedBuilder({
                    title: `Results for ${queryArgument}`,
                    description: `\`\`\`${description}\`\`\``,
                    color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                    footer: Hope.footer(message),
                });
                return bot.createMessage(message.channel.id, { embed: embed.build() });
            }).catch(() => {
                const embedFail = new Embed.EmbedBuilder({
                    title: "❌ Sorry!",
                    description: "Failed to fetch videos from YouTube",
                    color: Colors.Red,
                    footer: Hope.footer(message),
                });
                return bot.createMessage(message.channel.id, { embed: embedFail.build() });
            });
    },
};