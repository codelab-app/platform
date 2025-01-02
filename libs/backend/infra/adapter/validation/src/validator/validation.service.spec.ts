import type { TestingModule } from '@nestjs/testing'

import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import {
  ActionTypeSchema,
  AtomExportSchema,
  PrimitiveTypeSchema,
} from '@codelab/shared/abstract/core'
import { Test } from '@nestjs/testing'
import { Type } from '@sinclair/typebox'
// eslint-disable-next-line @nx/enforce-module-boundaries
import affixJson from 'data/export-v3/admin/atoms/AntDesignAffix.json'

import { ValidationService } from './validation.service'

describe('ValidationService', () => {
  let validationService: ValidationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CodelabLoggerModule],
      providers: [ValidationService],
    }).compile()

    validationService = module.get<ValidationService>(ValidationService)
  })

  describe('validateAndClean', () => {
    it('should validate and clean the input correctly', () => {
      const result = validationService.validateAndClean(
        AtomExportSchema,
        affixJson,
      )

      expect(result).toEqual({
        api: affixJson.api,
        atom: affixJson.atom,
      })
    })

    it('should throw an error for invalid input', () => {
      const stringSchema = Type.String()
      const input = 123

      expect(() =>
        validationService.validateAndClean(stringSchema, input),
      ).toThrow()
    })
  })

  describe('union validation', () => {
    const unionSchema = Type.Union([
      Type.Object({
        kind: Type.Literal('string'),
        val: Type.String(),
      }),
      Type.Object({
        kind: Type.Literal('integer'),
        units: Type.Optional(Type.String()),
        val: Type.Integer(),
      }),
    ])

    it('should validate a union', () => {
      const data = {
        kind: 'string',
        val: 'some data',
      }

      expect(() =>
        validationService.validateAndClean(unionSchema, data),
      ).not.toThrow()
    })

    it('should throw a union', () => {
      const data = {
        kind: 'string',
        val: 2,
      }

      expect(() =>
        validationService.validateAndClean(unionSchema, data),
      ).toThrow()
    })

    it('should work on type output', () => {
      const data = {
        __typename: 'PrimitiveType',
        id: '44c7df30-5f72-45ca-a3d1-d08f21ad34ba',
        kind: 'PrimitiveType',
        name: 'Boolean',
        owner: {
          id: '',
        },
        primitiveKind: 'Boolean',
      }

      const UnionSchema = Type.Union([PrimitiveTypeSchema, ActionTypeSchema], {
        discriminantKey: '__typename',
      })

      expect(() =>
        validationService.validateAndClean(UnionSchema, data),
      ).not.toThrow()
    })
  })
})
