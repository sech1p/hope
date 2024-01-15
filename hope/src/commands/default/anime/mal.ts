import { Mal } from "node-myanimelist";
import Hope from "../../../Hope"
import Embed from "../../../utils/Embed";
import moment from "moment";
import Colors from "../../../utils/Colors";
import Config from "../../../Config";
import Eris from "eris";

export default {
    name: "mal",
    description: "📝 View anime(s)/manga(s) from MyAnimeList",
    category: "default/Anime",
    usage: `${Config.Prefix}mal anime Initial D`,
    exampleUsage: `${Config.Prefix}queue`,
    subcommands: "anime, manga, user",
    execute: async (bot, message, args) => {
        const argument = args[0];
        switch (argument) {
            case "anime":
                const animeArgument = args.slice(1).join(" ");
                (await Hope.malApi).anime.search(
                    animeArgument,
                    Mal.Anime.fields()
                        .all()
                ).call().then(anime => {
                    let animes = [];
                    anime.data.forEach(anime => {
                        const animeObject = {
                            name: anime.node.title,
                            value: `**Status**: ${anime.node.status.replace("_", " ").replace("_", " ")}
                            **Start date**: ${anime.node.start_date || "N/A"}
                            **End date**: ${anime.node.end_date || "N/A"}
                            **No. episodes**: ${anime.node.num_episodes}`,
                            inline: true,
                        };
                        animes.push(animeObject);
                    });
                    const embed = new Embed.EmbedBuilder({
                        title: `Results for: ${animeArgument}`,
                        fields: animes,
                        color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                        footer: Hope.footer(message),
                    });
                    return bot.createMessage(message.channel.id, { embed: embed.build() });
                });
                break;
            case "manga":
                const mangaArgument = args.slice(1).join(" ");
                (await Hope.malApi).manga.search(
                    mangaArgument,
                    Mal.Manga.fields()
                        .all()
                ).call().then(manga => {
                    let mangas = [];
                    manga.data.forEach(manga => {
                        const animeObject = {
                            name: manga.node.title,
                            value: `**Status**: ${manga.node.status.replace("_", " ")}
                            **Start date**: ${manga.node.start_date || "N/A"}
                            **End date**: ${manga.node.end_date || "N/A"}
                            **No. volumes**: ${manga.node.num_volumes}
                            **No. chapters**: ${manga.node.num_chapters}`,
                            inline: true,
                        };
                        mangas.push(animeObject);
                    });
                    const embed = new Embed.EmbedBuilder({
                        title: `Results for: ${mangaArgument}`,
                        fields: mangas,
                        color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                        footer: Hope.footer(message),
                    });
                    return bot.createMessage(message.channel.id, { embed: embed.build() });
                });
                break;
            case "user":
                const userArgument = args[1];
                const animeOrMangaArgument = args[2];
                if (!animeOrMangaArgument) {
                    (await Hope.malApi).user.info(userArgument).call()
                        .then(user => {
                            const embed = new Embed.EmbedBuilder({
                                title: `Informations for ${user.name}`,
                                description: `Joined at ${moment(user.joined_at, "YYYY-MM-DDTHH:MM:ss").format("DD-MM-YYYY HH:MM:ss")}`,
                                image: {
                                    url: user.picture,
                                },
                                fields: [
                                    {
                                        name: "ID",
                                        value: String(user.id),
                                    },
                                    {
                                        name: "Location",
                                        value: user.location || "N/A",
                                    },
                                ],
                                color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                                footer: Hope.footer(message),
                            });
                            return bot.createMessage(message.channel.id, { embed: embed.build() });
                        });
                } else if (animeOrMangaArgument === "anime") {
                    (await Hope.malApi).user.animelist(userArgument).call()
                        .then(anime => {
                            let animes = [];
                            anime.data.forEach(anime => {
                                const animeObject = {
                                    name: anime.node.title,
                                    value: `**Status**: ${anime.list_status.status.replace("_", " ").replace("_", " ")}
                                    **Episodes watched**: ${anime.list_status.num_episodes_watched}
                                    **Updated at**: ${moment(anime.list_status.updated_at, "YYYY-MM-DD").format("DD-MM-YYYY HH:MM:ss")}`,
                                    inline: true,
                                };
                                animes.push(animeObject)
                            });
                            const embed = new Embed.EmbedBuilder({
                                title: `${userArgument}'s anime list`,
                                fields: animes,
                                color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                                footer: Hope.footer(message),
                            });
                            return bot.createMessage(message.channel.id, { embed: embed.build() });
                        });
                } else if (animeOrMangaArgument === "manga") {
                    (await Hope.malApi).user.mangalist(userArgument).call()
                        .then(manga => {
                            let mangas = [];
                            manga.data.forEach(manga => {
                                const mangaObject = {
                                    name: manga.node.title,
                                    value: `**Status**: ${manga.list_status.status.replace("_", " ").replace("_", " ")}`,
                                    inline: true,
                                };
                                mangas.push(mangaObject)
                            });
                            const embed = new Embed.EmbedBuilder({
                                title: `${userArgument}'s manga list`,
                                fields: mangas,
                                color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                                footer: Hope.footer(message),
                            });
                            return bot.createMessage(message.channel.id, { embed: embed.build() });
                        });
                }
                break;
            default:
                const defaultEmbed = new Embed.EmbedBuilder({
                    title: "❌ This command does not exists",
                    description: `For available commands check \`${Config.Prefix}help\``,
                    footer: Hope.footer(message),
                });
                return bot.createMessage(message.channel.id, { embed: defaultEmbed.build() });
        }
    }
}