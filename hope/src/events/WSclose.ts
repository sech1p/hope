import Hope from "../Hope";

export default {
    name: "ready",
    run: (bot) => {
        Hope.logError("✖ WebSocket is closed (check your internet connection)");
    },
};