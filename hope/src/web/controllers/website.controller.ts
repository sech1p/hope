import { Request, Response, NextFunction } from "express";

export default class WebsiteController {
    async get(request: Request, response: Response, next: NextFunction) {
        response.render("index.ejs");
    }
}