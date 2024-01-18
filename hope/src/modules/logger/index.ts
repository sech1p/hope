import Eris from "eris";
import messageDelete from "./messageDelete";
import messageDeleteBulk from "./messageDeleteBulk";
import messageUpdate from "./messageUpdate";

export default {
    name: "logger",
    enabled: false,
    run: async (bot: Eris.Client, message: Eris.Message) => {
        messageDelete.run(bot, message);
        messageDeleteBulk.run(bot, message);
        messageUpdate.run(bot, message);
    },
};