import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const Token: string = process.env.TOKEN || "";
const GiphyToken: string = process.env.GIPHY_TOKEN || "";
const OwnerId: string = process.env.OWNER_ID || "";
const McApi: string = process.env.MC_API || "https://mcapi.us/server/status";
const McSkinApi: string = process.env.MC_SKIN_API || "https://starlightskins.lunareclipse.studio/skin-render";
const osuApiKey: string = process.env.OSU_API_KEY || "";
const MALApiKey: string = process.env.MAL_API_KEY || "";
const MALLogin: string = process.env.MAL_LOGIN || "";
const MALPassword: string = process.env.MAL_PASSWORD || "";
const AniListKey: string = process.env.ANILIST_API_KEY || "";
const DanbooruLogin: string = process.env.DANBOORU_LOGIN || "";
const DanbooruKey: string = process.env.DANBOORU_API_KEY || "";
const Prefix: string = process.env.PREFIX || "!";

export default {
    Token,
    GiphyToken,
    OwnerId,
    McApi,
    McSkinApi,
    osuApiKey,
    MALApiKey,
    MALLogin,
    MALPassword,
    AniListKey,
    DanbooruLogin,
    DanbooruKey,
    Prefix,
};