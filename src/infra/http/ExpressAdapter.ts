import express, { Request, Response, request, response } from "express";
import Http from "./Http";

export default class ExpressAdapter implements Http {
  app: any;

  constructor() {
    this.app = express();
  }

  route(method: string, url: string, callback: Function): void {
    this.app[method](
      url,
      async function (request: Request, response: Response) {
        const output = await callback(request.params, request.body);
        response.json(output);
      }
    );
  }
  listen(port: number): void {
    this.app.listen(port);
  }
}
