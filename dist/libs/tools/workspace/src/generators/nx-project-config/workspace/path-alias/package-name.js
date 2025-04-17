"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToPackageName = void 0;
/**
 * This function is fully tested based on our project test data.
 */
const convertToPackageName = (projectName) => {
    // Specific external package pattern
    if (projectName.startsWith('@codelab-codegen/')) {
        return projectName;
    }
    // Keep slashes for any frontend specific sub-paths with more than 2 segments
    if (projectName.startsWith('@codelab/frontend-')) {
        // Check if it has more than two segments (e.g., @codelab/frontend-domain-action/services or @codelab/frontend-infra-mobx/context)
        if (projectName.split('/').length > 2) {
            return projectName;
        }
        // If it's just @codelab/frontend-domain-action (hypothetical), let it fall through
    }
    // Handle specific backend-infra-adapter pattern (convert last slash to hyphen)
    // Example: @codelab/backend-infra-adapter/neo4j-driver -> @codelab/backend-infra-adapter-neo4j-driver
    if (projectName.match(/^@codelab\/backend-infra-adapter\/[^/]+$/)) {
        const parts = projectName.split('/');
        const prefix = parts.slice(0, 2).join('/');
        const suffix = parts[2];
        return `${prefix}-${suffix}`;
    }
    // Standard @codelab/ paths: convert all slashes after @codelab/ to hyphens
    // This covers backend, shared, etc. (but not the frontend exceptions handled above)
    // Example: @codelab/backend/abstract/core -> @codelab/backend-abstract-core
    if (projectName.startsWith('@codelab/') && projectName.includes('/')) {
        const withoutPrefix = projectName.replace('@codelab/', '');
        return `@codelab/${withoutPrefix.replace(/\//g, '-')}`;
    }
    // Handle simple non-@ paths with a slash
    // Example: libs/shared -> libs-shared
    if (projectName.includes('/') && !projectName.startsWith('@')) {
        return projectName.replace('/', '-');
    }
    // Return the original name if no other condition matches (e.g., simple names without slashes)
    return projectName;
};
exports.convertToPackageName = convertToPackageName;
//# sourceMappingURL=package-name.js.map