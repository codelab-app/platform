"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegenGenerator = void 0;
const devkit_1 = require("@nx/devkit");
const codegen_1 = require("./codegen");
const codegenGenerator = async (tree, options) => {
    const projects = (0, devkit_1.getProjects)(tree);
    const projectNames = projects.keys();
    for await (const projectName of projectNames) {
        await (0, codegen_1.codegen)(tree, projectName);
    }
};
exports.codegenGenerator = codegenGenerator;
exports.default = exports.codegenGenerator;
//# sourceMappingURL=generator.js.map