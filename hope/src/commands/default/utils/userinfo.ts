import Eris from "eris";
import Config from "../../../Config";
import Embed from "../../../utils/Embed";
import Hope from "../../../Hope";
import moment from "moment";
import Colors from "../../../utils/Colors";

export default {
    name: "userinfo",
    description: "👤 Get informations about User",
    category: "default/Utils",
    usage: `${Config.Prefix} [user?]`,
    exampleUsage: `${Config.Prefix} @user`,
    subcommands: "N/A",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const userArgument = args[0];
        const user = userArgument ? userArgument : message.member.mention;
        const userData = userArgument ?
            bot.users.get(message.mentions[0].id) : bot.users.get(message.member.id);
        const avatar = !userData.avatarURL ?
            "https://cdn.discordapp.com/embed/avatars/0.png" : userData.avatarURL;
        const banner = !userData.bannerURL ?
            "https://dummyimage.com/500x200" : userData.bannerURL;
        const embed = new Embed.EmbedBuilder({
            thumbnail: {
                url: avatar,
            },
            description: `👤 ${user} info`,
            fields: [
                {
                    name: "User",
                    value: userData.username
                },
                {
                    name: "ID",
                    value: userData.id,
                },
                {
                    name: "Bot?",
                    value: userData.bot ? "Yes" : "No",
                },
                {
                    name: "Joined at",
                    value: moment(userData.createdAt).format("LLLL"),
                },
            ],
            image: {
                url: banner,
            },
            color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
            footer: Hope.footer(message),
        });
        bot.createMessage(message.channel.id, { embed: embed.build() });
    },
};