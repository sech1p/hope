import Eris from "eris";
import Config from "../../../Config";
import init from "../../../database/init";
import Hope from "../../../Hope";
import Embed from "../../../utils/Embed";
import Colors from "../../../utils/Colors";

export default {
    name: "fish",
    description: "🐟 Do fishing and earn 💸",
    category: "default/Economy",
    usage: `${Config.Prefix}fish`,
    exampleUsage: `${Config.Prefix}fish`,
    subcommands: "N/A",
    enabled: true,
    execute: (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        // TODO: add fishing rod

        const fishes: Array<string> = [
            "🍥",
            "🐟",
            "🐠",
            "🦈",
            "🐡",
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
            title: "Fish",
            description: `You caught ${
                fishes[Math.floor(Math.random() * fishes.length)]
            } and you earned ${earnedMoney} 💸`,
            color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
            footer: Hope.footer(message),
        });
        return bot.createMessage(message.channel.id, { embed: embed.build() });
    }
}