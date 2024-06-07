import { Typebox } from '@codelab/shared/abstract/typebox'
import { Kind, type TSchema, TypeGuard, TypeRegistry } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { v4 } from 'uuid'
import { ajv, assertIsRef, isIRef } from './ref.utils'

describe('Ref', () => {
  it('should throw an error if not a ref type', () => {
    const validate = ajv.compile(Typebox.Ref)

    expect(validate(true)).toBeFalsy()
    expect(validate({ id: 123 })).toBeFalsy()
  })

  it('should pass if a ref type', () => {
    const validate = ajv.compile(Typebox.Ref)

    const validated = validate({
      id: v4(),
    })

    expect(validated).toBeTruthy()
  })

  it('should allow type guards', () => {
    const Guard = { [Kind]: 'String', type: 'string' }

    expect(TypeGuard.IsString(Guard)).toBe(true)
  })

  it('can check a built-in object type', () => {
    expect(Value.Check(Typebox.Ref, { id: v4() })).toBeTruthy()
    expect(Value.Check(Typebox.Ref, { id: 0 })).toBeFalsy()
    expect(Value.Check(Typebox.Ref, false)).toBeFalsy()
  })

  it('should allow type guards for custom type', () => {
    const ref = '@codelab/Ref'
    const Ref = { [Kind]: ref } as TSchema

    const user = {
      id: v4(),
      ...Ref,
    }

    /**
     * Register custom kind to typebox, which allows us to validate
     */
    TypeRegistry.Set(ref, (schema, value) => {
      return isIRef(value)
    })

    expect(Value.Check(Ref, true)).toBeFalsy()
    expect(Value.Check(Ref, user)).toBeTruthy()

    expect(() => Value.Decode(Ref, true)).toThrow()
    expect(() => Value.Decode(Ref, user)).not.toThrow()

    expect(TypeGuard.IsKindOf(user, ref)).toBeTruthy()
  })

  it('should assert or throw', () => {
    expect(() => {
      assertIsRef({ id: 4 })
    }).toThrow()
  })
})
