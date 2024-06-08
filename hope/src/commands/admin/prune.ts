import Eris, { DiscordRESTError } from "eris";
import Embed from "../../utils/Embed";
import Colors from "../../utils/Colors";
import Hope from "../../Hope";
import Config from "../../Config";

export default {
    name: "prune",
    description: "🗑 Prune message(s) from Guild",
    category: "Admin",
    usage: `${Config.Prefix}prune [amount]`,
    exampleUsage: `${Config.Prefix}prune 50`,
    subcommands: "N/A",
    enabled: true,
    execute: async (bot: Eris.Client, message, args: string[]) => {
        const errorEmbed = (message) => {
            const embedFail = new Embed.EmbedBuilder({
                title: "❌ Sorry!",
                description: message,
                color: Colors.Red,
                footer: Hope.footer(message),
            });
            return embedFail.build();
        };

        const permission = message.channel.permissionsOf(bot.user.id).json;

        if (!permission.manageMessages) {
            return bot.createMessage(message.channel.id, { embed: errorEmbed("I don't have a permission") });
        }

        let messageCount: string | number = args[0];
        if (isNaN(Number(messageCount))) {
            return bot.createMessage(message.channel.id, { embed: errorEmbed(`\`${messageCount}\` is not a valid number`) });
        }

        messageCount = parseInt(messageCount);
        if (!messageCount || Number(messageCount) < 1) {
            return bot.createMessage(message.channel.id, { embed: errorEmbed("Please insert a number") });
        }
        if (Number(messageCount) > 100) {
            return bot.createMessage(message.channel.id, { embed: errorEmbed("Too many messages") });
        }

        await message.delete();

        message.channel.purge({ limit: messageCount })
            .then(amount => {
            })
            .catch(exception => {
            });
    },
};