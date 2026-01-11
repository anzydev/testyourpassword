import { build as viteBuild } from "vite";
import { rm } from "fs/promises";

async function buildAll() {
  // clean dist
  await rm("dist", { recursive: true, force: true });

  // build frontend only
  console.log("building client...");
  await viteBuild();
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
