import Config from "../../../Config";
import Hope from "../../../Hope";
import Colors from "../../../utils/Colors";
import Embed from "../../../utils/Embed";

export default {
    name: "genshin",
    description: "Genshin Impact",
    execute: async (bot, message, args) => {
        const argument = args[0];
        switch (argument) {
            case "user":
                const userArgument = args[0];
                Hope.genshinApi.fetchUser(userArgument)
                    .then(user => {
                        let costumes = [];
                        user.charactersPreview.forEach(character => costumes.push(`${character.costume._nameId} (level ${character.level})`));
                        const embed = new Embed.EmbedBuilder({
                            title: `Profile for ${user.nickname}`,
                            fields: [
                                {
                                    name: "Level",
                                    value: String(user.level),
                                },
                                {
                                    name: "Achievements",
                                    value: String(user.achievements),
                                },
                                {
                                    name: "Characters",
                                    value: costumes.toString().split(",").join(", "),
                                }
                            ],
                            color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                        });
                        bot.createMessage(message.channel.id, { embed: embed.build() });
                    }).catch(() => {
                        const embedFail = new Embed.EmbedBuilder({
                            title: "❌ Sorry!",
                            description: "Provided user does not exists",
                            color: Colors.Red,
                        });
                        return bot.createMessage(message.channel.id, { embed: embedFail.build() });
                    });
                break;
            case "weapons":
                const weaponArgument = args.slice(1).join(" ");
                if (!weaponArgument) {
                    const embedUsage = new Embed.EmbedBuilder({
                        title: "❌ Please insert an weapon",
                        description: "For list of weapons check: https://genshin-impact.fandom.com/wiki/Weapon",
                    });
                    return bot.createMessage(message.channel.id, { embed: embedUsage.build() });
                }
                const weapons = Hope.genshinApi.getAllWeapons();
                for (const weapon of weapons) {
                    if (weapon.name.get().includes(weaponArgument)) {
                        const refinement = weapon.refinements[0];
                        const embed = new Embed.EmbedBuilder({
                            title: `${weapon.name.get()}`,
                            description: refinement ? `**${refinement.name.get()}**: ${refinement.description.get().replace(/<[^>]+>/g, "")}` : "No refinement",
                            color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                        });
                        return bot.createMessage(message.channel.id, { embed: embed.build() });
                    }
                }
                break;
            default:
                const defaultEmbed = new Embed.EmbedBuilder({
                    title: "❌ This command does not exists",
                    description: `For available commands check \`${Config.Prefix}help\``,
                });
                return bot.createMessage(message.channel.id, { embed: defaultEmbed.build() });
                break;
            }
    },
};