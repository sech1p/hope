import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const Token = process.env.TOKEN || "";
const GiphyToken = process.env.GIPHY_TOKEN || "";
const OwnerId = process.env.OWNER_ID || "";
const McApi = process.env.MC_API || "https://mcapi.us/server/status";
const McSkinApi = process.env.MC_SKIN_API || "https://starlightskins.lunareclipse.studio/skin-render";
const osuApiKey = process.env.OSU_API_KEY || "";
const Prefix = process.env.PREFIX || "!";

export default {
    Token,
    GiphyToken,
    OwnerId,
    McApi,
    McSkinApi,
    osuApiKey,
    Prefix,
};