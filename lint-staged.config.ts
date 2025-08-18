import type { Configuration } from "lint-staged";

const config: Configuration = {
  "*": "eslint --fix",
};

export default config;
