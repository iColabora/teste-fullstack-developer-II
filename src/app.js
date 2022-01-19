import express from "express";
import { routesInitializer } from "./routes/routes";

const app = express();

app.use(express.json());

routesInitializer(app);

export default app;
