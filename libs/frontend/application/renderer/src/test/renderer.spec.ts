import type { IRenderOutput } from '@codelab/frontend/abstract/application'
import { rendererRef } from '@codelab/frontend/abstract/application'
import { CUSTOM_TEXT_PROP_KEY } from '@codelab/frontend/abstract/domain'
import { atomFactory } from '@codelab/frontend/domain/atom'
import { componentFactory } from '@codelab/frontend/domain/component'
import { elementFactory } from '@codelab/frontend/domain/element'
import { propFactory } from '@codelab/frontend/domain/prop'
import { storeFactory } from '@codelab/frontend/domain/store'
import {
  fieldFactory,
  interfaceTypeFactory,
  primitiveTypeFactory,
} from '@codelab/frontend/domain/type'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import {
  IAtomType,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { setupPage } from './setup'
import { rootApplicationStore, rootDomainStore } from './setup/root.test.store'

describe('Renderer', () => {
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
    rootDomainStore.clear()
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
      const { rootElement: pageRootElement } = setupPage()

      const componentRootElement = elementFactory(rootDomainStore)({
        closestContainerNode: {
          id: componentId,
        },
        name: `${componentName} Root`,
        parentComponent: { id: componentId },
        props: propFactory(rootDomainStore)({
          data: JSON.stringify(componentRootElementPropData),
        }).toJson,
        renderType: atomFactory(rootDomainStore)({
          api: interfaceTypeFactory(rootDomainStore)({}),
          type: componentRootElementAtomType,
        }),
      })

      const componentStoreApi = interfaceTypeFactory(rootDomainStore)()

      const component = componentFactory(rootDomainStore)({
        api: interfaceTypeFactory(rootDomainStore)(),
        childrenContainerElement: componentRootElement,
        id: componentId,
        name: componentName,
        props: propFactory(rootDomainStore)({
          data: JSON.stringify({
            [testPropKey]:
              propSource === 'component' || propSource === 'all'
                ? componentPropValue
                : undefined,
          }),
        }).toJson,
        rootElement: componentRootElement,
        store: storeFactory(rootDomainStore)({
          api: componentStoreApi,
        }),
      })

      console.log('component props', component.props)

      const componentStore = rootDomainStore.storeDomainService.stores.get(
        component.store.id,
      )

      componentStore?.api.current.writeCache({
        fields: [
          fieldFactory(rootDomainStore)({
            api: componentStoreApi,
            defaultValues:
              propSource === 'store' || propSource === 'all'
                ? componentStorePropValue
                : undefined,
            fieldType: primitiveTypeFactory(rootDomainStore)({
              name: PrimitiveTypeKind.String,
              primitiveKind: PrimitiveTypeKind.String,
            }),
            key: testPropKey,
          }),
        ],
      })

      const componentElement = elementFactory(rootDomainStore)({
        closestContainerNode: component,
        parentComponent: component,
        parentElement: pageRootElement,
        props: propFactory(rootDomainStore)({
          data: JSON.stringify({
            [testPropKey]:
              propSource === 'instance' || propSource === 'all'
                ? componentInstancePropValue
                : undefined,
          }),
        }).toJson,
        renderType: {
          __typename: IElementRenderTypeKind.Component,
          id: component.id,
        },
      })

      const componentInstance =
        await rootDomainStore.elementDomainService.hydrate(
          componentElement.toJson,
        )

      // The renderer for the component is already added as part of the componentService.add logic
      // so we just need to get that here, and it should already exist
      rootApplicationStore.rendererService.setActiveRenderer(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        rendererRef(
          rootApplicationStore.rendererService.renderers.get(component.id)!,
        ),
      )

      const { atomType, props, runtimeElement } =
        rootApplicationStore.rendererService.activeRenderer?.current.renderIntermediateElement(
          componentInstance,
        ) as IRenderOutput

      expect(atomType).toBe(componentRootElementAtomType)
      expect(runtimeElement.element.renderType.id).toBe(
        componentRootElement.renderType.id,
      )
      expect(props).toMatchObject({
        ...componentRootElementPropData,
        expressionProp: `expression value - ${expectedEvaluatedValue}`,
      })
    },
  )
})
