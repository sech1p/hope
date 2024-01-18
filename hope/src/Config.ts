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
const YoutubeKey: string = process.env.YOUTUBE_API_KEY || "";
const SoundcloudClientID: string = process.env.SOUNDCLOUD_CLIENT_ID || "";
const DatabaseUser: string = process.env.DATABASE_USER || "";
const DatabaseHost: string = process.env.DATABASE_HOST || "";
const DatabaseName: string = process.env.DATABASE_NAME || "";
const DatabasePassword: string = process.env.DATABASE_PASSWORD || "";
const DatabasePort: number = Number(process.env.DATABASE_PORT) || 5432;
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
    YoutubeKey,
    SoundcloudClientID,
    DatabaseUser,
    DatabaseHost,
    DatabaseName,
    DatabasePassword,
    DatabasePort,
    Prefix,
};