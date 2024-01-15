import Eris from "eris";
import Hope from "../../../Hope";
import Colors from "../../../utils/Colors";
import Embed from "../../../utils/Embed";
import Config from "../../../Config";

export default {
    name: "8ball",
    description: "Ask magic ball about everything",
    category: "default/Fun",
    usage: `${Config.Prefix}8ball [answer]`,
    exampleUsage: `${Config.Prefix}8ball I am cool?`,
    subcommands: "N/A",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const responses = [
            "Yes!",
            "Nope",
            "No",
            "Maybe...",
            "NEVER",
        ];
        const randomNumber = Math.floor(Math.random() * responses.length);
        const embed = new Embed.EmbedBuilder({
            title: "🎱 Magic 8ball",
            description: "Thinking...",
            color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
            footer: Hope.footer(message),
        });
        const newEmbed = new Embed.EmbedBuilder({
            title: "🎱 Magic 8ball",
            description: `${responses[randomNumber]}`,
            color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
            footer: Hope.footer(message),
        });
        const messageSent = await bot.createMessage(message.channel.id, { embed: embed.build() });
        messageSent.edit({ embed: newEmbed.build() });
    },
};