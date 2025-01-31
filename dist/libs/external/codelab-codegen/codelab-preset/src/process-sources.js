"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processSources = void 0;
const processSources = (sources, buildName) => {
    const sourcesWithOperations = [];
    for (const originalSource of sources) {
        const source = fixLinebreaks(originalSource);
        const { document } = source;
        const operations = [];
        for (const definition of document?.definitions ?? []) {
            if (definition.kind !== 'OperationDefinition' &&
                definition.kind !== 'FragmentDefinition') {
                continue;
            }
            if (definition.name?.kind !== 'Name') {
                if (definition.kind === 'OperationDefinition') {
                    // eslint-disable-next-line no-console
                    console.warn(`[client-preset] the following anonymous operation is skipped: ${source.rawSDL}`);
                }
                continue;
            }
            operations.push({
                definition,
                initialName: buildName(definition),
            });
        }
        if (operations.length === 0) {
            continue;
        }
        sourcesWithOperations.push({
            operations,
            source,
        });
    }
    return sourcesWithOperations;
};
exports.processSources = processSources;
const fixLinebreaks = (source) => {
    const fixedSource = { ...source };
    fixedSource.rawSDL = source.rawSDL?.replace(/\r\n/g, '\n');
    return fixedSource;
};
//# sourceMappingURL=process-sources.js.map