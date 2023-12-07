import { Request, Response, NextFunction } from "express";

export default class ImageController {
    async get(request: Request, response: Response, next: NextFunction) {
        response.end("Hello, world!");
    }
}