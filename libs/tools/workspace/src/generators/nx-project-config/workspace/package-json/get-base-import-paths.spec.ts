import { getBaseImportPaths } from './paths'

interface TestCase {
  data: Array<[input: string, expected: string]>
  description: string
}

describe('getBaseImportPaths', () => {
  const testCases: TestCase = {
    data: [
      [
        '@codelab/frontend-abstract-application',
        '@codelab/frontend-abstract-application',
      ],
      ['@codelab/shared-abstract-types', '@codelab/shared-abstract-types'],
      // Added from testCasesOld
      [
        '@codelab/frontend-application-dnd/collision-detection',
        '@codelab/frontend-application-dnd',
      ],
      [
        '@codelab/frontend-application-element/services',
        '@codelab/frontend-application-element',
      ],
      ['@codelab/frontend-infra-mobx/context', '@codelab/frontend-infra-mobx'],
      [
        '@codelab/frontend-domain-element/use-cases/incremented-name',
        '@codelab/frontend-domain-element',
      ],
      [
        '@codelab/frontend-application-component/use-cases/update-component',
        '@codelab/frontend-application-component',
      ],
      [
        '@codelab/frontend-application-page/use-cases/update-page-tab',
        '@codelab/frontend-application-page',
      ],
      ['@codelab/frontend-domain-prop/utils', '@codelab/frontend-domain-prop'],
      [
        '@codelab/frontend-presentation-view/components/loader',
        '@codelab/frontend-presentation-view',
      ],
      [
        '@codelab/frontend-application-store/services',
        '@codelab/frontend-application-store',
      ],
      [
        '@codelab/frontend-application-renderer/use-cases/root-renderer',
        '@codelab/frontend-application-renderer',
      ],
      ['react', ''],
      ['@testing-library/react', '@testing-library/react'],
      ['@scope', ''],
      ['@scope/package/extra', '@scope/package'],
      // More cases from testCasesOld
      [
        '@codelab/frontend-abstract-domain',
        '@codelab/frontend-abstract-domain',
      ],
      [
        '@codelab/frontend-application-dnd/components',
        '@codelab/frontend-application-dnd',
      ],
      ['@codelab/shared-abstract-core', '@codelab/shared-abstract-core'],
      [
        '@codelab/frontend-application-element/validation',
        '@codelab/frontend-application-element',
      ],
      [
        '@codelab/frontend-application-preference/services',
        '@codelab/frontend-application-preference',
      ],
      ['@codelab/frontend-infra-context', '@codelab/frontend-infra-context'],
      [
        '@codelab/frontend-presentation-components-form',
        '@codelab/frontend-presentation-components-form',
      ],
      ['@codelab/frontend-shared-utils', '@codelab/frontend-shared-utils'],
      [
        '@codelab/frontend-application-prop/services',
        '@codelab/frontend-application-prop',
      ],
      ['@codelab/shared-infra-eval', '@codelab/shared-infra-eval'],
      [
        '@codelab/frontend-application-component/use-cases/update-component-props',
        '@codelab/frontend-application-component',
      ],
      [
        '@codelab/frontend-application-element/use-cases/delete-element',
        '@codelab/frontend-application-element',
      ],
      [
        '@codelab/frontend-application-element/use-cases/move-element',
        '@codelab/frontend-application-element',
      ],
      [
        '@codelab/frontend-application-element/use-cases/update-element',
        '@codelab/frontend-application-element',
      ],
      [
        '@codelab/frontend-application-element/use-cases/update-element-props',
        '@codelab/frontend-application-element',
      ],
      [
        '@codelab/frontend-presentation-components-css-editor',
        '@codelab/frontend-presentation-components-css-editor',
      ],
      [
        '@codelab/frontend-application-shared-data',
        '@codelab/frontend-application-shared-data',
      ],
      [
        '@codelab/frontend-presentation-components-codemirror',
        '@codelab/frontend-presentation-components-codemirror',
      ],
      [
        '@codelab/frontend-application-component/services',
        '@codelab/frontend-application-component',
      ],
      [
        '@codelab/frontend-application-user/services',
        '@codelab/frontend-application-user',
      ],
      [
        '@codelab/frontend-presentation-view/components/key',
        '@codelab/frontend-presentation-view',
      ],
      [
        '@codelab/frontend-presentation-codelab-ui',
        '@codelab/frontend-presentation-codelab-ui',
      ],
      [
        '@codelab/frontend-application-store/use-cases/get-actions',
        '@codelab/frontend-application-store',
      ],
      [
        '@codelab/frontend-application-store/use-cases/get-state',
        '@codelab/frontend-application-store',
      ],
      [
        '@codelab/frontend-application-type/services',
        '@codelab/frontend-application-type',
      ],
      ['@codelab/shared-infra-gqlgen', '@codelab/shared-infra-gqlgen'],
      [
        '@codelab/frontend-infra-connector',
        '@codelab/frontend-infra-connector',
      ],
      [
        '@codelab/frontend-application-component/use-cases/import-component',
        '@codelab/frontend-application-component',
      ],
      [
        '@codelab/frontend-presentation-view/components/error',
        '@codelab/frontend-presentation-view',
      ],
      [
        '@codelab/frontend-application-component/use-cases/export-component',
        '@codelab/frontend-application-component',
      ],
      ['@codelab/shared-utils', '@codelab/shared-utils'],
      [
        '@codelab/frontend-application-dnd/hooks',
        '@codelab/frontend-application-dnd',
      ],
      [
        '@codelab/frontend-presentation-view/components/overlay',
        '@codelab/frontend-presentation-view',
      ],
      [
        '@codelab/frontend-presentation-container',
        '@codelab/frontend-presentation-container',
      ],
      [
        '@codelab/frontend-presentation-view/sections',
        '@codelab/frontend-presentation-view',
      ],
      ['@codelab/shared-infra-fetch', '@codelab/shared-infra-fetch'],
      [
        '@codelab/shared-infra-fetch-server',
        '@codelab/shared-infra-fetch-server',
      ],
      ['@codelab/frontend-domain-shared', '@codelab/frontend-domain-shared'],
      ['lodash/fp', ''],
      ['some-lib', ''],
      ['@scope/', ''],
    ],
    description: 'Test cases for getBaseImportPaths',
  }

  testCases.data.forEach(([input, expected], index) => {
    it(`should handle test case ${index + 1}`, () => {
      const result = getBaseImportPaths([input])

      // Use Set for comparison to ignore order
      expect(new Set(result)).toEqual(new Set([expected].filter(Boolean)))
    })
  })
})
