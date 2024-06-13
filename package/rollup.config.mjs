/**
 * Rollup 설정 모듈
 *
 * @author TAETAEO
 * @since 2024.04.26 Fri 17:44:31
 */

import { getPlugins, getOutputOptions } from "./rollup.plugins.mjs";
import pkg from "./package.json" assert { type: "json" };

const extensions = [".js", ".jsx", ".ts", ".tsx", ".scss", ".css", ".sss", ".pcss"];

process.env.BABEL_ENV = "production";

export default {
  input: "./index.ts",
  output: getOutputOptions(pkg),
  assetFileNames: "assets/[name]-[hash][extname]",
  watch: {
    include: "*",
    exclude: "node_modules/**",
  },
  plugins: getPlugins(extensions, pkg),
  external: [...Object.keys(pkg.peerDependencies || {})],
};

// /**
//  * Rollup 설정 모듈
//  *
//  * @author TAETAEO
//  * @since 2024.04.26 Fri 17:44:31
//  */

// import pkg from "./package.json" assert { type: "json" };
// import typescript from "rollup-plugin-typescript2";
// import peerDepsExternal from "rollup-plugin-peer-deps-external";
// import postcss from "rollup-plugin-postcss";
// import postcssPrefixer from "postcss-prefixer";
// import commonjs from "@rollup/plugin-commonjs";
// import json from "@rollup/plugin-json";
// import babel from "@rollup/plugin-babel";
// import { nodeResolve } from "@rollup/plugin-node-resolve";

// const extensions = [".js", ".jsx", ".ts", ".tsx", ".scss", ".css"];

// process.env.BABEL_ENV = "production";

// export default {
//   input: "./index.ts",
//   output: [
//     {
//       file: pkg.main,
//       format: "cjs",
//       sourcemap: true,
//       preserveModulesRoot: "src",
//       globals: {
//         react: "React",
//         "react/jsx-runtime": "jsxRuntime",
//         "react-dom": "ReactDOM",
//       },
//     },
//     {
//       file: pkg.module,
//       format: "esm",
//       sourcemap: true,
//     },
//     {
//       name: pkg.name,
//       file: pkg.browser,
//       format: "umd",
//       globals: {
//         react: "React",
//         "react-dom": "ReactDOM",
//       },
//     },
//   ],
//   watch: {
//     include: "*",
//     exclude: "node_modules/**",
//   },
//   plugins: [
//     nodeResolve({ extensions }),
//     babel({
//       babelHelpers: "bundled",
//       exclude: "node_modules/**",
//       presets: ["@babel/preset-env", "@babel/preset-react"],
//     }),
//     peerDepsExternal(),
//     json(),
//     commonjs(), // commonjs 플러그인을 설정하여 CommonJS 모듈을 올바르게 변환
//     typescript({ useTsconfigDeclarationDir: true }),
//     postcss({
//       extract: "dist/css", // CSS파일를 별도의 파일로 추출
//       modules: true,
//       sourceMap: true,
//       use: ["sass"],
//       plugins: [postcssPrefixer({ prefix: `${pkg.name}__` })],
//     }),
//   ],
//   external: [...Object.keys(pkg.peerDependencies || {})],
// };
