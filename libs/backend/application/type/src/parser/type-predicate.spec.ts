import {
  isActionType,
  isEnumType,
  isInterfaceType,
  isPrimitiveType,
  isReactNodeType,
  isUnionType,
} from './type-predicates'

describe('Type predicates', () => {
  describe('EnumType', () => {
    it('is an EnumType', () => {
      // Ant Design Button.size
      const actual = 'large | middle | small'

      expect(isEnumType(actual)).toBeTruthy()
    })

    it('is not an EnumType', () => {
      // ConfigProvider.space
      const actual = '{ size: small | middle | large | number }'

      expect(isEnumType(actual)).toBeFalsy()
    })
  })

  describe('ReactNodeType', () => {
    it('is an arrow function HTMLElement return type', () => {
      // ConfigProvider.getTargetContainer
      const actual = '() => HTMLElement'

      expect(isReactNodeType(actual)).toBeTruthy()
    })

    it('is a React function component', () => {
      // ConfigProvider.renderEmpty
      const actual = 'function(componentName: string): ReactNode'

      expect(isReactNodeType(actual)).toBeTruthy()
    })

    it('is a ReactNode', () => {
      // Form.Item.label
      const actual = 'ReactNode'

      expect(isReactNodeType(actual)).toBeTruthy()
    })

    it('is not a ReactNodeType', () => {
      const actual = '{ size: small | middle | large | number }'

      expect(isReactNodeType(actual)).toBeFalsy()
    })
  })

  describe('ActionType', () => {
    it('is a function type', () => {
      // Form.Item.getValueFromEvent
      const func1 = '(..args: any[]) => any'
      const func2 = '(value, prevValue, prevValues) => any'
      const func3 = 'function({ item, key, keyPath, domEvent })'
      const func4 = '(event) => void'

      expect(isActionType(func1)).toBeTruthy()
      expect(isActionType(func2)).toBeTruthy()
      expect(isActionType(func3)).toBeTruthy()
      expect(isActionType(func4)).toBeTruthy()
    })
  })

  describe('PrimitiveType', () => {
    it('is a PrimitiveType', () => {
      const number = 'number'
      const boolean = 'boolean'
      const string = 'string'
      const integer = 'integer'

      expect(isPrimitiveType(number)).toBeTruthy()
      expect(isPrimitiveType(boolean)).toBeTruthy()
      expect(isPrimitiveType(string)).toBeTruthy()
      expect(isPrimitiveType(integer)).toBeTruthy()
    })
  })

  describe('UnionType', () => {
    it('is a UnionType', () => {
      // Form.Item.shouldUpdate
      const actual = 'boolean | (prevValue, curValue) => boolean'

      expect(isUnionType(actual)).toBeTruthy()
    })

    it('is not a UnionType', () => {
      const notUnionType = '{ ghost: boolean }'
      const notUnionType1 = '{ size: small | middle | large | number }'

      expect(isUnionType(notUnionType)).toBeFalsy()
      expect(isUnionType(notUnionType1)).toBeFalsy()
    })
  })

  describe('InterfaceType', () => {
    it('is an InterfaceType', () => {
      // ConfigProvider.space
      const actual = '{ size: small | middle | large | number }'

      expect(isInterfaceType(actual)).toBeTruthy()
    })
  })
})
