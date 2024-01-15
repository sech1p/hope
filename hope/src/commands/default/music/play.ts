import Eris from "eris";
import Embed from "../../../utils/Embed";
import Colors from "../../../utils/Colors";
import Hope from "../../../Hope";
import Config from "../../../Config";
import youtubeDl from "youtube-dl-exec";

export default {
    name: "play",
    description: "🎵 Play music!",
    category: "default/Music",
    usage: `${Config.Prefix}play [link]`,
    exampleUsage: `${Config.Prefix}play https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
    subcommands: "N/A",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        try {
            const videoArgument = args[0].split("=")[1];
            bot.joinVoiceChannel(
                message.member.voiceState.channelID,
                {
                    opusOnly: true,
                },
            ).then(voiceChannel => {
                youtubeDl(`https://youtube.com/watch?v=${videoArgument}`, {
                dumpSingleJson: true,
                noCheckCertificates: true,
                noWarnings: true,
                preferFreeFormats: true,
                addHeader: ["referer:youtube.com", "user-agent:googlebot"]
                }).then(video => {
                    let videos: Array<string> = [];
                    video.formats.forEach(video => {
                        if (video.asr === 48000 && video.acodec === "opus") {
                            videos.push(video.url);
                        }
                    });
                    voiceChannel.play(videos[0]);
                    const embed = new Embed.EmbedBuilder({
                        title: `Now playing: ${video.title}`,
                        thumbnail: {
                            url: video.thumbnail,
                        },
                        color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM)],
                        footer: Hope.footer(message),
                    });
                    bot.createMessage(message.channel.id, { embed: embed.build() });
                }).catch(() => {
                    const embedFail = new Embed.EmbedBuilder({
                        title: "❌ Sorry!",
                        description: "Failed to play music",
                        color: Colors.Red,
                        footer: Hope.footer(message),
                    });
                    bot.createMessage(message.channel.id, { embed: embedFail.build() });
                });
            });
        } catch (exception: any) {
            const embedFail = new Embed.EmbedBuilder({
                title: "❌ Sorry!",
                description: "You must be on voice channel to play music!",
                color: Colors.Red,
                footer: Hope.footer(message),
            });
            return bot.createMessage(message.channel.id, { embed: embedFail.build() });
        }
    },
};