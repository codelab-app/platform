import type { IRuntimeContainerNodeModel } from '@codelab/frontend/abstract/application'
import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/domain'
import {
  IElementRenderTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { unregisterRootStore } from 'mobx-keystone'
import { setupComponent, setupRuntimeElement } from './setup'
import { rootApplicationStore } from './setup/root.test.store'
import { TestBed } from './setup/testbed'

let testbed: TestBed

describe('Runtime Component props', () => {
  beforeEach(() => {
    testbed = new TestBed()
  })

  afterEach(() => {
    rootApplicationStore.clear()
  })

  describe('RuntimeProps.props', () => {
    it('should contain system props', () => {
      const { rendererService } = rootApplicationStore
      const { component } = setupComponent(testbed)
      const runtimeComponent = rendererService.runtimeContainerNode(component)
      const runtimeProps = runtimeComponent?.componentRuntimeProp

      expect(runtimeProps?.props).toMatchObject({
        [DATA_COMPONENT_ID]: component.id,
        key: component.id,
      })
    })

    it('should contain component props', () => {
      const { rendererService } = rootApplicationStore
      const { component } = setupComponent(testbed)
      const runtimeComponent = rendererService.runtimeContainerNode(component)
      const runtimeProps = runtimeComponent?.componentRuntimeProp

      expect(runtimeProps?.props).toMatchObject(component.props.values)
    })

    it('should contain default props', () => {
      const { rendererService, typeService } = rootApplicationStore
      const { component } = setupComponent(testbed)
      const runtimeComponent = rendererService.runtimeContainerNode(component)
      const runtimeProps = runtimeComponent?.componentRuntimeProp
      const fieldKey = 'fieldKey'
      const fieldDefaultValue = '"field-value"'

      const field = testbed.addField({
        api: component.api.current,
        defaultValues: fieldDefaultValue,
        fieldType: typeService.typeDomainService.typesList.find(
          (type) =>
            type.kind === ITypeKind.PrimitiveType &&
            type.primitiveKind === IPrimitiveTypeKind.String,
        ),
        key: fieldKey,
      })

      component.api.current.writeCache({ fields: [field] })

      expect(runtimeProps?.props).toMatchObject({
        [fieldKey]: JSON.parse(fieldDefaultValue),
      })
    })
  })

  describe('RuntimeProps.evaluatedProps', () => {
    // expressions are evaluated with empty context
    it('should evaluate basic state field expression', () => {
      const { rendererService } = rootApplicationStore
      const { component } = setupComponent(testbed)
      const runtimeComponent = rendererService.runtimeContainerNode(component)
      const fieldKey = 'fieldKey'

      component.props.set(fieldKey, '{{10 - 2}}')

      expect(
        runtimeComponent?.componentRuntimeProp?.evaluatedProps,
      ).toMatchObject({
        [fieldKey]: 8,
      })
    })
  })

  describe('RuntimeProps.instanceElementProps', () => {
    it('should resolve instance element props', () => {
      const { runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
      const component = testbed.addComponent({ name: 'component' })

      runtimeElement?.element.current.writeCache({
        renderType: {
          __typename: IElementRenderTypeKind.Component,
          id: component.id,
        },
      })

      const runtimeComponent = runtimeElement
        ?.children[0] as IRuntimeContainerNodeModel

      const componentRuntimeProps = runtimeComponent.componentRuntimeProp

      expect(componentRuntimeProps?.instanceElementProps).toEqual(
        runtimeProps?.evaluatedProps,
      )
    })

    it('should resolve child mapper prop', () => {
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const component = testbed.addComponent({ name: 'component' })
      const propKey = 'childMapperProp'
      const propsArray = ['p01', 'p02', 'p03']

      element.writeCache({
        childMapperComponent: component,
        childMapperPropKey: `props.${propKey}`,
      })

      element.props.set(propKey, propsArray)

      const runtimeChildren =
        runtimeElement?.children as Array<IRuntimeContainerNodeModel>

      expect(runtimeChildren[0]?.componentRuntimeProp?.childMapperProp).toBe(
        propsArray[0],
      )
      expect(runtimeChildren[1]?.componentRuntimeProp?.childMapperProp).toBe(
        propsArray[1],
      )
      expect(runtimeChildren[1]?.componentRuntimeProp?.childMapperProp).toBe(
        propsArray[1],
      )
    })

    it('should resolve child mapper prop', () => {
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const component = testbed.addComponent({ name: 'component' })
      const propKey = 'childMapperProp'
      const propsArray = ['p01', 'p02', 'p03']

      element.writeCache({
        childMapperComponent: component,
        childMapperPropKey: `props.${propKey}`,
      })

      element.props.set(propKey, propsArray)

      const runtimeChildren =
        runtimeElement?.children as Array<IRuntimeContainerNodeModel>

      expect(runtimeChildren[0]?.componentRuntimeProp?.childMapperProp).toBe(
        propsArray[0],
      )
      expect(runtimeChildren[1]?.componentRuntimeProp?.childMapperProp).toBe(
        propsArray[1],
      )
      expect(runtimeChildren[1]?.componentRuntimeProp?.childMapperProp).toBe(
        propsArray[1],
      )
    })
  })

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
