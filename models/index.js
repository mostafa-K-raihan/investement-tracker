import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const modelPath = __dirname;

const importAllModels = async () => {
  const files = fs.readdirSync(modelPath);
  for await (const file of files) {
    if (file === "index.js") {
      continue;
    }
    console.log(file);
    console.log(`${modelPath}/${file}`);
    try {
      await import(`${modelPath}/${file}`);
      console.log(`model defined in ${file} has been laoded!`);
    } catch (err) {
      console.log(err);
    }
  }
};

export default importAllModels;
