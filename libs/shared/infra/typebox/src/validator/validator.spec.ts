import type { ValueErrorIterator } from '@sinclair/typebox/build/cjs/errors'

import { Type } from '@sinclair/typebox'
import { ValidationException } from 'typebox-validators'

import { NestedValidator } from './nested-validator'

describe('NestedValidator', () => {
  describe('when validating simple objects', () => {
    const schema = Type.Object({
      age: Type.Number(),
      name: Type.String(),
    })

    it('should validate and clean valid data', () => {
      const input = {
        age: 30,
        extraField: 'should be removed',
        name: 'John',
      }

      const validator = new NestedValidator(schema)
      const result = validator.validateAndClean(input)

      expect(result).toEqual({
        age: 30,
        name: 'John',
      })
    })

    it('should throw error for invalid data', () => {
      const input = {
        // should be string
        age: '30',
        // should be number
        name: 123,
      }

      const validator = new NestedValidator(schema)

      expect(() => validator.validateAndClean(input)).toThrow()
    })
  })

  describe('when validating nested objects', () => {
    const schema = Type.Object({
      user: Type.Object({
        address: Type.Object({
          city: Type.String(),
        }),
        name: Type.String(),
      }),
    })

    it('should validate and clean nested objects', () => {
      const input = {
        user: {
          address: {
            city: 'New York',
            // should be removed
            country: 'USA',
          },
          // should be removed
          extra: 'field',
          name: 'John',
        },
      }

      const validator = new NestedValidator(schema)
      const result = validator.validateAndClean(input)

      expect(result).toEqual({
        user: {
          address: {
            city: 'New York',
          },
          name: 'John',
        },
      })
    })
  })

  describe('when validating arrays', () => {
    const schema = Type.Object({
      tags: Type.Array(Type.String()),
    })

    it('should validate and clean arrays', () => {
      const input = {
        tags: ['one', 'two', 'three'],
      }

      const validator = new NestedValidator(schema)
      const result = validator.validateAndClean(input)

      expect(result).toEqual({
        tags: ['one', 'two', 'three'],
      })
    })

    it('should throw error for invalid array items', () => {
      const input = {
        // 2 should be string
        tags: ['one', 2, 'three'],
      }

      const validator = new NestedValidator(schema)

      expect(() => validator.validateAndClean(input)).toThrow()
    })
  })

  describe('when validating discriminated unions', () => {
    const schema = Type.Union(
      [
        Type.Object({
          bark: Type.String(),
          type: Type.Literal('dog'),
        }),
        Type.Object({
          meow: Type.String(),
          type: Type.Literal('cat'),
        }),
      ],
      { discriminantKey: 'type' },
    )

    it('should validate dog type correctly', () => {
      const input = {
        bark: 'woof',
        // should be removed
        extra: 'field',
        type: 'dog',
      }

      const validator = new NestedValidator(schema)
      const result = validator.validateAndClean(input)

      expect(result).toEqual({
        bark: 'woof',
        type: 'dog',
      })
    })

    it('should validate cat type correctly', () => {
      const input = {
        // should be removed
        extra: 'field',
        meow: 'meow',
        type: 'cat',
      }

      const validator = new NestedValidator(schema)
      const result = validator.validateAndClean(input)

      expect(result).toEqual({
        meow: 'meow',
        type: 'cat',
      })
    })

    it('should throw error for invalid discriminant', () => {
      const input = {
        // invalid type
        tweet: 'tweet',
        type: 'bird',
      }

      const validator = new NestedValidator(schema)

      expect(() => validator.validateAndClean(input)).toThrow()
    })

    it('should throw error with validation message', () => {
      const input = {
        // invalid type
        tweet: 'tweet',
        type: 'bird',
      }

      try {
        const validator = new NestedValidator(schema)

        validator.validateAndClean(input)
      } catch (error: unknown) {
        if (error instanceof ValidationException) {
          console.log('Validation error:', error)

          for (const err of error.details) {
            for (const valueError of err.errors) {
              // Option 1: Using First() to get just the first error
              console.log(valueError.First())

              // Option 2: Using Symbol.iterator to get all errors
              for (const _error of valueError[Symbol.iterator]()) {
                console.log(_error)
              }
            }
          }
        }
      }
    })
  })
})
