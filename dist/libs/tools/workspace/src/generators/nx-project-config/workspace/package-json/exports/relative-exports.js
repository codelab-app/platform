"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelativeExports = void 0;
const path_alias_1 = require("../../path-alias/path-alias");
/**
 * We look at the entire path list from `path-alias.json` and generate the relative exports with regards to the current package name
 */
const getRelativeExports = (packageName) => {
    const packageNames = (0, path_alias_1.getProjectReferencePaths)();
    const exports = packageNames.filter((name) => name.startsWith(packageName));
    console.log('Getting relative exports for', packageName, exports);
    /**
     * Current package name:
     * '@codelab/frontend-application-app'
     *
     * If we see:
     * '@codelab/frontend-application-app/use-cases/build'
     *
     * Then we want to generate:
     * './src/use-cases/build/index.ts'
     */
    return exports.reduce((acc, name) => {
        // Calculate the relative path, ensuring it starts with './'
        const relativePathRaw = name.replace(packageName, '');
        // Handle the case where the path is empty (root export)
        const relativePath = relativePathRaw === '' ? '.' : `.${relativePathRaw}`;
        // Determine the target path based on the relative path
        // const targetPath =
        //   relativePathRaw === ''
        //     ? './src/index.ts'
        //     : `./src${relativePathRaw}/index.ts`
        const targetPath = relativePathRaw === ''
            ? './dist/index.js'
            : `./dist${relativePathRaw}/index.js`;
        // Assign the dynamic export structure
        acc[relativePath] = {
            import: targetPath,
            types: targetPath.replace('.js', '.d.ts'),
            // eslint-disable-next-line canonical/sort-keys
            default: targetPath,
        };
        // Return the accumulator
        return acc;
    }, {});
};
exports.getRelativeExports = getRelativeExports;
//# sourceMappingURL=relative-exports.js.map