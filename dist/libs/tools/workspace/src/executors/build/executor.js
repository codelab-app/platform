"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const runExecutor = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log('Executor ran for Build', options);
    return {
        success: true,
    };
});
exports.default = runExecutor;
//# sourceMappingURL=executor.js.map