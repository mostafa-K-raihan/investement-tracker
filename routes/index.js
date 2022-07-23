import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const apiRoutePath = __dirname + "/api";

const createAllRoutes = (app) => {
  fs.readdirSync(apiRoutePath).forEach(async (routeFile) => {
    const { default: module } = await import(`${apiRoutePath}/${routeFile}`);
    console.log(`${module.name} has been laoded!`);
    module.createRoute(app);
  });
};

export default createAllRoutes;
