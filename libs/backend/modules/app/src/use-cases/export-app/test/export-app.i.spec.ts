import {
  CreateComponentInput,
  CreateElementInput,
  TestCreateComponentGql,
  TestCreateComponentMutation,
  TestCreateElementGql,
  TestCreateElementMutation,
} from '@codelab/backend/modules/element'
import { domainRequest } from '@codelab/backend/shared/testing'
import {
  ExportAppSchema,
  IExportApp,
  IPage,
} from '@codelab/shared/abstract/core'
import { setupAppTestModule } from '../../../test/setupAppTestModule'
import { ExportAppInput } from '../export-app.input'
import {
  TestCreatePageForAppExportGql,
  TestCreatePageForAppExportMutation,
  TestCreatePageForAppExportMutationVariables,
} from './test-create-page.api.graphql.gen'
import {
  TestExportAppGql,
  TestExportAppQuery,
} from './test-export-app.api.graphql.gen'

describe('ExportApp', () => {
  const testModule = setupAppTestModule(false)
  let exportAppInput: ExportAppInput
  let page1: Omit<IPage, 'elements'>
  let page1ParentElementId: string
  let page1ChildElementId: string
  let page1ComponentElementId: string
  let page2: Omit<IPage, 'elements'>
  let componentId: string

  const createTestPage = () => {
    return domainRequest<
      TestCreatePageForAppExportMutationVariables['input'],
      TestCreatePageForAppExportMutation
    >(testModule.userApp, TestCreatePageForAppExportGql, {
      appId: exportAppInput.appId,
      name: 'Test page',
    }).then((r) => r.createPage)
  }

  const createTestComponent = () => {
    return domainRequest<CreateComponentInput, TestCreateComponentMutation>(
      testModule.userApp,
      TestCreateComponentGql,
      {
        name: 'Test component',
      },
    ).then((r) => r.createComponent)
  }

  const createTestElement = (input: CreateElementInput) => {
    return domainRequest<CreateElementInput, TestCreateElementMutation>(
      testModule.userApp,
      TestCreateElementGql,
      input,
    ).then((r) => r.createElement)
  }

  beforeAll(async () => {
    const app = await testModule.createTestApp({
      name: 'My awesome app',
    })

    exportAppInput = {
      appId: app.id,
    }

    page1 = await createTestPage()
    page2 = await createTestPage()

    const component = await createTestComponent()
    componentId = component.id

    const parent = await createTestElement({
      name: 'Some element',
      parentElementId: page1.rootElementId,
    })

    page1ParentElementId = parent.id

    const child = await createTestElement({
      name: 'Some child',
      parentElementId: parent.id,
    })

    page1ChildElementId = child.id

    const componentElement = await createTestElement({
      name: 'Component element',
      parentElementId: page1.rootElementId,
      children: [{ elementId: component.id }],
    })

    page1ComponentElementId = componentElement.id
  })

  describe('Guest', () => {
    it('should fail to export an App', async () => {
      await domainRequest(
        testModule.guestApp,
        TestExportAppGql,
        exportAppInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should export an App', async () => {
      const {
        exportApp: { payload },
      } = await domainRequest<ExportAppInput, TestExportAppQuery>(
        testModule.userApp,
        TestExportAppGql,
        exportAppInput,
      )

      const parsedPayload = ExportAppSchema.parse(JSON.parse(payload))

      expect(parsedPayload).toEqual<IExportApp>({
        name: 'My awesome app',
        pages: [
          {
            name: page1.name,
            rootElementId: page1.rootElementId,
            elements: {
              edges: [
                {
                  order: 1,
                  source: page1.rootElementId,
                  target: page1ParentElementId,
                },
                {
                  order: 2,
                  source: page1.rootElementId,
                  target: page1ComponentElementId,
                },
                {
                  order: 1,
                  source: page1ParentElementId,
                  target: page1ChildElementId,
                },
                {
                  order: 1,
                  source: page1ComponentElementId,
                  target: componentId,
                },
              ],
              vertices: [
                {
                  hooks: [],
                  id: page1.rootElementId,
                  name: 'Root element',
                  propMapBindings: [],
                  props: '{}',
                },
                {
                  componentTag: {
                    children: [],
                    id: expect.stringContaining('0x'),
                    isRoot: true,
                    name: 'Test component',
                  },
                  hooks: [],
                  id: componentId,
                  name: 'Test component',
                  propMapBindings: [],
                  props: '{}',
                },
                {
                  hooks: [],
                  id: page1ParentElementId,
                  name: 'Some element',
                  propMapBindings: [],
                  props: '{}',
                },
                {
                  hooks: [],
                  id: page1ChildElementId,
                  name: 'Some child',
                  propMapBindings: [],
                  props: '{}',
                },
                {
                  hooks: [],
                  id: page1ComponentElementId,
                  name: 'Component element',
                  propMapBindings: [],
                  props: '{}',
                },
              ],
            },
          },
          {
            name: page2.name,
            rootElementId: page2.rootElementId,
            elements: {
              edges: [],
              vertices: [
                {
                  hooks: [],
                  id: expect.stringContaining('0x'),
                  name: 'Root element',
                  propMapBindings: [],
                  props: '{}',
                },
              ],
            },
          },
        ],
      })
    })
  })
})
