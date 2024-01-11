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
                const filter = {
                    isAdult: true,
                    source_in: ["ORIGINAL", "LIGHT_NOVEL"]
                };
                Hope.aniListApi.searchEntry.anime(animeArgument, {
                    isAdult: true,
                    source_in: [
                        "ORIGINAL",
                        "DOUJINSHI",
                        "LIGHT_NOVEL",
                        "MANGA",
                        "OTHER",
                        "VIDEO_GAME",
                        "VISUAL_NOVEL"
                    ],
                }).then(anime => {
                    console.log(anime);
                });
                break;
            case "manga":
                const mangaArgument = args.slice(1).join(" ");
                Hope.aniListApi.searchEntry.manga(mangaArgument, {
                    isAdult: true,
                    source_in: [
                        "ORIGINAL",
                        "ANIME",
                        "DOUJINSHI",
                        "LIGHT_NOVEL",
                        "NOVEL",
                        "OTHER",
                        "VIDEO_GAME",
                        "VISUAL_NOVEL"
                    ],
                }).then(manga => {
                    console.log(manga);
                });
                break;
            case "user":
                const userArgument = args[1];
                Hope.aniListApi.searchEntry.user(userArgument)
                    .then(user => {
                        console.log(user);
                    });
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