import Eris from "eris";
import Config from "../../../Config";
import Embed from "../../../utils/Embed";
import Hope from "../../../Hope";
import Colors from "../../../utils/Colors";
import * as osUtils from "node-os-utils";
const { version } = require("../../../../package.json");

export default {
    name: "about",
    description: "ℹ Information about bot",
    category: "default/Utils",
    usage: `${Config.Prefix}about`,
    exampleUsage: `${Config.Prefix}about`,
    subcommands: "N/A",
    execute: (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const cpu = osUtils.cpu;
        const mem = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100 / 100);

        let usersCount = 0;
        bot.guilds.forEach(guild => usersCount += guild.memberCount);

        cpu.usage()
            .then(cpu => {
                const embed = new Embed.EmbedBuilder({
                    author: {
                        name: "About Hope",
                        icon_url: bot.user.avatarURL,
                    },
                    description: `Hope is a multifunctional and powerful bot for Discord.
                    Features economy, gaming, starboard, custom commands and many more~`,
                    fields: [
                        {
                            name: "Guilds",
                            value: String(bot.guilds.size),
                            inline: true,
                        },
                        {
                            name: "Users",
                            value: `${String(usersCount)} total`,
                            inline: true,
                        },
                        {
                            name: "Process",
                            value: `${mem} MB
                            ${cpu} % CPU`,
                            inline: true,
                        },
                        {
                            name: "Node.js version",
                            value: String(process.version),
                            inline: true,
                        },
                        {
                            name: "Hope version",
                            value: version,
                            inline: true,
                        },
                    ],
                    color: Colors.Pink,
                    footer: Hope.footer(message),
                });
                return bot.createMessage(message.channel.id, {
                    embed: embed.build(),
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    type: 2,
                                    label: "Website",
                                    style: 5,
                                    url: "https://sech1p.ovh/#hopebot", // placeholder
                                },
                            ],
                        },
                        {
                            type: 1,
                            components: [
                                {
                                    type: 2,
                                    label: "Repository",
                                    style: 5,
                                    url: "https://github.com/sech1p/hope"
                                },
                            ],
                        },
                    ],
                });
            });
    },
};