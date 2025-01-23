"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateToConfigBasedTest = void 0;
const migrateToConfigBasedTest = (tree, projectConfig) => {
    /**
     * Remove the old targets
     */
    if ('targets' in projectConfig) {
        delete projectConfig['targets']?.['test:integration'];
        delete projectConfig['targets']?.['test:unit'];
    }
};
exports.migrateToConfigBasedTest = migrateToConfigBasedTest;
//# sourceMappingURL=remove-test-targets.js.map