import Eris from "eris";
import Hope from "../Hope";

export default {
    name: "ready",
    run: (bot: Eris.Client) => {
        Hope.log("🌸 Bot is ready!");
        bot.editStatus("dnd", {
            name: "h!help",
            type: 0,
            url: "https://sech1p.ovh",
        });
    },
};