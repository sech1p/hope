import Config from "../../../Config";
import Eris from "eris";
import TIO from "../../../../packages/tio-api/min-tioapi"
import languageIds from "../../../../packages/tio-api/extra/ids"

export default {
    name: "code",
    description: "💻 Code in everything you want! (powered by tio.run)",
    category: "default/Programming",
    usage: `${Config.Prefix}code [language || language-list] [code]`,
    exampleUsage: `${Config.Prefix}code python3 print "owo"`,
    subcommands: "language-list",
    enabled: true,
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const argument = args[0];
        const code = args.slice(1).join(" ");
        const memberID = await bot.getDMChannel(message.member.id);
        let result: string;
        if (argument === "language-list") {
            for (const language in languageIds) {
                result += `${languageIds[language]}\n`;
            }
            bot.createMessage(memberID.id, `\`\`\`${result.substring(0, 1990)}\`\`\``);
            bot.createMessage(memberID.id, `\`\`\`${result.substring(1990, 3980)}\`\`\``);
            return bot.createMessage(memberID.id, `\`\`\`${result.substring(3980)}\`\`\``);
        } else {
            await TIO.run(code, "", argument)
                .then(result => {
                    bot.createMessage(message.channel.id, `\`\`\`${result[0]}
                    ${result}\`\`\``)
                });
        }
    },
};