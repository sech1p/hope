import Eris from "eris";
import Config from "../../../Config";

export default {
    name: "queue",
    description: "queue",
    category: "default/Music",
    usage: `${Config.Prefix}queue [page?]`,
    exampleUsage: `${Config.Prefix}queue`,
    subcommands: "N/A",
    enabled: true,
    execute: async (bot: Eris.Client, message: Eris.Message, args: string[]) => {
        //
    },
};