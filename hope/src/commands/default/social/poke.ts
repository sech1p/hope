export default {
    name: "poke",
    description: "Poke someone!",
    execute: async (bot, message, args) => {
        const user = args[0];
        bot.createMessage(message.channel.id, `Poked ${user}!`);
    },
};