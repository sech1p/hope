import Embed from "../../../utils/Embed";

export default {
    name: "ping",
    description: "🏓 Pong!",
    execute: async (bot, message, args) => {
        const startTime = Date.now();
        const ping = new Embed.EmbedBuilder({
            title: "🏓 Ping",
            description: "...",
            color: 0xFFFFFF,
        });
        const messageSent = await bot.createMessage(message.channel.id, { embed: ping.build() });

        const pong = new Embed.EmbedBuilder({
            title: "🏓 Ping",
            description: `Pong! ${Date.now() - startTime} ms`,
            color: 0xFFFFFF,
        });
        return await messageSent.edit({ embed: pong.build() });
    },
};