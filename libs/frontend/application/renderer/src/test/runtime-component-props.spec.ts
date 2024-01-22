import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/domain'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { unregisterRootStore } from 'mobx-keystone'
import { setupComponent } from './setup'
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
    // most expressions aren't allowed
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

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
