"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTestTargets = void 0;
const updateTestTargets = (tree, projectConfig) => {
    /**
     * Remove the old targets
     */
    if ('targets' in projectConfig) {
        delete projectConfig['targets']?.['test:integration'];
        delete projectConfig['targets']?.['test:unit'];
        delete projectConfig['targets']?.['test']?.['options']?.['reporters'];
    }
};
exports.updateTestTargets = updateTestTargets;
//# sourceMappingURL=remove-test-targets.js.map