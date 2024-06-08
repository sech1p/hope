import Eris from "eris";
import Config from "../../../Config";
import Embed from "../../../utils/Embed";
import Colors from "../../../utils/Colors";
import {
    RiotApi,
    LolApi,
    Constants
} from "twisted";
import Hope from "../../../Hope";
import moment from "moment";

export default {
    name: "lol",
    description: "ℹ Information about League of Legends\nCurrently EUNE is available, more regions soon!",
    category: "default/Gaming",
    usage: `${Config.Prefix}lol`,
    exampleUsage: `${Config.Prefix}lol challenges MissF0rtunePL OwO`,
    subcommands: "challenges, match, status, summoner",
    enabled: true,
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const playerApi = new RiotApi();
        const api = new LolApi();

        const subcommand = args[0];
        switch (subcommand) {
            case "challenges": {
                const username = args[1];
                const tag = args[2];
                if (!username || !tag) {
                    const errorEmbed = new Embed.EmbedBuilder({
                        title: "❌ Error",
                        description: `Command usage: ${Config.Prefix}lol challenges <username> <tag>`,
                        color: Colors.Red,
                    });
                    return bot.createMessage(message.channel.id, { embed: errorEmbed.build() });
                }
                await playerApi.Account.getByRiotId(
                    username, tag, Constants.RegionGroups.EUROPE
                ).then(async data => {
                    await api.Challenges.PlayerChallenges(data.response.puuid, Constants.Regions.EU_EAST)
                    .then(data => {
                        const embed = new Embed.EmbedBuilder({
                            title: `Challenges of player ${username}#${tag}`,
                            fields: [
                                {
                                    name: "Category points",
                                    value: `Imagination: ${data.response.categoryPoints.IMAGINATION.current}/${data.response.categoryPoints.IMAGINATION.max}
Veterancy: ${data.response.categoryPoints.VETERANCY.current}/${data.response.categoryPoints.VETERANCY.max}
Teamwork: ${data.response.categoryPoints.TEAMWORK.current}/${data.response.categoryPoints.TEAMWORK.max}
Expertise: ${data.response.categoryPoints.EXPERTISE.current}/${data.response.categoryPoints.EXPERTISE.max}
Collection: ${data.response.categoryPoints.COLLECTION.current}/${data.response.categoryPoints.COLLECTION.max}`,
                                },
                                {
                                    name: "Preferences",
                                    value: `Banner accent: ${data.response.preferences.bannerAccent === "" ? "None" : data.response.preferences.bannerAccent}
Title: ${data.response.preferences.title ?? "None"}`,
                                },
                                {
                                    name: "Total points",
                                    value: `${data.response.totalPoints.current}/${data.response.totalPoints.max}`,
                                },
                            ],
                            color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                        });
                        bot.createMessage(message.channel.id, { embed: embed.build() });
                    });
                });
                break;
            }
            case "match": {
                const matchId = args[1];
                if (!matchId) {
                    const errorEmbed = new Embed.EmbedBuilder({
                        title: "❌ Error",
                        description: `Command usage: ${Config.Prefix}lol match <match id>`,
                        color: Colors.Red,
                    });
                    return bot.createMessage(message.channel.id, { embed: errorEmbed.build() });
                }
                api.MatchV5.get(matchId, Constants.RegionGroups.EUROPE)
                    .then(data => {
                        const embed = new Embed.EmbedBuilder({
                            title: `Details of match with ID ${matchId}`,
                            fields: [
                                {
                                    name: "Game creation time",
                                    value: moment(data.response.info.gameCreation).toString(),
                                },
                                {
                                    name: "Game creation time",
                                    value: moment.utc(moment.duration(
                                        data.response.info.gameDuration
                                    ).asMilliseconds()).format("HH:mm:ss.SSS").toString(),
                                },
                                {
                                    name: "Game ID",
                                    value: String(data.response.info.gameId)
                                },
                                {
                                    name: "Game mode",
                                    value: data.response.info.gameMode,
                                },
                                {
                                    name: "Game name",
                                    value: data.response.info.gameName,
                                },
                                {
                                    name: "Game type",
                                    value: data.response.info.gameType,
                                },
                                {
                                    name: "Game version",
                                    value: data.response.info.gameVersion,
                                },
                            ],
                            color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                        });
                        bot.createMessage(message.channel.id, { embed: embed.build() });
                    });
                break;
            }
            case "status": {
                api.StatusV4.get(Constants.Regions.EU_EAST)
                    .then(data => {
                        let locales: string = "";
                        let incidents: any = {
                            name: "Incidents",
                            value: `Archive at: ${data.response.incidents.archive_at}
Created at: ${data.response.incidents.created_at}
Id: ${data.response.incidents.id}
Severity: ${data.response.incidents.incident_severity}
Status: ${data.response.incidents.maintenance_status}
Platforms: ${data.response.incidents.platforms}
Titles: ${data.response.incidents.titles}
Updated at: ${data.response.incidents.updated_at}
Updates: ${data.response.incidents.updates}`,
                        };
                        let maintenances: any = {
                            name: "Maintenances",
                            value: `Archive at: ${data.response.maintenances.archive_at}
Created at: ${data.response.maintenances.created_at}
Id: ${data.response.maintenances.id}
Severity: ${data.response.maintenances.incident_severity}
Status: ${data.response.maintenances.maintenance_status}
Platforms: ${data.response.maintenances.platforms}
Titles: ${data.response.maintenances.titles}
Updated at: ${data.response.maintenances.updated_at}
Updates: ${data.response.maintenances.updates}`,
                        };
                        data.response.locales.forEach(locale => locales += `\`${locale}\` `);
                        const embed = new Embed.EmbedBuilder({
                            title: "EUNE server status",
                            fields: [
                                {
                                    name: "Server ID",
                                    value: data.response.id,
                                },
                                {
                                    name: "Server name",
                                    value: data.response.name
                                },
                                data.response.incidents.id === undefined ? { name: "Incidents", value: "None of incidents are present" } : incidents,
                                data.response.maintenances.id === undefined ? { name: "Maintenances", value: "None of maintenances are present" } : maintenances,
                                {
                                    name: "Locales",
                                    value: locales,
                                },
                            ],
                            color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                        });
                        bot.createMessage(message.channel.id, { embed: embed.build() });
                    });
                break;
            }
            case "summoner": {
                const accountId = args[1];
                if (!accountId) {
                    const errorEmbed = new Embed.EmbedBuilder({
                        title: "❌ Error",
                        description: `Command usage: ${Config.Prefix}lol summoner <account id>`,
                        color: Colors.Red,
                    });
                    return bot.createMessage(message.channel.id, { embed: errorEmbed.build() });
                }
                api.Summoner.getByAccountID(accountId, Constants.Regions.EU_EAST)
                    .then(data => {
                        const embed = new Embed.EmbedBuilder({
                            title: `Summoner ${data.response.name} information`,
                            fields: [
                                {
                                    name: "Account ID",
                                    value: data.response.accountId
                                },
                                {
                                    name: "Summoner ID",
                                    value: data.response.id,
                                },
                                {
                                    name: "Revision date",
                                    value: String(moment(data.response.revisionDate)),
                                },
                                {
                                    name: "Summoner Level",
                                    value: String(data.response.summonerLevel),
                                },
                            ],
                            color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                        });
                        bot.createMessage(message.channel.id, { embed: embed.build() });
                    });
                break;
            }
            default: {
                const defaultEmbed = new Embed.EmbedBuilder({
                    title: "❌ This command does not exists",
                    description: `For available commands check \`${Config.Prefix}help\``,
                    footer: Hope.footer(message),
                });
                return bot.createMessage(message.channel.id, { embed: defaultEmbed.build() });
            }
        }
    },
};