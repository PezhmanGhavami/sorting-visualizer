const lintStagedConfig = {
  /**
   * This function runs Typescript type checker for the staged ts or tsx files
   * @returns A command for running Typescript type checker
   */
  "**/*.{ts,tsx}": () => "tsc -p ./tsconfig.json --noEmit",
  "**/*.{js,jsx,ts,tsx}": ["eslint"],
  "**/*.{js,jsx,ts,tsx,json,css,md}": [
    "prettier --config ./.prettierrc.json --write",
  ],
};

export default lintStagedConfig;
