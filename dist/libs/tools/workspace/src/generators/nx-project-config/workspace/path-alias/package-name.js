"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToPackageName = void 0;
/**
 * This function is fully tested based on our project test data.
 */
const convertToPackageName = (projectName) => {
    console.log(`convertToPackageName input: ${projectName}`);
    let packageName = projectName;
    // Specific external package pattern - should return immediately
    if (projectName.startsWith('@codelab-codegen/')) {
        // No change needed, already the correct format
        console.log(`convertToPackageName output (codegen): ${packageName}`);
        return packageName;
    }
    // Keep slashes for specific frontend sub-paths with more than 2 segments - should return immediately
    if (projectName.startsWith('@codelab/frontend-') &&
        projectName.split('/').length > 2) {
        // Keep original name with slashes
        console.log(`convertToPackageName output (frontend multi-segment): ${packageName}`);
        return packageName;
    }
    // Handle specific backend-infra-adapter pattern (convert last slash to hyphen)
    // Example: @codelab/backend-infra-adapter/neo4j-driver -> @codelab/backend-infra-adapter-neo4j-driver
    if (projectName.match(/^@codelab\/backend-infra-adapter\/[^/]+$/)) {
        const parts = projectName.split('/');
        const prefix = parts.slice(0, 2).join('/');
        const suffix = parts[2];
        packageName = `${prefix}-${suffix}`;
        console.log(`convertToPackageName output (backend-infra-adapter): ${packageName}`);
        // Return immediately after specific conversion
        return packageName;
    }
    // Standard @codelab/ paths (excluding already handled cases):
    // convert all remaining slashes after @codelab/ to hyphens
    // Example: @codelab/backend/abstract/core -> @codelab/backend-abstract-core
    // Example: @codelab/frontend-domain-action -> @codelab/frontend-domain-action (no change if no slash)
    if (projectName.startsWith('@codelab/') && projectName.includes('/')) {
        const withoutPrefix = projectName.replace('@codelab/', '');
        packageName = `@codelab/${withoutPrefix.replace(/\//g, '-')}`;
    }
    // Handle simple non-@ paths with a slash (AFTER @codelab checks)
    // Example: libs/shared -> libs-shared
    else if (projectName.includes('/') && !projectName.startsWith('@')) {
        packageName = projectName.replace('/', '-');
    }
    // No changes needed for simple names without slashes or already converted paths
    console.log(`convertToPackageName output (final): ${packageName}`);
    return packageName;
};
exports.convertToPackageName = convertToPackageName;
//# sourceMappingURL=package-name.js.map