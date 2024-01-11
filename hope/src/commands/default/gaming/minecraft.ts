import Embed from "../../../utils/Embed";
import Minecraft from "../../../utils/Minecraft";
import Colors from "../../../utils/Colors";
import Config from "../../../Config";

export default {
    name: "minecraft",
    description: "",
    execute: (bot, message, args) => {
        const argument = args[0];
        switch (argument) {
            case "server":
                const serverArgument = args[1];
                Minecraft.server(serverArgument)
                    .then(server => {
                        let description, embed;
                        if (server.status !== "error") {
                            if (server.motd_json.extra) {
                                for (let i of server.motd_json.extra) {
                                    description += i.text;
                                }
                            } else {
                                description = server.motd || server.motd_json;
                            }
                            
                            embed = new Embed.EmbedBuilder({
                                title: `Stats for ${serverArgument}`,
                                description: "Server is online",
                                color: Colors.Green,
                                fields: [
                                    {
                                        name: "Description",
                                        value: `\`\`\`fix\n${description !== null ? description.replaceAll("undefined", "") : ""}\`\`\``,
                                    },
                                    {
                                        name: "Players",
                                        value: `${server.players.now} / ${server.players.max}`,
                                    },
                                    {
                                        name: "Minecraft version",
                                        value: `${server.server.name} (protocol ${server.server.protocol})`,
                                    },
                                ],
                            });
                        }

                        const embedFail = new Embed.EmbedBuilder({
                            title: `Stats for ${serverArgument}`,
                            description: "Server is offline",
                            color: Colors.Red,
                        });

                        server.online ?
                            bot.createMessage(message.channel.id, { embed: embed.build() }) :
                            bot.createMessage(message.channel.id, { embed: embedFail.build() });
                    });
                break;
            case "user":
                const userArgument = args[1];
                bot.createMessage(message.channel.id, `${Config.McSkinApi}/walking/${userArgument}/full`);
                break;
            default:
                const defaultEmbed = new Embed.EmbedBuilder({
                    title: "❌ This command does not exists",
                    description: `For available commands check \`${Config.Prefix}help\``,
                });
                bot.createMessage(message.channel.id, { embed: defaultEmbed.build() });
                break;
        }
    },
};