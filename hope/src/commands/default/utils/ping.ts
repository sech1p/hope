import Eris from "eris";
import Hope from "../../../Hope";
import Embed from "../../../utils/Embed";
import Config from "../../../Config";

export default {
    name: "ping",
    description: "🏓 Pong!",
    category: "default/Utils",
    usage: `${Config.Prefix}ping`,
    exampleUsage: `${Config.Prefix}ping`,
    subcommands: "N/A",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const startTime = Date.now();
        const ping = new Embed.EmbedBuilder({
            title: "🏓 Ping",
            description: "...",
            color: 0xFFFFFF,
            footer: Hope.footer(message),
        });
        const messageSent = await bot.createMessage(message.channel.id, { embed: ping.build() });

        const pong = new Embed.EmbedBuilder({
            title: "🏓 Ping",
            description: `Pong! ${Date.now() - startTime} ms`,
            color: 0xFFFFFF,
            footer: Hope.footer(message),
        });
        return await messageSent.edit({ embed: pong.build() });
    },
};