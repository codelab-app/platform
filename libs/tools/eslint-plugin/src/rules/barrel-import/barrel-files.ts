export default {
  extends: ['plugin:barrel-files/recommended'],
  overrides: [
    {
      // Allow barrel for these specific use cases only
      files: ['**/use-cases/*/index.ts'],
      rules: {
        'barrel-files/avoid-barrel-files': 'off',
        'barrel-files/avoid-re-export-all': 'off',
        // "barrel-files/avoid-barrel-files": [
        //   "error",
        //   {
        //     "amountOfExportsToConsiderModuleAsBarrel": 3
        //   }
        // ],
      },
    },
  ],
  plugins: ['barrel-files'],
}
