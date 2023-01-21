import express, { Express } from "express";
import { routes } from "./router";

const app: Express = express();

app.use(express.json());

routes(app);

export default app;