import { DiscordHTTPError, DiscordRESTError } from "eris";
import Embed from "../../utils/Embed";
import Colors from "../../utils/Colors";

export default {
    name: "ban",
    description: "🔨 Ban someone from Guild",
    execute: async (bot, message, args) => {
        const user = args[0];
        const reason = args.slice(1).join(" ");
        if (user.startsWith("<@") && user.endsWith(">")) {
            const userId = user.slice(2, -1);
            const member = message.channel.guild.members.get(userId);
            try {
                await member.ban(0, reason);
                const embed = new Embed.EmbedBuilder({
                    title: "🔨 Ban",
                    description: `User ${user} has been successfully banned for \`${reason}\``,
                    color: Colors.Green,
                });
                await bot.createMessage(message.channel.id, { embed: embed.build() });
            } catch (exception) {
                const embedFail = new Embed.EmbedBuilder({
                    title: "❌ Sorry!",
                    description: "You don't have permissions to doing this",
                    color: Colors.Red,
                });
                if (exception instanceof DiscordRESTError && exception.code == 50013) {
                    await bot.createMessage(message.channel.id, { embed: embedFail.build() });
                }
            }
        }
    },
};