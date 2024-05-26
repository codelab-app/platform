/**
 * Does not work with multiple wildcards `/*\/*`
 */
export const aliasMap = {
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
}
