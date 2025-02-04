import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import graphqlLoader from "vite-plugin-graphql-loader";
import tsconfigPaths from "vite-tsconfig-paths";
import { cjsInterop } from "vite-plugin-cjs-interop";

installGlobals();

export default defineConfig({
  ssr: {
    noExternal: ["@apollo/client"],
  },
  plugins: [remix(), cjsInterop({ dependencies: ["lodash"] }), graphqlLoader(), tsconfigPaths()],
});
