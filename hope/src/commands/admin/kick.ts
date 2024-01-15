import Eris, { DiscordRESTError } from "eris";
import Embed from "../../utils/Embed";
import Colors from "../../utils/Colors";
import Hope from "../../Hope";
import Config from "../../Config";

export default {
    name: "kick",
    description: "🦶 Kick someone from Guild",
    category: "Admin",
    usage: `${Config.Prefix}kick @user`,
    exampleUsage: `${Config.Prefix}queue`,
    subcommands: "N/A",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const user = args[0];
        const reason = args.slice(1).join(" ");
        if (user.startsWith("<@") && user.endsWith(">")) {
            const userId = user.slice(2, -1);
            const guild = bot.guilds.get(message.guildID);
            const member = guild.members.get(userId);
            try {
                await member.kick(reason);
                const embed = new Embed.EmbedBuilder({
                    title: "🦶 Kick",
                    description: `User ${user} has been successfully kicked for \`${reason}\``,
                    color: Colors.Green,
                    footer: Hope.footer(message),
                });
                await bot.createMessage(message.channel.id, { embed: embed.build() });
            } catch (exception) {
                const embedFail = new Embed.EmbedBuilder({
                    title: "❌ Sorry!",
                    description: "You don't have permissions to doing this",
                    color: Colors.Red,
                    footer: Hope.footer(message),
                })
                if (exception instanceof DiscordRESTError && exception.code == 50013) {
                    await bot.createMessage(message.channel.id, { embed: embedFail.build() });
                }
            }
        }
    },
};