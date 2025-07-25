import { type IRuntimeComponentModel } from '@codelab/frontend-abstract-application'
import { DATA_COMPONENT_ID } from '@codelab/frontend-abstract-domain'
import { createTestStore } from '@codelab/frontend-infra-mobx-store'

describe('Runtime Component props', () => {
  let testStore: ReturnType<typeof createTestStore>['rootStore']

  beforeEach(() => {
    testStore = createTestStore().rootStore
  })

  afterEach(() => {
    testStore.teardown()
  })

  describe('RuntimeProps.props', () => {
    it('should contain system props', () => {
      const { component, renderer, runtimeComponent } =
        testStore.setupComponent()

      const runtimeProps = runtimeComponent?.runtimeProps

      expect(runtimeProps?.props).toMatchObject({
        [DATA_COMPONENT_ID]: component.id,
        key: runtimeComponent?.compositeKey,
      })
    })

    it('should contain component props', () => {
      const { component, runtimeComponent } = testStore.setupComponent()
      const runtimeProps = runtimeComponent?.runtimeProps

      expect(runtimeProps?.props).toMatchObject(component.props.values)
    })

    it('should contain default props', () => {
      const { component, runtimeComponent } = testStore.setupComponent()
      const runtimeProps = runtimeComponent?.runtimeProps
      const fieldKey = 'fieldKey'
      const fieldDefaultValue = '"field-value"'

      const field = testStore.addField({
        api: component.api.current,
        defaultValues: fieldDefaultValue,
        fieldType: testStore.getStringType(),
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
      const { component, renderer, runtimeComponent } =
        testStore.setupComponent()

      const fieldKey = 'fieldKey'

      component.props.set(fieldKey, '{{10 - 2}}')

      renderer.render()

      const runtimeProps = runtimeComponent?.runtimeProps

      expect(runtimeProps?.evaluatedProps).toMatchObject({ [fieldKey]: 8 })
    })
  })

  describe('RuntimeProps.instanceElementProps', () => {
    it('should resolve instance element props', () => {
      const { runtimeRootElement } = testStore.setupRuntimeComponent()
      const runtimeProps = runtimeRootElement?.current.runtimeProps

      const runtimeComponent = runtimeRootElement?.current.children[0]
        ?.current as IRuntimeComponentModel

      const componentRuntimeProps = runtimeComponent.runtimeProps

      expect(componentRuntimeProps.instanceElementProps).toEqual(
        runtimeProps?.evaluatedProps,
      )
    })

    it('should resolve child mapper prop', () => {
      const { renderer, rootElement, runtimeRootElement } =
        testStore.setupRuntimeElement()

      const component = testStore.addComponent({})
      const propKey = 'childMapperProp'
      const propsValue = ['p01', 'p02', 'p03']

      rootElement.writeCache({
        childMapperComponent: component,
        childMapperPropKey: `props.${propKey}`,
      })

      rootElement.props.set(propKey, propsValue)

      renderer.render()

      const runtimeChildren = runtimeRootElement.current.children.map(
        (childComponent) => childComponent.current,
      ) as Array<IRuntimeComponentModel>

      expect(runtimeChildren[0]?.runtimeProps.childMapperProp).toBe(
        propsValue[0],
      )
      expect(runtimeChildren[1]?.runtimeProps.childMapperProp).toBe(
        propsValue[1],
      )
      expect(runtimeChildren[2]?.runtimeProps.childMapperProp).toBe(
        propsValue[2],
      )
    })
  })
})
