import Eris from "eris";
import Hope from "../../../Hope";
import Embed from "../../../utils/Embed";

export default {
    name: "uptime",
    description: "⏰ Show uptime for bot",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const days = Math.floor(process.uptime() / 86400);
        const hours = Math.floor(process.uptime() / 3600);
        const minutes = Math.floor(process.uptime() / 60);
        const seconds = Math.floor(process.uptime() % 60);
        const osDays = Math.floor(require("os").uptime() / 86400);
        const osHours = Math.floor(require("os").uptime() / 3600);

        const embed = new Embed.EmbedBuilder({
            title: "⏲ Uptime",
            color: 0xFFFFFF,
            fields: [
                {
                    name: "Bot uptime",
                    value: `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`,
                },
                {
                    name: "OS uptime",
                    value: `${osDays} days, ${osHours} hours`,
                },
            ],
            footer: Hope.footer(message),
        });

        bot.createMessage(message.channel.id, { embed: embed.build() });
    },
};