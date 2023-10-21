import type { IRenderOutput } from '@codelab/frontend/abstract/domain'
import {
  CUSTOM_TEXT_PROP_KEY,
  rendererRef,
} from '@codelab/frontend/abstract/domain'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import {
  IAtomType,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { factoryBuild } from './factory'
import { setupPage } from './setup'
import { createTestRootStore } from './setup/test-root-store'

describe('Renderer', () => {
  const rootStore = createTestRootStore()
  const componentId = 'component-id'
  const componentName = 'The Component'
  const testPropKey = 'testPropKey'
  const componentPropValue = 'from component prop'
  const componentStorePropValue = 'from component store prop'
  const componentInstancePropValue = 'from component instance prop'
  const componentRootElementAtomType = IAtomType.Text

  const componentRootElementPropData = {
    componentProp: 'original',
    [CUSTOM_TEXT_PROP_KEY]: "I'm a component",
    expressionProp: `expression value - {{componentProps.${testPropKey} ?? state.${testPropKey}}}`,
  }

  beforeEach(() => {
    rootStore.clear()
  })

  it.each([
    // where the prop value will come from : expected evaluated value
    ['component', componentPropValue],
    // ['store', componentStorePropValue],
    // ['instance', componentInstancePropValue],
    // ['all', componentInstancePropValue],
  ])(
    'should render component instance with prop expression evaluated with %s props',
    async (propSource, expectedEvaluatedValue) => {
      // mock these to skip API calls with `createElementAsFirstChild`
      jest
        .spyOn(rootStore.elementService.elementRepository, 'add')
        .mockImplementation()

      jest
        .spyOn(rootStore.elementService.elementRepository, 'updateNodes')
        .mockImplementation()

      const { rootElement: pageRootElement } = setupPage()

      const componentRootElement = factoryBuild('element', {
        closestContainerNode: {
          id: componentId,
        },
        name: `${componentName} Root`,
        parentComponent: { id: componentId },
        props: factoryBuild('props', {
          data: JSON.stringify(componentRootElementPropData),
        }),
        renderType: factoryBuild('atom', {
          api: factoryBuild('typeInterface'),
          type: componentRootElementAtomType,
        }),
      })

      const componentStoreApi = factoryBuild('typeInterface')

      const component = factoryBuild('component', {
        api: factoryBuild('typeInterface'),
        childrenContainerElement: componentRootElement,
        id: componentId,
        name: componentName,
        props: factoryBuild('props', {
          data: JSON.stringify({
            [testPropKey]:
              propSource === 'component' || propSource === 'all'
                ? componentPropValue
                : undefined,
          }),
        }),
        rootElement: componentRootElement,
        store: factoryBuild('store', {
          api: componentStoreApi,
        }),
      })

      console.log('component props', component.props)

      const componentStore = await rootStore.storeService.getOne(
        component.store.id,
      )

      componentStore?.api.current.writeCache({
        fields: [
          factoryBuild('field', {
            api: componentStoreApi,
            defaultValues:
              propSource === 'store' || propSource === 'all'
                ? componentStorePropValue
                : undefined,
            key: testPropKey,
            type: factoryBuild('typePrimitive', {
              name: PrimitiveTypeKind.String,
              primitiveKind: PrimitiveTypeKind.String,
            }),
          }),
        ],
      })

      const componentElement = factoryBuild('element', {
        closestContainerNode: component,
        parentComponent: component,
        parentElement: pageRootElement,
        props: factoryBuild('props', {
          data: JSON.stringify({
            [testPropKey]:
              propSource === 'instance' || propSource === 'all'
                ? componentInstancePropValue
                : undefined,
          }),
        }),
        renderType: {
          __typename: IElementRenderTypeKind.Component,
          id: component.id,
        },
      })

      const componentInstance = await rootStore.elementService.createElement(
        componentElement,
      )

      // The renderer for the component is already added as part of the componentService.add logic
      // so we just need to get that here, and it should already exist
      rootStore.renderService.setActiveRenderer(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        rendererRef(rootStore.renderService.renderers.get(component.id)!),
      )

      const { atomType, element, props } =
        rootStore.renderService.activeRenderer?.current.renderIntermediateElement(
          componentInstance,
        ) as IRenderOutput

      expect(atomType).toBe(componentRootElementAtomType)
      expect(element.renderType.id).toBe(componentRootElement.renderType.id)
      expect(props).toMatchObject({
        ...componentRootElementPropData,
        expressionProp: `expression value - ${expectedEvaluatedValue}`,
      })
    },
  )
})
