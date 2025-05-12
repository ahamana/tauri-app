import type { Configuration } from "lint-staged";

const config: Configuration = {
  "*": "eslint --flag unstable_native_nodejs_ts_config --fix",
};

export default config;
