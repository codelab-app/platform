import type { IRuntimeComponentModel } from '@codelab/frontend/abstract/application'
import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/domain'
import { createTestStore } from '@codelab/frontend/application/test'

let testApplication: ReturnType<typeof createTestStore>

describe('Runtime Component props', () => {
  beforeEach(() => {
    testApplication = createTestStore()
  })

  describe('RuntimeProps.props', () => {
    it('should contain system props', () => {
      const { component, renderer, runtimeComponent } =
        testApplication.setupComponent()

      const runtimeProps = runtimeComponent.runtimeProps

      expect(runtimeProps.props).toMatchObject({
        [DATA_COMPONENT_ID]: component.id,
        key: component.id,
      })
    })

    it('should contain component props', () => {
      const { component, runtimeComponent } = testApplication.setupComponent()
      const runtimeProps = runtimeComponent.runtimeProps

      expect(runtimeProps.props).toMatchObject(component.props.values)
    })

    it('should contain default props', () => {
      const { component, runtimeComponent } = testApplication.setupComponent()
      const runtimeProps = runtimeComponent.runtimeProps
      const fieldKey = 'fieldKey'
      const fieldDefaultValue = '"field-value"'

      const field = testApplication.addField({
        api: component.api.current,
        defaultValues: fieldDefaultValue,
        fieldType: testApplication.getStringType(),
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
      const { component, runtimeComponent } = testApplication.setupComponent()
      const fieldKey = 'fieldKey'

      component.props.set(fieldKey, '{{10 - 2}}')

      const runtimeProps = runtimeComponent.runtimeProps

      expect(runtimeProps.evaluatedProps).toMatchObject({ [fieldKey]: 8 })
    })
  })

  describe('RuntimeProps.instanceElementProps', () => {
    it('should resolve instance element props', () => {
      const { runtimeRootElement } = testApplication.setupRuntimeComponent()
      const runtimeProps = runtimeRootElement.runtimeProps

      const runtimeComponent = runtimeRootElement
        .children[0] as IRuntimeComponentModel

      const componentRuntimeProps = runtimeComponent.runtimeProps

      expect(componentRuntimeProps.instanceElementProps).toEqual(
        runtimeProps.evaluatedProps,
      )
    })

    it('should resolve child mapper prop', () => {
      const { component, rendered, rootElement, runtimeRootElement } =
        testApplication.setupRuntimeComponent()

      const propKey = 'childMapperProp'
      const propsValue = ['p01', 'p02', 'p03']

      rootElement.writeCache({
        childMapperComponent: component,
        childMapperPropKey: `props.${propKey}`,
      })

      rootElement.props.set(propKey, propsValue)

      const runtimeChildren =
        runtimeRootElement.children as Array<IRuntimeComponentModel>

      expect(runtimeChildren[0]?.runtimeProps?.childMapperProp).toBe(
        propsValue[0],
      )
      expect(runtimeChildren[1]?.runtimeProps?.childMapperProp).toBe(
        propsValue[1],
      )
      expect(runtimeChildren[1]?.runtimeProps?.childMapperProp).toBe(
        propsValue[1],
      )
    })
  })

  afterAll(() => {
    testApplication.teardown()
  })
})
