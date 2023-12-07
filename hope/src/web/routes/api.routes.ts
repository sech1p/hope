import { Router } from "express";
import ExampleController from "../controllers/example.controller";

const router = Router();

export default function setupApiRoutes(): Router {
    const exampleController = new ExampleController();

    router.get("/", exampleController.get);

    return router;
}