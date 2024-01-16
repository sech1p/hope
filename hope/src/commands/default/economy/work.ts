import Eris from "eris";
import Embed from "../../../utils/Embed";
import Colors from "../../../utils/Colors";
import Config from "../../../Config";
import Hope from "../../../Hope";
import init from "../../../database/init";
import srv from "../../../database/server";

export default {
    name: "work",
    description: "👨‍🏭 work",
    category: "default/Economy",
    usage: `${Config.Prefix}work`,
    exampleUsage: `${Config.Prefix}work`,
    subcommands: "N/A",
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const professions = [
            "Artist",
            "Barber",
            "Butcher",
            "Driver",
            "Lawyer",
            "IT Engineer",
            "Speaker",
            "Whore",
        ];

        const earnedMoney = Math.floor(Math.random() * 6);
        const guildID = message.guildID;
        bot.guilds.forEach(async server => {
            if (server.id === guildID) {
                if (server.id.match(guildID)) {
                    const query = {
                        text: `UPDATE users
                        SET "money" = "money" + $1
                        WHERE "userID" = $2
                        RETURNING *;`,
                        values: [earnedMoney, message.author.id],
                    };
                    await init.initServer(Hope.postgreClient, server.name, guildID);
                    await srv.PutIntoUsers(Hope.postgreClient, message);
                    await Hope.postgreClient.query(query);
                }
            }
        });

        const embed = new Embed.EmbedBuilder({
            title: "Work",
            description: `You worked as ${
                professions[Math.floor(Math.random() * professions.length)]
            } and you earned ${earnedMoney} 💸`,
            color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
            footer: Hope.footer(message),
        });
        return bot.createMessage(message.channel.id, { embed: embed.build() });
    },
};