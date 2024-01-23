import Eris from "eris";
import Embed from "../../utils/Embed";
import Colors from "../../utils/Colors";

export default {
    name: "messageUpdate",
    run: (bot: Eris.Client, message: Eris.Message) => {
        bot.on("messageUpdate", (_, oldMessage: Eris.OldMessage) => {
            const embed = new Embed.EmbedBuilder({
                title: "✏️ Message updated",
                description: `**Author**: <@${message.author.id}> (${message.author.id})
                **Old message**: \`\`\`${oldMessage.content}\`\`\`
                **New message**: \`\`\`${message.content}\`\`\``,
                color: Colors.Gray,
            });
            if (message.author.id !== bot.user.id)
                return bot.createMessage(message.channel.id, { embed: embed.build() });
        });
    },
};