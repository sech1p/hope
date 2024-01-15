import Eris from "eris";
import Config from "../../Config";
import Hope from "../../Hope";
import Colors from "../../utils/Colors";
import Embed from "../../utils/Embed";

// TODO: fix broken eval();

export default {
    name: "eval",
    description: "🤖 Evaluate code (**BOT OWNER ONLY**)",
    category: "Dev",
    usage: `${Config.Prefix}eval [code]`,
    exampleUsage: `${Config.Prefix}eval 2+2`,
    subcommands: "N/A",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
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

        const embed = new Embed.EmbedBuilder({
            title: "Result",
            description: `\`\`\`javascript\n${result}\`\`\``,
            color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
            footer: Hope.footer(message),
        })
        bot.createMessage(message.channel.id, { embed: embed.build() });
    },
};