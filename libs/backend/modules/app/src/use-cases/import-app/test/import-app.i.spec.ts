import {
  CreateAtomInput,
  TestCreateAtomGql,
  TestCreateAtomMutation,
} from '@codelab/backend/modules/atom'
import { domainRequest } from '@codelab/backend/shared/testing'
import { AtomType } from '@codelab/shared/abstract/core'
import { setupAppTestModule } from '../../../test/setupAppTestModule'
import { ExportAppInput } from '../../export-app'
import {
  TestCreatePageForAppExportGql,
  TestCreatePageForAppExportMutation,
  TestCreatePageForAppExportMutationVariables,
} from '../../export-app/test/test-create-page.api.graphql.gen'
import {
  TestExportAppGql,
  TestExportAppQuery,
} from '../../export-app/test/test-export-app.api.graphql.gen'
import { ImportAppInput } from '../import-app.input'
import {
  TestImportAppGql,
  TestImportAppMutation,
} from './import-app.api.graphql.gen'
import {
  buttonComponentInput,
  createPageInput,
  firstButtonInput,
  hookQueryConfig,
  secondButtonInput,
  textElementInput,
} from './import-app.data'

describe('ImportApp', () => {
  const testModule = setupAppTestModule(false)
  let importAppInput: ImportAppInput

  const createAtom = (input: CreateAtomInput) =>
    domainRequest<CreateAtomInput, TestCreateAtomMutation>(
      testModule.adminApp,
      TestCreateAtomGql,
      input,
    ).then((r) => r?.createAtom)

  const createTestPage = (
    input: TestCreatePageForAppExportMutationVariables['input'],
  ) => {
    return domainRequest<
      TestCreatePageForAppExportMutationVariables['input'],
      TestCreatePageForAppExportMutation
    >(testModule.userApp, TestCreatePageForAppExportGql, input).then(
      (r) => r.createPage,
    )
  }

  beforeAll(async () => {
    const app = await testModule.createTestApp({
      name: 'My awesome app',
    })

    await createAtom({ type: AtomType.HtmlButton, name: 'Button' })
    await createAtom({ type: AtomType.Text, name: 'Text' })

    await createTestPage({ ...createPageInput, appId: app.id })

    const { exportApp } = await domainRequest<
      ExportAppInput,
      TestExportAppQuery
    >(testModule.userApp, TestExportAppGql, { appId: app.id })

    importAppInput = {
      payload: exportApp.payload,
    }
  })

  describe('Guest', () => {
    it('should fail to import an App', async () => {
      await domainRequest(
        testModule.guestApp,
        TestImportAppGql,
        importAppInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should import an App', async () => {
      const { importApp } = await domainRequest<
        ImportAppInput,
        TestImportAppMutation
      >(testModule.userApp, TestImportAppGql, importAppInput)

      const getElId = (elName: string) =>
        importApp.pages[0].elements?.vertices.find((v) => v.name === elName)?.id

      const getElName = (elId: string) =>
        importApp.pages[0].elements?.vertices.find((v) => v.id === elId)?.name

      const rootElementId = importApp.pages[0].rootElementId
      const textElementId = getElId(textElementInput.newElement.name)
      const firstButtonId = getElId(firstButtonInput.newElement.name)
      const secondButtonId = getElId(secondButtonInput.newElement.name)
      const buttonComponentId = getElId(buttonComponentInput.newElement.name)

      expect(textElementId).toBeTruthy()

      importApp.pages[0].elements?.vertices?.sort((a, b) =>
        (a.name ?? '').localeCompare(b.name || ''),
      )

      importApp.pages[0].elements?.edges?.sort(
        (a, b) =>
          (getElName(a.source) ?? '').localeCompare(
            getElName(b.source) || '',
          ) || (a.order ?? 0) - (b.order ?? 0),
      )

      expect(importApp).toEqual({
        id: expect.stringContaining('0x'),
        name: 'My awesome app',
        ownerId: '0x1',
        pages: [
          {
            id: expect.stringContaining('0x'),
            name: createPageInput.name,
            rootElementId: expect.stringContaining('0x'),
            elements: {
              vertices: [
                {
                  __typename: 'Element',
                  id: buttonComponentId,
                  name: buttonComponentInput.newElement.name,
                  css: buttonComponentInput.newElement.css,
                  atom: expect.objectContaining({ type: AtomType.HtmlButton }),
                  componentTag: {
                    name: buttonComponentInput.newElement.name,
                    children: [],
                    isRoot: true,
                    id: expect.stringContaining('0x'),
                  },
                  props: {
                    data: '{}',
                    id: expect.stringContaining('0x'),
                  },
                  hooks: [],
                  renderForEachPropKey: null,
                  renderIfPropKey: null,
                  propMapBindings: [],
                  propTransformationJs: null,
                },
                {
                  __typename: 'Element',
                  id: firstButtonId,
                  name: firstButtonInput.newElement.name,
                  css: null,
                  atom: null,
                  componentTag: null,
                  props: {
                    data: '{}',
                    id: expect.stringContaining('0x'),
                  },
                  hooks: [],
                  renderForEachPropKey: null,
                  renderIfPropKey: null,
                  propMapBindings: [],
                  propTransformationJs: null,
                },
                {
                  __typename: 'Element',
                  id: rootElementId,
                  name: createPageInput.rootElement?.name,
                  css: createPageInput.rootElement?.css,
                  atom: null,
                  componentTag: null,
                  props: {
                    data: '{}',
                    id: expect.stringContaining('0x'),
                  },
                  hooks: [
                    {
                      config: {
                        id: expect.stringContaining('0x'),
                        data: hookQueryConfig.config,
                      },
                      type: AtomType.HookQueryConfig,
                      id: expect.stringContaining('0x'),
                    },
                  ],
                  renderForEachPropKey: null,
                  renderIfPropKey: null,
                  propMapBindings: [
                    {
                      id: expect.stringContaining('0x'),
                      targetElementId: textElementId,
                      targetKey:
                        createPageInput.rootElement?.propMapBindings?.[0]
                          .targetKey,
                      sourceKey:
                        createPageInput.rootElement?.propMapBindings?.[0]
                          .sourceKey,
                    },
                  ],
                  propTransformationJs: null,
                },
                {
                  __typename: 'Element',
                  id: secondButtonId,
                  name: secondButtonInput.newElement.name,
                  css: null,
                  atom: null,
                  componentTag: null,
                  props: {
                    data: '{}',
                    id: expect.stringContaining('0x'),
                  },
                  hooks: [],
                  renderForEachPropKey: null,
                  renderIfPropKey: null,
                  propMapBindings: [],
                  propTransformationJs: null,
                },
                {
                  __typename: 'Element',
                  id: textElementId,
                  name: textElementInput.newElement.name,
                  css: null,
                  atom: expect.objectContaining({ type: AtomType.Text }),
                  componentTag: null,
                  props: {
                    data: '{}',
                    id: expect.stringContaining('0x'),
                  },
                  hooks: [],
                  renderForEachPropKey: null,
                  renderIfPropKey: null,
                  propMapBindings: [],
                  propTransformationJs: null,
                },
              ],
              edges: [
                { order: 1, source: firstButtonId, target: buttonComponentId },
                { order: 1, source: rootElementId, target: textElementId },
                { order: 2, source: rootElementId, target: firstButtonId },
                { order: 3, source: rootElementId, target: secondButtonId },
                { order: 1, source: secondButtonId, target: buttonComponentId },
              ],
            },
          },
        ],
      })
    })
  })
})
