import { Router } from "express";
import ExampleController from "../controllers/example.controller";

const router = Router();

export default function setupRoutes(): Router {
    const exampleController = new ExampleController();

    router.post("/", exampleController.get);

    return router;
}