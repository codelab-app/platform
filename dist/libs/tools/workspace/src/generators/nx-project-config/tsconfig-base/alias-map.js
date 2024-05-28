"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliasMap = void 0;
/**
 * Does not work with multiple wildcards `/*\/*`
 */
exports.aliasMap = {
    '^frontend-application-(?!shared)[a-z]+$': [
        'graphql',
        'services',
        'store',
        'views',
        'test',
        'use-cases/*',
    ],
    '^frontend-application-atom$': [
        'components/ant-design/*',
        'components/custom/*',
        'components/mui/*',
    ],
    '^frontend-application-builder$': ['dnd', 'hooks', 'sections', 'utils'],
    '^frontend-application-dnd$': ['components', 'collision-detection'],
    '^frontend-application-renderer$': ['atoms', 'components', 'hooks'],
    '^frontend-application-resource$': ['components'],
    '^frontend-application-type$': ['interface-form', 'props-form'],
    '^frontend-domain-[a-z]+$': [
        'services',
        'store',
        'test',
        'views',
        'use-cases/*',
    ],
    '^frontend-domain-domain$': ['errors'],
    '^frontend-domain-prop$': ['utils'],
    '^shared-infra-auth0$': ['client', 'server'],
};
//# sourceMappingURL=alias-map.js.map