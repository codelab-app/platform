import { Validator } from '../validation/validator'
import { TIpv4 } from './ipv4.schema'

describe('Ipv4 Schema', () => {
  it('should validate a valid IPv4 address', () => {
    expect(Validator.validate(TIpv4, '192.168.0.1')).toBeTruthy()
    expect(Validator.validate(TIpv4, '10.0.0.1')).toBeTruthy()
    expect(Validator.validate(TIpv4, '172.16.0.1')).toBeTruthy()
  })

  it('should not validate an invalid IPv4 address', () => {
    expect(Validator.validate(TIpv4, '256.0.0.1')).toBeFalsy()
    expect(Validator.validate(TIpv4, '192.168.0')).toBeFalsy()
    expect(Validator.validate(TIpv4, '192.168.0.1.5')).toBeFalsy()
    expect(Validator.validate(TIpv4, 'invalid')).toBeFalsy()
  })

  it('should not validate non-string values', () => {
    expect(Validator.validate(TIpv4, 123)).toBeFalsy()
    expect(Validator.validate(TIpv4, null)).toBeFalsy()
    expect(Validator.validate(TIpv4, undefined)).toBeFalsy()
    expect(Validator.validate(TIpv4, {})).toBeFalsy()
  })

  it('should assert a valid IPv4 address', () => {
    expect(() => Validator.asserts(TIpv4, '192.168.0.1')).not.toThrow()
  })

  it('should throw an error when asserting an invalid IPv4 address', () => {
    expect(() => Validator.asserts(TIpv4, 'invalid')).toThrow()
  })
})
