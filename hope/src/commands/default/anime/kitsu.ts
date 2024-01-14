import moment from "moment";
import Hope from "../../../Hope";
import Colors from "../../../utils/Colors";
import Embed from "../../../utils/Embed";
import Config from "../../../Config";

export default {
    name: "kitsu",
    description: "kitsu",
    execute: async (bot, message, args) => {
        const argument = args[0];
        switch (argument) {
            case "anime":
                const animeArgument = args.slice(1).join(" ");
                await Hope.kitsuApi.get("anime", {
                    params: {
                        filter: {
                            slug: animeArgument
                                .replaceAll(" ", "-")
                                .toLowerCase(),
                        },
                    },
                }).then(anime => {
                    anime = anime.data[0];
                    if (!anime) {
                        const embedFail = new Embed.EmbedBuilder({
                            title: "❌ Sorry!",
                            description: "Provided anime has not been found",
                            color: Colors.Red,
                        });
                        return bot.createMessage(message.channel.id, { embed: embedFail.build() });    
                    }
                    const embed = new Embed.EmbedBuilder({
                        title: anime.canonicalTitle,
                        description: anime.synopsis,
                        fields: [
                            {
                                name: "Start date",
                                value: anime.startDate || "N/A",
                                inline: true,
                            },
                            {
                                name: "End date",
                                value: anime.endDate || "N/A",
                                inline: true,
                            },
                            {
                                name: "Next release",
                                value: moment(anime.nextRelease).format("LLLL") || "N/A",
                                inline: true,
                            },
                            {
                                name: "Status",
                                value: anime.status === "current" ? "airing" : anime.status,
                                inline: true,
                            },
                            {
                                name: "Episodes",
                                value: anime.episodeCount || "N/A",
                                inline: true,
                            },
                            {
                                name: "Age rating",
                                value: `${anime.ageRating} (${anime.ageRatingGuide})`,
                                inline: true,
                            },
                            {
                                name: "Favorites",
                                value: anime.favoritesCount,
                                inline: true,
                            },
                            {
                                name: "Average rating",
                                value: anime.averageRating,
                                inline: true,
                            },
                        ],
                        url: `https://kitsu.io/anime/${anime.slug}`,
                        image: {
                            url: anime.coverImage.original,
                        },
                        color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)]
                    });
                    return bot.createMessage(message.channel.id, { embed: embed.build() });
                });
                break;
            case "manga":
                const mangaArgument = args.slice(1).join(" ");
                Hope.kitsuApi.get("manga", {
                    params: {
                        filter: {
                            slug: mangaArgument
                                    .replaceAll(" ", "-")
                                    .toLowerCase(),
                        },
                    },
                }).then(manga => {
                    manga = manga.data[0];
                    if (!manga) {
                        const embedFail = new Embed.EmbedBuilder({
                            title: "❌ Sorry!",
                            description: "Provided manga has not been found",
                            color: Colors.Red,
                        });
                        return bot.createMessage(message.channel.id, { embed: embedFail.build() });
                    }
                    const embed = new Embed.EmbedBuilder({
                        title: manga.canonicalTitle,
                        description: manga.synopsis,
                        fields: [
                            {
                                name: "Start date",
                                value: manga.startDate || "N/A",
                                inline: true,
                            },
                            {
                                name: "End date",
                                value: manga.endDate || "N/A",
                                inline: true,
                            },
                            {
                                name: "Next release",
                                value: manga.nextRelease ? moment(manga.nextRelease).format("LLLL") : "N/A",
                                inline: true,
                            },
                            {
                                name: "Volumes (Chapters)",
                                value: `${manga.volumeCount || "N/A"} (${manga.chapterCount || "N/A"})`,
                                inline: true,
                            },
                            {
                                name: "Favorites",
                                value: manga.favoritesCount,
                                inline: true,
                            },
                            {
                                name: "Average rating",
                                value: manga.averageRating,
                                inline: true,
                            },
                        ],
                        url: `https://kitsu.io/manga/${manga.slug}`,
                        image: {
                            url: manga.coverImage.original,
                        },
                    });
                    return bot.createMessage(message.channel.id, { embed: embed.build() });
                    });
                break;
            case "user":
                const userArgument = args[1];
                Hope.kitsuApi.get("user", {
                    params: {
                        filter: {
                            slug: userArgument,
                        },
                    },
                }).then(user => {
                    user = user.data[0];
                    if (!user) {
                        const embedFail = new Embed.EmbedBuilder({
                            title: "❌ Sorry!",
                            description: "Provided user has not been found",
                            color: Colors.Red,
                        });
                        return bot.createMessage(message.channel.id, { embed: embedFail.build() });
                    }
                    const embed = new Embed.EmbedBuilder({
                        description: `Joined at ${moment(user.createdAt).format("LLLL")}`,
                        fields: [
                            {
                                name: "Name",
                                value: user.name,
                                inline: true,
                            },
                            {
                                name: "About",
                                value: user.about || "N/A",
                                inline: true,
                            },
                            {
                                name: "Location",
                                value: user.location || "N/A",
                                inline: true,
                            },
                            {
                                name: "Statistics",
                                value: `Followers: ${user.followersCount}
                                Following: ${user.followingCount}
                                Watch time: ${user.lifeSpentOnAnime / 3600}
                                💬: ${user.commentsCount} | ⭐: ${user.favoritesCount}`,
                                inline: true,
                            },
                            {
                                name: "Waifu or Husbando",
                                value: user.waifuOrHusbando || "N/A",
                                inline: true,
                            },
                            {
                                name: "Personal data",
                                value: `Birthday: ${user.birthday || "N/A"}
                                Gender: ${user.gender || "N/A"}`,
                                inline: true,
                            },
                            {
                                name: "SFW filter preference",
                                value: user.sfwFilterPreference.replaceAll("_", " "),
                                inline: true,
                            },
                        ],
                        author: {
                            name: `${user.slug} profile`,
                            icon_url: user.avatar ? user.avatar.small : null,
                        },
                        image: {
                            url: user.coverImage ? user.coverImage.tiny : null,
                        }
                    });
                    return bot.createMessage(message.channel.id, { embed: embed.build() });
                });
                break;
            default:
                const defaultEmbed = new Embed.EmbedBuilder({
                    title: "❌ This command does not exists",
                    description: `For available commands check \`${Config.Prefix}help\``,
                });
                return bot.createMessage(message.channel.id, { embed: defaultEmbed.build() });
        }
    },
};