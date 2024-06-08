import { Router } from "express";
import ExampleController from "../controllers/website.controller";

const router = Router();

export default function setupRoutes(): Router {
    const exampleController = new ExampleController();

    router.get("/", exampleController.get);

    return router;
}