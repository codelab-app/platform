import type { IRuntimeComponentModel } from '@codelab/frontend/abstract/application'
import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/domain'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { unregisterRootStore } from 'mobx-keystone'
import { rootApplicationStore } from './setup/root.test.store'
import { TestBed } from './setup/testbed'

let testBed: TestBed

describe('Runtime Component props', () => {
  beforeEach(() => {
    testBed = TestBed.Create()
  })

  describe('RuntimeProps.props', () => {
    it('should contain system props', () => {
      const { component, renderer, runtimeComponent } = testBed.setupComponent()
      const runtimeProps = runtimeComponent.runtimeProps

      expect(runtimeProps.props).toMatchObject({
        [DATA_COMPONENT_ID]: component.id,
        key: component.id,
      })
    })

    it('should contain component props', () => {
      const { component, runtimeComponent } = testBed.setupComponent()
      const runtimeProps = runtimeComponent.runtimeProps

      expect(runtimeProps.props).toMatchObject(component.props.values)
    })

    it('should contain default props', () => {
      const { component, runtimeComponent } = testBed.setupComponent()
      const runtimeProps = runtimeComponent.runtimeProps
      const fieldKey = 'fieldKey'
      const fieldDefaultValue = '"field-value"'

      const field = testBed.addField({
        api: component.api.current,
        defaultValues: fieldDefaultValue,
        fieldType: testBed.getStringType(),
        key: fieldKey,
      })

      component.api.current.writeCache({ fields: [field] })

      expect(runtimeProps.props).toMatchObject({
        [fieldKey]: JSON.parse(fieldDefaultValue),
      })
    })
  })

  describe('RuntimeProps.evaluatedProps', () => {
    // expressions are evaluated with empty context
    it('should evaluate basic state field expression', () => {
      const { component, runtimeComponent } = testBed.setupComponent()
      const fieldKey = 'fieldKey'

      component.props.set(fieldKey, '{{10 - 2}}')

      const runtimeProps = runtimeComponent.runtimeProps

      expect(runtimeProps.evaluatedProps).toMatchObject({ [fieldKey]: 8 })
    })
  })

  describe('RuntimeProps.instanceElementProps', () => {
    it('should resolve instance element props', () => {
      const { element, runtimeElement } = testBed.setupRuntimeElement()
      const runtimeProps = runtimeElement.runtimeProps
      const component = testBed.addComponent({ name: 'component' })

      element.writeCache({
        renderType: {
          __typename: IElementRenderTypeKind.Component,
          id: component.id,
        },
      })

      const runtimeComponent = runtimeElement
        .children[0] as IRuntimeComponentModel

      const componentRuntimeProps = runtimeComponent.runtimeProps

      expect(componentRuntimeProps.instanceElementProps).toEqual(
        runtimeProps.evaluatedProps,
      )
    })

    it('should resolve child mapper prop', () => {
      const { element, runtimeElement } = testBed.setupRuntimeElement()
      const component = testBed.addComponent({ name: 'component' })
      const propKey = 'childMapperProp'
      const propsArray = ['p01', 'p02', 'p03']

      element.writeCache({
        childMapperComponent: component,
        childMapperPropKey: `props.${propKey}`,
      })

      element.props.set(propKey, propsArray)

      const runtimeChildren =
        runtimeElement.children as Array<IRuntimeComponentModel>

      expect(runtimeChildren[0]?.runtimeProps?.childMapperProp).toBe(
        propsArray[0],
      )
      expect(runtimeChildren[1]?.runtimeProps?.childMapperProp).toBe(
        propsArray[1],
      )
      expect(runtimeChildren[1]?.runtimeProps?.childMapperProp).toBe(
        propsArray[1],
      )
    })
  })

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
