import { icolaboraRoute } from "./icolabora.route";

export const routesInitializer = (app) => {
  app.use("/icolabora", icolaboraRoute());
};
