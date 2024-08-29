import tsconfigPaths from "vite-tsconfig-paths";

import { defineConfig } from "vitest/config";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  plugins: [tsconfigPaths(), externalizeDeps()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    dir: 'src',
  },
})