"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegenGenerator = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const codegen_1 = require("./codegen");
const codegenGenerator = (tree, options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const projects = (0, devkit_1.getProjects)(tree);
    const projectNames = projects.keys();
    try {
        for (var _d = true, projectNames_1 = tslib_1.__asyncValues(projectNames), projectNames_1_1; projectNames_1_1 = yield projectNames_1.next(), _a = projectNames_1_1.done, !_a;) {
            _c = projectNames_1_1.value;
            _d = false;
            try {
                const projectName = _c;
                yield (0, codegen_1.codegen)(tree, projectName);
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = projectNames_1.return)) yield _b.call(projectNames_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
exports.codegenGenerator = codegenGenerator;
exports.default = exports.codegenGenerator;
//# sourceMappingURL=generator.js.map