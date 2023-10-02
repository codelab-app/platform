"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProjectTags = void 0;
const tslib_1 = require("tslib");
const set_1 = tslib_1.__importDefault(require("lodash/set"));
const uniq_1 = tslib_1.__importDefault(require("lodash/uniq"));
/**
 * Add tags based on project directory structure
 *
 *  "scope": ["frontend", "backend", "shared", "codegen"]
 *  "layer": ["domain", "application", "infra", "presentation"]
 *  "type": ["abstract", "test"]
 *  "projectType": ["application", "library"]
 */
const addProjectTags = (tree, projectConfig) => {
    const { sourceRoot } = projectConfig;
    // We want to re-construct the tags each time
    projectConfig.tags = [];
    /**
     * Add `projectType:application`
     */
    if (sourceRoot?.startsWith('apps')) {
        const updatedTags = (0, uniq_1.default)([...projectConfig.tags, 'projectType:application']);
        (0, set_1.default)(projectConfig, 'tags', updatedTags);
    }
    /**
     * Add `projectType:library`
     */
    if (sourceRoot?.startsWith('libs')) {
        const updatedTags = (0, uniq_1.default)([...projectConfig.tags, 'projectType:library']);
        (0, set_1.default)(projectConfig, 'tags', updatedTags);
    }
    /**
     * Add `type:abstract`
     */
    if ([
        'libs/shared/abstract',
        'libs/frontend/abstract',
        'libs/backend/abstract',
    ].some((lib) => sourceRoot?.startsWith(lib))) {
        const updatedTags = (0, uniq_1.default)([...projectConfig.tags, 'type:abstract']);
        (0, set_1.default)(projectConfig, 'tags', updatedTags);
    }
    else {
        const updatedTags = (0, uniq_1.default)([...projectConfig.tags, 'type:concrete']);
        (0, set_1.default)(projectConfig, 'tags', updatedTags);
    }
    if (['libs/backend/test', 'libs/frontend/test'].some((lib) => sourceRoot?.startsWith(lib))) {
        const updatedTags = (0, uniq_1.default)([...projectConfig.tags, 'type:test']);
        (0, set_1.default)(projectConfig, 'tags', updatedTags);
    }
    /**
     * Add `layer:infra` tag
     */
    if (['libs/backend/infra', 'libs/frontend/infra', 'libs/shared/infra'].some((lib) => sourceRoot?.startsWith(lib))) {
        const updatedTags = (0, uniq_1.default)([...projectConfig.tags, 'layer:infra']);
        (0, set_1.default)(projectConfig, 'tags', updatedTags);
    }
    /**
     * Add `scope:codegen` tag
     */
    if (['libs/backend/infra', 'libs/frontend/infra'].some((lib) => sourceRoot?.startsWith(lib))) {
        const updatedTags = (0, uniq_1.default)([...projectConfig.tags, 'scope:codegen']);
        (0, set_1.default)(projectConfig, 'tags', updatedTags);
    }
    /**
     * Add `scope:backend` tag
     */
    if (sourceRoot?.startsWith('libs/backend')) {
        const updatedTags = (0, uniq_1.default)([...projectConfig.tags, 'scope:backend']);
        (0, set_1.default)(projectConfig, 'tags', updatedTags);
    }
    /**
     * Add `scope:frontend` tag
     */
    if (sourceRoot?.startsWith('libs/frontend')) {
        const updatedTags = (0, uniq_1.default)([...projectConfig.tags, 'scope:frontend']);
        (0, set_1.default)(projectConfig, 'tags', updatedTags);
    }
    /**
     * Add `scope:shared` tag
     */
    if (['libs/shared', 'libs/backend/shared', 'libs/frontend/shared'].some((lib) => sourceRoot?.startsWith(lib))) {
        const updatedTags = (0, uniq_1.default)([...projectConfig.tags, 'scope:shared']);
        (0, set_1.default)(projectConfig, 'tags', updatedTags);
    }
    /**
     * Add `layer:domain` tag
     */
    if (['libs/backend/domain', 'libs/frontend/domain'].some((lib) => sourceRoot?.startsWith(lib))) {
        const updatedTags = (0, uniq_1.default)([...projectConfig.tags, 'layer:domain']);
        (0, set_1.default)(projectConfig, 'tags', updatedTags);
    }
    /**
     * Add `layer:application` tag
     */
    if (['libs/backend/application', 'libs/frontend/application'].some((lib) => sourceRoot?.startsWith(lib))) {
        // Temporarily treat as domain
        if (sourceRoot?.startsWith('libs/frontend/application/atoms')) {
            const updatedTags = (0, uniq_1.default)([...projectConfig.tags, 'layer:domain']);
            (0, set_1.default)(projectConfig, 'tags', updatedTags);
        }
        else {
            const updatedTags = (0, uniq_1.default)([...projectConfig.tags, 'layer:application']);
            (0, set_1.default)(projectConfig, 'tags', updatedTags);
        }
    }
};
exports.addProjectTags = addProjectTags;
//# sourceMappingURL=add-project-tags.js.map