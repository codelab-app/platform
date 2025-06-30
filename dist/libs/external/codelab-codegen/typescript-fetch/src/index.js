"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = void 0;
const visitor_1 = require("./visitor");
const plugin = (schema, documents, config) => {
    const visitor = new visitor_1.FetchVisitor(documents, config);
    return {
        content: visitor.content,
        prepend: visitor.getImports(),
    };
};
exports.plugin = plugin;
//# sourceMappingURL=index.js.map