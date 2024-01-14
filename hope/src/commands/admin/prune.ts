import { DiscordRESTError } from "eris";
import Embed from "../../utils/Embed";
import Colors from "../../utils/Colors";
import Hope from "../../Hope";

export default {
    name: "prune",
    description: "🗑 Prune message(s) from Guild",
    execute: async (bot, message, args) => {
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

        let messageCount = args[0];
        if (isNaN(messageCount)) {
            return bot.createMessage(message.channel.id, { embed: errorEmbed(`\`${messageCount}\` is not a valid number`) });
        }

        messageCount = parseInt(messageCount);
        if (!messageCount || messageCount < 1) {
            return bot.createMessage(message.channel.id, { embed: errorEmbed("Please insert a number") });
        }
        if (messageCount > 100) {
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