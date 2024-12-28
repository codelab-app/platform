import { Validator } from '../validator/validator'
import { TDefined } from './defined.schema'

describe('Defined Schema', () => {
  it('should validate non-null and non-undefined values', () => {
    expect(Validator.validate(TDefined, 0)).toBeTruthy()
    expect(Validator.validate(TDefined, '')).toBeTruthy()
    expect(Validator.validate(TDefined, false)).toBeTruthy()
    expect(Validator.validate(TDefined, {})).toBeTruthy()
    expect(Validator.validate(TDefined, [])).toBeTruthy()
  })

  it('should not validate null or undefined values', () => {
    expect(Validator.validate(TDefined, null)).toBeFalsy()
    expect(Validator.validate(TDefined, undefined)).toBeFalsy()
  })

  it('should assert non-null and non-undefined values', () => {
    expect(() => Validator.asserts(TDefined, 42)).not.toThrow()
    expect(() => Validator.asserts(TDefined, 'test')).not.toThrow()
  })

  it('should throw when asserting null or undefined values', () => {
    expect(() => Validator.asserts(TDefined, null)).toThrow()
    expect(() => Validator.asserts(TDefined, undefined)).toThrow()
  })

  describe('parseDefined', () => {
    it('should parse non-null and non-undefined values', () => {
      expect(Validator.parseDefined(42)).toBe(42)
      expect(Validator.parseDefined('test')).toBe('test')
      expect(Validator.parseDefined({})).toEqual({})
      expect(Validator.parseDefined([])).toEqual([])
    })

    it('should throw when parsing null or undefined values', () => {
      expect(() => Validator.parseDefined(null)).toThrow()
      expect(() => Validator.parseDefined(undefined)).toThrow()
    })
  })
})
