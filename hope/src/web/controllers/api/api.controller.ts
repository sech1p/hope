import { Request, Response, NextFunction } from "express";

export default class ApiController {
    async get(request: Request, response: Response, next: NextFunction) {
        response.end("Hello, world!");
    }
}