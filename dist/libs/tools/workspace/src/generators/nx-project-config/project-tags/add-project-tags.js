"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProjectTags = void 0;
const tslib_1 = require("tslib");
const set_1 = tslib_1.__importDefault(require("lodash/set"));
const uniq_1 = tslib_1.__importDefault(require("lodash/uniq"));
/**
 *
 * This process appends tags
 *
 * @param projectConfig
 * @param tag The tags to append
 * @param libPathsMatch An array of lib paths to match for, if any matches, we apply the tags
 *
 * @returns returns whether any tag has been appended
 */
const appendTagsToProjectConfig = (libPathsMatch, tag, projectConfig) => {
    const { sourceRoot } = projectConfig;
    const matches = libPathsMatch.some((lib) => sourceRoot?.startsWith(lib));
    if (matches) {
        appendTags(tag, projectConfig);
    }
    return matches;
};
const appendTags = (tag, projectConfig) => {
    const updatedTags = (0, uniq_1.default)([...(projectConfig.tags ?? []), tag]);
    (0, set_1.default)(projectConfig, 'tags', updatedTags);
};
/**
 * Add tags based on project directory structure
 *
 *  "scope": ["frontend", "backend", "shared", "codegen"]
 *  "layer": ["domain", "application", "infra", "presentation"]
 *  "type": ["abstract", "concrete", "data", "test"]
 *  "projectType": ["application", "library"]
 */
const addProjectTags = (tree, projectConfig) => {
    // We want to re-construct the tags each time
    projectConfig.tags = [];
    // Add tag equivalent to the project name
    const projectName = projectConfig.name || '';
    appendTags(`projectName:${projectName}`, projectConfig);
    /**
     * Add `type:data`
     */
    appendTagsToProjectConfig(['libs/backend/data', 'libs/frontend/application/shared/data'], 'type:data', projectConfig);
    /**
     * Add `layer:presentation`
     */
    appendTagsToProjectConfig(['libs/frontend/presentation'], 'layer:presentation', projectConfig);
    /**
     * Add `projectType:application`
     */
    appendTagsToProjectConfig(['apps'], 'projectType:application', projectConfig);
    /**
     * Add `projectType:library`
     */
    appendTagsToProjectConfig(['libs'], 'projectType:library', projectConfig);
    /**
     * Add `type:abstract`
     */
    const isAbstract = appendTagsToProjectConfig([
        'libs/shared/abstract',
        'libs/frontend/abstract',
        'libs/backend/abstract',
        'libs/shared/infra/gql',
    ], 'type:abstract', projectConfig);
    if (!isAbstract) {
        appendTags('type:concrete', projectConfig);
    }
    appendTagsToProjectConfig(['libs/backend/test', 'libs/frontend/test'], 'type:test', projectConfig);
    /**
     * Add `layer:infra` tag
     */
    appendTagsToProjectConfig(['libs/backend/infra', 'libs/frontend/infra', 'libs/shared/infra'], 'layer:infra', projectConfig);
    /**
     * Add `scope:codegen` tag
     */
    appendTagsToProjectConfig(['libs/backend/abstract/codegen', 'libs/shared/abstract/codegen'], 'scope:codegen', projectConfig);
    /**
     * Add `scope:backend` tag
     */
    appendTagsToProjectConfig(['libs/backend'], 'scope:backend', projectConfig);
    /**
     * Add `scope:frontend` tag
     */
    appendTagsToProjectConfig(['libs/frontend'], 'scope:frontend', projectConfig);
    /**
     * Add `scope:shared` tag
     */
    appendTagsToProjectConfig(['libs/shared', 'libs/backend/shared', 'libs/frontend/shared'], 'scope:shared', projectConfig);
    /**
     * Add `layer:domain` tag
     */
    appendTagsToProjectConfig([
        'libs/backend/domain',
        'libs/frontend/domain',
        'libs/frontend/abstract/domain',
    ], 'layer:domain', projectConfig);
    /**
     * Add `layer:application` tag
     */
    appendTagsToProjectConfig([
        'libs/backend/application',
        'libs/frontend/application',
        'libs/frontend/abstract/application',
    ], 'layer:application', projectConfig);
};
exports.addProjectTags = addProjectTags;
//# sourceMappingURL=add-project-tags.js.map