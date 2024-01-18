import Eris from "eris";
import Embed from "../../../utils/Embed";
import Colors from "../../../utils/Colors";
import Hope from "../../../Hope";
import Config from "../../../Config";
import axios from "axios";
import cheerio from "cheerio";
import youtubeDl from "youtube-dl-exec";
const soundcloud = require("soundcloud-downloader").default;

export default {
    name: "play",
    description: "🎵 Play music!",
    category: "default/Music",
    usage: `${Config.Prefix}play [link]`,
    exampleUsage: `${Config.Prefix}play https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
    subcommands: "N/A",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const getTitle = async (url: string): Promise<string> => {
            let songTitle: string;
            await axios.get(url)
                .then(response => {
                    const html = response.data;

                    const $ = cheerio.load(html);

                    const title = $("title").text();
                    songTitle = title;
                });
            return songTitle.replace("Stream", "").split("|")[0];
        };
        const youtubeRegex: RegExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
        const soundcloudRegex: RegExp = /^https:\/\/soundcloud\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;

        if (youtubeRegex.test(args[0])) {
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
                        addHeader: ["referer:youtube.com", "user-agent:googlebot"],
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
        } else if (soundcloudRegex.test(args[0])) {
            try {
                const clientID = Config.SoundcloudClientID;
                const audioArgument = args[0];
                bot.joinVoiceChannel(
                    message.member.voiceState.channelID,
                    {
                        opusOnly: true,
                    },
                ).then(voiceChannel => {
                    let songTitle: string;
                    getTitle(audioArgument)
                        .then(title => {
                            songTitle = title;
                        });
                    soundcloud.download(audioArgument, clientID)
                        .then(stream => {
                            voiceChannel.play(stream);
                            const embed = new Embed.EmbedBuilder({
                                title: `Now playing: ${songTitle}`,
                                color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM)],
                                footer: Hope.footer(message),
                            });
                            bot.createMessage(message.channel.id, { embed: embed.build() });
                        });
                }).catch(() => {
                    const embedFail = new Embed.EmbedBuilder({
                        title: "❌ Sorry!",
                        description: "Failed to play music",
                        color: Colors.Red,
                        footer: Hope.footer(message),
                    });
                    bot.createMessage(message.channel.id, { embed: embedFail.build() });
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
        }
    },
};