import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const Token = process.env.TOKEN || "";
const GiphyToken = process.env.GIPHY_TOKEN || "";
const OwnerId = process.env.OWNER_ID || "";
const Prefix = process.env.PREFIX || "!";

export default {
    Token,
    GiphyToken,
    OwnerId,
    Prefix,
};