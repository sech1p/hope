import Eris from "eris";
import Embed from "../../../utils/Embed";
import Hope from "../../../Hope";
import moment from "moment";
import Colors from "../../../utils/Colors";
import Config from "../../../Config";

export default {
    name: "serverinfo",
    description: "📝 Get informations about Guild",
    category: "default/Utils",
    usage: `${Config.Prefix}queue`,
    exampleUsage: `${Config.Prefix}queue`,
    subcommands: "N/A",
    execute: (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const guild = bot.guilds.get(message.guildID);
        const embed = new Embed.EmbedBuilder({
            author: {
                name: guild.name,
                icon_url: guild.iconURL,
            },
            fields: [
                {
                    name: "🎂 Guild cake day",
                    value: moment(guild.createdAt).format("LLLL"),
                },
                {
                    name: "Guild owner",
                    value: `<@${guild.ownerID}>`,
                },
                {
                    name: "Member count",
                    value: String(guild.memberCount),
                },
                {
                    name: "Locale",
                    value: guild.preferredLocale,
                },
                {
                    name: "NSFW?",
                    value: guild.nsfw ? "🔞": "No",
                },
            ],
            color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
            footer: Hope.footer(message),
        });
        bot.createMessage(message.channel.id, { embed: embed.build() });
    },
};