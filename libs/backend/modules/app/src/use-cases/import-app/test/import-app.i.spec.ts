import {
  CreateAtomInput,
  TestCreateAtomGql,
  TestCreateAtomMutation,
} from '@codelab/backend/modules/atom'
import {
  AddHookToElementInput,
  CreateComponentInput,
  CreateElementInput,
  CreatePropMapBindingInput,
  TestAddHookToElementGql,
  TestAddHookToElementMutation,
  TestCreateComponentGql,
  TestCreateComponentMutation,
  TestCreateElementGql,
  TestCreateElementMutation,
  TestCreatePropMapBindingGql,
  TestCreatePropMapBindingMutation,
} from '@codelab/backend/modules/element'
import { domainRequest } from '@codelab/backend/shared/testing'
import {
  AtomType,
  IApp,
  IAtom,
  IElement,
  IHook,
  IPage,
  IPropMapBinding,
} from '@codelab/shared/abstract/core'
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
  buttonAtomInput,
  buttonTextElementInput,
  containerElementInput,
  firstButtonInput,
  redButtonComponentInput,
  secondButtonInput,
  testAppInput,
  testHookInput,
  testPageInput,
  testPmbInput,
  textAtomInput,
  textElementInput,
} from './import-app.data'

describe('ImportApp', () => {
  const testModule = setupAppTestModule()
  let importAppInput: ImportAppInput

  const elements: Record<
    | 'container'
    | 'text'
    | 'firstButton'
    | 'buttonComponent'
    | 'buttonText'
    | 'secondButton',
    IElement
  > = {
    buttonComponent: undefined!,
    buttonText: undefined!,
    firstButton: undefined!,
    secondButton: undefined!,
    text: undefined!,
    container: undefined!,
  }

  let app: Omit<IApp, 'pages'>
  let containerHook: IHook
  let page: IPage
  let btnAtom: IAtom
  let textAtom: IAtom
  let containerPmb: IPropMapBinding

  beforeAll(async () => {
    app = await testModule.createTestApp(testAppInput)
    btnAtom = await createAtom(buttonAtomInput)
    textAtom = await createAtom(textAtomInput)

    elements.buttonComponent = await createComponent({
      ...redButtonComponentInput,
      atomId: btnAtom.id,
    })

    elements.buttonText = await createElement({
      ...buttonTextElementInput,
      atomId: textAtom.id,
      parentElementId: elements.buttonComponent.id,
    })

    page = await createTestPage({ appId: app.id, ...testPageInput })

    elements.container = await createElement({
      ...containerElementInput,
      parentElementId: page.rootElementId,
    })

    containerHook = await addHook({
      ...testHookInput,
      elementId: elements.container.id,
    })

    elements.firstButton = await createElement({
      ...firstButtonInput,
      instanceOfComponentId: elements.buttonComponent.id,
      parentElementId: elements.container.id,
    })

    elements.secondButton = await createElement({
      ...secondButtonInput,
      instanceOfComponentId: elements.buttonComponent.id,
      parentElementId: elements.container.id,
    })

    elements.text = await createElement({
      ...textElementInput,
      atomId: textAtom.id,
      parentElementId: elements.container.id,
    })

    containerPmb = await createPmb({
      ...testPmbInput,
      elementId: elements.container.id,
      targetElementId: elements.text.id,
    })

    const { exportApp } = await domainRequest<
      ExportAppInput,
      TestExportAppQuery
    >(testModule.userApp, TestExportAppGql, { appId: app.id })

    importAppInput = { payload: exportApp.payload }
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
    // The operation should be idempotent, so two imports should be the same
    it.each([1, 2])('should import an App %i', async () => {
      const { importApp } = await domainRequest<
        ImportAppInput,
        TestImportAppMutation
      >(testModule.userApp, TestImportAppGql, importAppInput)

      const getElId = (elName: string) =>
        importApp.pages[0].elements?.vertices.find((v) => v.name === elName)?.id

      const getElName = (elId: string) =>
        importApp.pages[0].elements?.vertices.find((v) => v.id === elId)?.name

      const rootElementId = importApp.pages[0].rootElementId
      const containerElementId = getElId(elements.container.name as string)
      const textElementId = getElId(elements.text.name as string)
      const buttonTextId = getElId(elements.buttonText.name as string)
      const firstButtonId = getElId(elements.firstButton.name as string)
      const secondButtonId = getElId(elements.secondButton.name as string)
      const buttonComponentId = getElId(elements.buttonComponent.name as string)

      expect(textElementId).toBeTruthy()

      // Sort by name so that we get consistent results
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
        pages: expect.any(Array),
      })

      const importedPage = importApp.pages[0]

      expect(importedPage).toEqual({
        id: expect.stringContaining('0x'),
        name: page.name,
        rootElementId: expect.stringContaining('0x'),
        elements: {
          vertices: expect.any(Array),
          edges: expect.any(Array),
        },
      })

      const importedGraph = importedPage.elements

      expect(importedGraph?.vertices).toHaveLength(7)
      expect(importedGraph?.edges).toHaveLength(5)

      expect(importedGraph?.vertices).toEqual([
        {
          __typename: 'Element',
          id: buttonTextId,
          instanceOfComponent: null,
          name: elements.buttonText.name,
          css: null,
          atom: expect.objectContaining({ type: AtomType.Text }),
          componentTag: null,
          fixedId: expect.any(String),
          props: {
            data: buttonTextElementInput.props,
            id: expect.any(String),
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
          name: elements.firstButton.name,
          instanceOfComponent: { id: buttonComponentId },
          css: null,
          atom: null,
          componentTag: null,
          fixedId: expect.any(String),
          props: expect.objectContaining({ data: '{}' }),
          hooks: [],
          renderForEachPropKey: null,
          renderIfPropKey: null,
          propMapBindings: [],
          propTransformationJs: null,
        },
        {
          __typename: 'Element',
          id: buttonComponentId,
          instanceOfComponent: null,
          name: elements.buttonComponent.name,
          css: elements.buttonComponent.css,
          atom: expect.objectContaining({
            type: AtomType.HtmlButton,
            api: expect.any(Object),
            id: expect.stringContaining('0x'),
            name: buttonAtomInput.name,
          }),
          componentTag: expect.objectContaining({
            name: elements.buttonComponent.name,
            children: [],
            isRoot: true,
          }),
          props: expect.objectContaining({ data: '{}' }),
          hooks: [],
          fixedId: expect.any(String),
          renderForEachPropKey: null,
          renderIfPropKey: null,
          propMapBindings: [],
          propTransformationJs: null,
        },
        {
          __typename: 'Element',
          id: rootElementId,
          instanceOfComponent: null,
          name: 'Root element',
          css: null,
          atom: null,
          componentTag: null,
          fixedId: expect.any(String),
          props: expect.objectContaining({ data: '{}' }),
          hooks: [],
          renderForEachPropKey: null,
          renderIfPropKey: null,
          propMapBindings: [],
          propTransformationJs: null,
        },
        {
          __typename: 'Element',
          id: secondButtonId,
          instanceOfComponent: { id: buttonComponentId },
          name: elements.secondButton.name,
          css: null,
          atom: null,
          componentTag: null,
          fixedId: expect.any(String),
          props: expect.objectContaining({ data: '{}' }),
          hooks: [],
          renderForEachPropKey: null,
          renderIfPropKey: null,
          propMapBindings: [],
          propTransformationJs: null,
        },
        {
          __typename: 'Element',
          id: containerElementId,
          instanceOfComponent: null,
          name: elements.container.name,
          css: elements.container.css,
          atom: null,
          componentTag: null,
          fixedId: expect.any(String),
          props: expect.objectContaining({ data: '{}' }),
          hooks: [
            {
              config: {
                id: expect.stringContaining('0x'),
                data: testHookInput.config,
              },
              type: testHookInput.type,
              id: expect.stringContaining('0x'),
            },
          ],
          renderForEachPropKey: null,
          renderIfPropKey: null,
          propMapBindings: [
            {
              id: expect.stringContaining('0x'),
              targetElementId: textElementId,
              targetKey: testPmbInput.targetKey,
              sourceKey: testPmbInput.sourceKey,
            },
          ],
          propTransformationJs: null,
        },
        {
          __typename: 'Element',
          id: textElementId,
          instanceOfComponent: null,
          name: elements.text.name,
          css: null,
          atom: expect.objectContaining({ type: AtomType.Text }),
          componentTag: null,
          fixedId: expect.any(String),
          props: { data: '{}', id: expect.any(String) },
          hooks: [],
          renderForEachPropKey: null,
          renderIfPropKey: null,
          propMapBindings: [],
          propTransformationJs: null,
        },
      ])

      expect(importedGraph?.edges).toEqual([
        {
          order: 1,
          source: buttonComponentId,
          target: buttonTextId,
        },
        { order: 1, source: rootElementId, target: containerElementId },
        {
          order: textElementInput.order,
          source: containerElementId,
          target: textElementId,
        },
        {
          order: firstButtonInput.order,
          source: containerElementId,
          target: firstButtonId,
        },
        {
          order: secondButtonInput.order,
          source: containerElementId,
          target: secondButtonId,
        },
      ])
    })
  })

  const createAtom = (input: CreateAtomInput) =>
    domainRequest<CreateAtomInput, TestCreateAtomMutation>(
      testModule.adminApp,
      TestCreateAtomGql,
      input,
    ).then((r) => r?.createAtom)

  const createComponent = (input: CreateComponentInput) =>
    domainRequest<CreateComponentInput, TestCreateComponentMutation>(
      testModule.userApp,
      TestCreateComponentGql,
      input,
    ).then((r) => r?.createComponent)

  const createElement = (input: CreateElementInput) =>
    domainRequest<CreateElementInput, TestCreateElementMutation>(
      testModule.userApp,
      TestCreateElementGql,
      input,
    ).then((r) => r?.createElement)

  const addHook = (input: AddHookToElementInput) =>
    domainRequest<AddHookToElementInput, TestAddHookToElementMutation>(
      testModule.userApp,
      TestAddHookToElementGql,
      input,
    ).then((r) => r?.addHookToElement)

  const createPmb = (input: CreatePropMapBindingInput) =>
    domainRequest<CreatePropMapBindingInput, TestCreatePropMapBindingMutation>(
      testModule.userApp,
      TestCreatePropMapBindingGql,
      input,
    ).then((r) => r?.createPropMapBinding)

  const createTestPage = (
    input: TestCreatePageForAppExportMutationVariables['input'],
  ) =>
    domainRequest<
      TestCreatePageForAppExportMutationVariables['input'],
      TestCreatePageForAppExportMutation
    >(testModule.userApp, TestCreatePageForAppExportGql, input).then(
      (r) => r.createPage,
    )
})
