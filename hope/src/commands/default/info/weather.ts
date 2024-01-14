import * as weather from "weather-js";
import Embed from "../../../utils/Embed";
import Hope from "../../../Hope";

export default {
    name: "weather",
    description: "Show weather for any city/country",
    execute: async (bot, message, args) => {
        const locationArgument = args[0];
        weather.find({
            search: locationArgument,
            degreeType: "C",
        }, (exception, result) => {
            if (exception) console.error(exception);

            result = result[0];
            const embed = new Embed.EmbedBuilder({
                author: {
                    name: "sech1p",
                },
                title: `Weather for ${result.location.name}`,
                description: result.current.skytext,
                color: (
                    JSON.stringify(result.current.temperature).includes("-") ?
                        0x0000FF : 0xFFFF00),
                fields: [
                    {
                        name: "Temperature",
                        value: `${result.current.temperature} Celsius`,
                    },
                    {
                        name: "Feel temperature",
                        value: `${result.current.feelslike} Celsius`,
                    },
                    {
                        name: "Wind",
                        value: result.current.winddisplay,
                    },
                ],
                thumbnail: {
                    url: result.current.imageUrl,
                },
                footer: Hope.footer(message),
            });
            bot.createMessage(message.channel.id, { embed: embed.build() });
        });
    },
};