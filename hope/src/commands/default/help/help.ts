import Embed from "../../../utils/Embed";

export default {
    name: "help",
    description: "Display help",
    execute: async (bot, message, args) => {
        const user = args[0];
        const embed = new Embed.EmbedBuilder({
            author: {
                name: "sech1p",
            },
            title: "Embed Builder",
            description: "This is an embed builder.",
            color: 0xFF0000,
            fields: [
                {
                    name: "Field 1",
                    value: "Value 1",
                },
                {
                    name: "Field 2",
                    value: "Value 2",
                },
                {
                    name: "Field 3",
                    value: "Value 3",
                },
            ],
        });
        bot.createMessage(message.channel.id, { embed: embed.build() });
    },
};