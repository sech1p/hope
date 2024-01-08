import Embed from "../../../utils/Embed";

export default {
    name: "8ball",
    description: "Ask magic ball about everything",
    execute: async (bot, message, args) => {
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
        });
        const newEmbed = new Embed.EmbedBuilder({
            title: "🎱 Magic 8ball",
            description: `${responses[randomNumber]}`,
        });
        const messageSent = await bot.createMessage(message.channel.id, { embed: embed.build() });
        messageSent.edit({ embed: newEmbed.build() });
    },
};