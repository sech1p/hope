import Eris from "eris";
import Embed from "../../../utils/Embed";
import Colors from "../../../utils/Colors";
import Config from "../../../Config";
import Hope from "../../../Hope";
import init from "../../../database/init";

export default {
    name: "work",
    description: "👨‍🏭 work",
    category: "default/Economy",
    usage: `${Config.Prefix}work`,
    exampleUsage: `${Config.Prefix}queue`,
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
                    const existingMoneyQuery = {
                        text: `SELECT "money"
                               FROM users
                               WHERE "userID" = $1;`,
                        values: [message.author.id],
                    };
                    
                    await init.initServer(Hope.postgreClient, server.name, guildID);
                    const existingMoneyResult = await Hope.postgreClient.query(existingMoneyQuery);
                    const existingMoney = existingMoneyResult.rows[0]?.money || 0;
                    
                    let query;
                    if (existingMoney == null || existingMoney === 0) {
                        query = {
                            text: `INSERT INTO users ("userID", "money", "guildID")
                                   VALUES ($1, $2, $3)
                                   ON CONFLICT ("userID", "guildID") 
                                   DO UPDATE SET "money" = COALESCE(users."money", 0) + $2
                                   RETURNING *;`,
                            values: [message.author.id, earnedMoney, guildID],
                        };                        
                    } else {
                        query = {
                            text: `UPDATE users
                                SET "xp" = "xp", "money" = "money" + $1
                                WHERE "userID" = $2 AND "guildID" = $3
                                RETURNING "money";`,
                            values: [earnedMoney, message.author.id, guildID],
                        };
                    }
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