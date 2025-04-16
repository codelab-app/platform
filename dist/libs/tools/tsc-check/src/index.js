import { createNodesFromFiles, readJsonFile } from '@nx/devkit';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
export const createNodesV2 = [
    '**/tsconfig.spec.json',
    async (configFiles, options, context) => {
        return await createNodesFromFiles((configFile, _options, _context) => createNodesInternal(configFile, _options, _context), configFiles, options ?? {}, context);
    },
];
const createNodesInternal = async (configFilePath, options, context) => {
    const projectConfiguration = readJsonFile(configFilePath);
    const projectRoot = dirname(configFilePath);
    const isProject = existsSync(join(projectRoot, 'project.json')) ||
        existsSync(join(projectRoot, 'package.json'));
    if (!isProject) {
        return {};
    }
    return {
        projects: {
            [projectRoot]: {
                targets: {
                    'tsc-check': {
                        cache: true,
                        command: `tsc -p ${configFilePath}`,
                    },
                },
            },
        },
    };
};
//# sourceMappingURL=index.js.map