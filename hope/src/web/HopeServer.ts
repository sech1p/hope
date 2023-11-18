import express, { Application } from "express";
import * as dotenv from "dotenv";
import setupRoutes from "./routes/routes";
import morgan from "morgan";
import cors from "cors";

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

const port: number = parseInt(process.env.PORT || "8080");

const routes = setupRoutes();
app.use("/", routes);

const startServer = async () => {
    app.listen(port, () => {
        console.log(`? Listening on the port ${port}`);
    });
}

export default startServer;