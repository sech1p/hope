import Eris from "eris";
import Embed from "../../utils/Embed";
import Colors from "../../utils/Colors";

export default {
    name: "messageDelete",
    run: (bot: Eris.Client, message: Eris.Message) => {
        bot.on("messageDelete", async msg => {
            const embed = new Embed.EmbedBuilder({
                title: "🗑 Message deleted",
                description: `Author: <@${message.author.id}> (${message.author.id})
                Content: \`\`\`${message.content}\`\`\`
                Deleted on: <#${msg.channel.id}>`,
                color: Colors.Gray,
            });
            if (message.author.id !== bot.user.id)
                return bot.createMessage(message.channel.id, { embed: embed.build() });
        });
    }
}