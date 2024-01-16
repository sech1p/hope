import Eris from "eris";
import Embed from "../../../utils/Embed";
import Hope from "../../../Hope";
import Colors from "../../../utils/Colors";
import Config from "../../../Config";

// TODO: make this trashcode better
// by rewriting it to commands extension for Eris.Client

const removeDuplicates = (array: Array<string>) => {
    return [...new Set(array)];
};

const findIndexes = (array: Array<string>, searchedPhrase: string) => {
    let list = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].indexOf(searchedPhrase) != -1) {
            list.push(i);
        }
    }
    return list;
};

export default {
    name: "help",
    description: "Display help",
    category: "default/Help",
    usage: `${Config.Prefix}help [command?]`,
    exampleUsage: `${Config.Prefix}help help`,
    subcommands: "N/A",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        let commands = {
            name: [],
            description: [],
            category: [],
            usage: [],
            exampleUsage: [],
            subcommands: [],
        };
        let fields = [];

        Hope.commands.forEach(command => {
            commands.name.push(command.name);
            commands.description.push(command.description);
            commands.category.push(command.category.toLowerCase());
            commands.usage.push(command.usage);
            commands.exampleUsage.push(command.exampleUsage);
            commands.subcommands.push(command.subcommands);
        });

        removeDuplicates(commands.category).forEach(category => {
            let categoryCommand, values = [];
            categoryCommand = category;
            if (!category.split("/")[1]) {
                category = category;
            } else {
                category = category.split("/")[1];
            }
            findIndexes(commands.category, categoryCommand).forEach(category => {
                values.push(`\`${commands.name[category]}\``);
            });
            category = category[0].toUpperCase() + category.substring(1, category.length);
            fields.push({
                name: category,
                value: values.join(", "),
            });
        });

        const argument = args[0];
        if (argument) {
            const commandIndex = findIndexes(commands.name, argument)[0];
            const commandEmbed = new Embed.EmbedBuilder({
                title: `❓ ${commands.name[commandIndex]} help`,
                description: `
                **Description**: ${commands.description[commandIndex]}
                **Usage**: \`${commands.usage[commandIndex]}\`
                **Example usage**: \`${commands.exampleUsage[commandIndex]}\`
                **Subcommands**: \`\`\`${commands.subcommands[commandIndex]}\`\`\``,
                color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                footer: Hope.footer(message),
            });
            return bot.createMessage(message.channel.id, { embed: commandEmbed.build() });
        } else {
            const embed = new Embed.EmbedBuilder({
                title: "❓ Help",
                color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                fields: fields,
                footer: Hope.footer(message),
            });
            return bot.createMessage(message.channel.id, { embed: embed.build() });
        }
    },
};