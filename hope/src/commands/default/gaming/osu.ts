import Config from "../../../Config";
import Hope from "../../../Hope";
import Colors from "../../../utils/Colors";
import Embed from "../../../utils/Embed";
import moment from "moment";

export default {
    name: "osu",
    description: "osu!",
    execute: (bot, message, args) => {
        const argument = args[0];
        switch (argument) {
            case "user":
                const userArgument = args[1];
                Hope.osuApi.getUser({ u: userArgument }).then(user => {
                    const days = Math.floor(user.secondsPlayed / 86400);
                    const hours = Math.floor(user.secondsPlayed / 3600);
                    const embed = new Embed.EmbedBuilder({
                        title: `Stats for ${user.name}`,
                        description: `Joined ${user.raw_joinDate}`,
                        fields: [
                            {
                                name: "PP",
                                value: Number(user.pp.raw).toFixed(0),
                            },
                            {
                                name: "Accuracy",
                                value: `${Number(user.accuracy).toFixed(2)} %`,
                            },
                            {
                                name: "Time played",
                                value: `${days} days, ${hours} hours`,
                            },
                            {
                                name: "Score (Ranked)",
                                value: String(user.scores.ranked),
                            },
                            {
                                name: "Counts",
                                value: `**SS**: ${user.counts.SS} **SSH**: ${user.counts.SSH}
                                **S**: ${user.counts.S} **SH**: ${user.counts.SH}
                                **A**: ${user.counts.A}
                                **300**: ${String(user.counts["300"])} **100**: ${String(user.counts["100"])} **50**: ${String(user.counts["50"])}`,
                            },
                        ],
                        color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                    });
                    bot.createMessage(message.channel.id, { embed: embed.build() });
                }).catch(() => {
                        const embedFail = new Embed.EmbedBuilder({
                        title: "❌ User not found",
                        color: Colors.Red,
                    });
                    return bot.createMessage(message.channel.id, { embed: embedFail.build() });

                });
                break;
            case "beatmap":
                const beatmapArgument = args[1];
                Hope.osuApi.getBeatmaps({ b: beatmapArgument }).then(beatmap => {
                    const embed = new Embed.EmbedBuilder({
                        title: beatmap[0].title,
                        description: `Mapped by ${beatmap[0].creator}`,
                        fields: [
                            {
                                name: "Artist",
                                value: beatmap[0].artist,
                                inline: true,
                            },
                            {
                                name: "Source",
                                value: beatmap[0].source || "N/A",
                                inline: true,
                            },
                            {
                                name: "Genre",
                                value: String(beatmap[0].genre),
                                inline: true,
                            },
                            {
                                name: "BPM",
                                value: String(beatmap[0].bpm),
                                inline: true,
                            },
                            {
                                name: "Approval Status",
                                value: String(beatmap[0].approvalStatus),
                                inline: true,
                            },
                            {
                                name: "Last update",
                                value: String(beatmap[0].raw_lastUpdate),
                                inline: true,
                            },
                            {
                                name: "Statistics",
                                value: `⭐ ${beatmap[0].counts.favorites}
                                🎮 ${beatmap[0].counts.plays} (${beatmap[0].counts.passes} passes)`,
                            },
                            {
                                name: "Length",
                                value: moment.utc(beatmap[0].length.total * 1000).format("HH:MM:ss"),
                                inline: true,
                            },
                            {
                                name: "Max combo",
                                value: String(beatmap[0].maxCombo),
                                inline: true,
                            }
                        ],
                        color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                    });
                    bot.createMessage(message.channel.id, { embed: embed.build() });
                }).catch(() => {
                    const embedFail = new Embed.EmbedBuilder({
                        title: "❌ Beatmap not found",
                        color: Colors.Red,
                    });
                    return bot.createMessage(message.channel.id, { embed: embedFail.build() });
                });              
            default:
                const defaultEmbed = new Embed.EmbedBuilder({
                    title: "❌ This command does not exists",
                    description: `For available commands check \`${Config.Prefix}help\``,
                });
                return bot.createMessage(message.channel.id, { embed: defaultEmbed.build() });
                break;
        };
    },
};