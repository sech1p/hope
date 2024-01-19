import express, { Application } from "express";
import * as dotenv from "dotenv";
import setupRoutes from "./routes/routes";
import morgan from "morgan";
import cors from "cors";
import setupApiRoutes from "./routes/api.routes";
import Hope from "../Hope";
import path from "path";

dotenv.config();

const app: Application = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 10000,
}));

app.use(express.static(path.join(__dirname, "public")));
app.use("/bower_components", express.static(path.join(__dirname, "bower_components")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const port: number = parseInt(process.env.PORT || "8080");

const routes = setupRoutes();
const apiRoutes = setupApiRoutes();

app.use("/", routes);
app.use("/api", apiRoutes);

const startServer = async () => {
    app.listen(port, () => {
        Hope.log(`⭐ Listening on the port ${port}`);
    });
}

export default startServer;