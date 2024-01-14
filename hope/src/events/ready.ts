import Eris from "eris";
import Hope from "../Hope";

export default {
    name: "ready",
    run: (bot: Eris.Client) => {
        Hope.log("🌸 Bot is ready!");
    },
};