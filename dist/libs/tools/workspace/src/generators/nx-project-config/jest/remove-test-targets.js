"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateToConfigBasedTest = void 0;
const migrateToConfigBasedTest = (tree, projectConfig) => {
    var _a, _b;
    /**
     * Remove the old targets
     */
    if ('targets' in projectConfig) {
        (_a = projectConfig['targets']) === null || _a === void 0 ? true : delete _a['test:integration'];
        (_b = projectConfig['targets']) === null || _b === void 0 ? true : delete _b['test:unit'];
    }
};
exports.migrateToConfigBasedTest = migrateToConfigBasedTest;
//# sourceMappingURL=remove-test-targets.js.map