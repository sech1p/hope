import Config from "../../Config";
import Embed from "../../utils/Embed";

export default {
    name: "eval",
    description: "🤖 Evaluate code (**BOT OWNER ONLY**)",
    execute: async (bot, message, args) => {
        if (message.author.id !== Config.OwnerId) {
            return bot.createMessage(message.channel.id, "❌ You are not priviliged to use this command!");
        }
        let result, code;

        const codeMatch = message.content.match(/^!eval\s*```(?:js|javascript)?\s*([\s\S]+?)\s*```$/);
        if (!codeMatch) {
            code = args.toString();
        } else {
            code = codeMatch[1];
        }

        try {
            result = eval(code);
        } catch (exception) {
            result = exception;
        }
        bot.createMessage(message.channel.id, `Result: \`\`\`javascript\n${result}\`\`\``);
    },
};