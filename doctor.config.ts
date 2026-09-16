import { defineConfig } from "react-doctor/api";

export default defineConfig({
  rules: {
    // require-pnpm-hardening wants `trustPolicy` and `minimumReleaseAge` in
    // pnpm-workspace.yaml. The pnpm that ships with Vite+ reads both, and
    // against the committed lockfile both make `pnpm install` fail:
    //
    //   trustPolicy: no-downgrade
    //     ERR_PNPM_TRUST_DOWNGRADE, high-risk trust downgrade for
    //     "semver@6.3.1" (possible package takeover)
    //
    //   minimumReleaseAge: 10080
    //     entries published inside the cutoff need interactive approval or
    //     an entry in minimumReleaseAgeExclude
    //
    // Clearing the first needs a lockfile rebuilt from a fresh resolution
    // (`pnpm clean --lockfile`, then `pnpm install`), which is a change of its
    // own. Turn the rule back on once that lands.
    "react-doctor/require-pnpm-hardening": "off",
  },
});
