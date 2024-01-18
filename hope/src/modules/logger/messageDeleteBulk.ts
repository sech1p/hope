import Eris from "eris";
import Embed from "../../utils/Embed";
import Colors from "../../utils/Colors";

export default {
    name: "messageDelete",
    run: (bot: Eris.Client, message: Eris.Message) => {
        bot.on("messageDeleteBulk", msg => {
            const embed = new Embed.EmbedBuilder({
                title: "🗑 Messages deleted (by bulk)",
                description: `**Invoker**: <@${message.author.id}>
                **Channel ID**: <#${msg[0].channel.id}>
                **Iterations of bulk**: ${msg.length}`,
                color: Colors.Gray,
            });
            return bot.createMessage(message.channel.id, { embed: embed.build() });
        });
    },
};