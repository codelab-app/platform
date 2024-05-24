"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    extends: ['plugin:barrel-files/recommended'],
    overrides: [
        {
            // Allow top level
            files: ['src/*/index.{ts,tsx}'],
            rules: {
                'barrel-files/avoid-barrel-files': 'off',
                'barrel-files/avoid-re-export-all': 'off',
            },
        },
        {
            // Allow second level for uses-cases
            files: ['src/use-cases/*/index.{ts,tsx}'],
            rules: {
                'barrel-files/avoid-barrel-files': 'off',
                'barrel-files/avoid-re-export-all': 'off',
            },
        },
    ],
    plugins: ['barrel-files'],
    rules: {
        'barrel-files/avoid-barrel-files': [
            'error',
            {
                amountOfExportsToConsiderModuleAsBarrel: 1,
            },
        ],
    },
};
//# sourceMappingURL=barrel-files.js.map