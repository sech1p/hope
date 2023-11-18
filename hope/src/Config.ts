import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const Token = process.env.TOKEN || "";
const Prefix = process.env.PREFIX;

export default {
    Token,
    Prefix,
};