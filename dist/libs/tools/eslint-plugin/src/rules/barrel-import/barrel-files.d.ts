declare const _default: {
    extends: string[];
    overrides: {
        files: string[];
        rules: {
            'barrel-files/avoid-barrel-files': string;
            'barrel-files/avoid-re-export-all': string;
        };
    }[];
    plugins: string[];
    rules: {
        'barrel-files/avoid-barrel-files': (string | {
            amountOfExportsToConsiderModuleAsBarrel: number;
        })[];
    };
};
export default _default;
