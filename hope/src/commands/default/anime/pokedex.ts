import Eris from "eris";
import Config from "../../../Config";
import PokeAPI from "pokeapi-typescript";
import Embed from "../../../utils/Embed";
import _ from "lodash";
import Colors from "../../../utils/Colors";
import Hope from "../../../Hope";

export default {
    name: "pokedex",
    description: "⚡ Gotta Catch 'Em all?",
    category: "default/Anime",
    usage: `${Config.Prefix}pokedex [pokemon_name]`,
    exampleUsage: `${Config.Prefix}pokedex Pikachu`,
    subcommands: "N/A",
    enabled: true,
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        const pokemonArgument: string = args[0];

        await PokeAPI.Pokemon.resolve(pokemonArgument)
            .then(pokemon => {
                let abilities = [], stats = [];

                for (const ability of pokemon.abilities)
                    abilities.push(_.capitalize(ability.ability.name.replaceAll("-", " ")));
                for (const stat of pokemon.stats) {
                    stats.push(`${stat.stat.name.toUpperCase().replaceAll("-", " ")}: **${stat.base_stat}**`);
                }
                const embed = new Embed.EmbedBuilder({
                    title: `#${pokemon.id} - ${_.startCase(pokemon.name)}`,
                    thumbnail: {
                        url: pokemon.sprites.front_default,
                    },
                    fields: [
                        {
                            name: "Abilities",
                            value: abilities.join(", "),
                            inline: true,
                        },
                        {
                            name: "Weight",
                            value: String(pokemon.weight),
                            inline: true,
                        },
                        {
                            name: "Base experience",
                            value: String(pokemon.base_experience),
                            inline: true,
                        },
                        {
                            name: "Stats",
                            value: stats.join("\n"),
                        },
                    ],
                    color: Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
                    footer: Hope.footer(message),
                });
                bot.createMessage(message.channel.id, { embed: embed.build() });
            })
            .catch(() => {
                const embedFail = new Embed.EmbedBuilder({
                    title: "❌ Sorry!",
                    description: "Provided Pokemon does not exists (or maybe you did a typo?)",
                    color: Colors.Red,
                    footer: Hope.footer(message),
                });
                bot.createMessage(message.channel.id, { embed: embedFail.build() });
            });
    },
};