"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runExecutor = async (options) => {
    console.log('Executor ran for Build', options);
    return {
        success: true,
    };
};
exports.default = runExecutor;
//# sourceMappingURL=executor.js.map