"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const devkit_1 = require("@nx/devkit");
const update = (host) => {
    const projects = (0, devkit_1.getProjects)(host);
    const libNames = [];
    for (const [name, project] of projects) {
        // if (project.projectType === 'library') {
        // }
        libNames.push(name);
    }
    return libNames;
};
exports.update = update;
//# sourceMappingURL=eslint.js.map