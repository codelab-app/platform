import { TraceService } from '@codelab/backend/infra/adapter/otel'
import {
  IActionType,
  IAtomAggregate,
  IPrimitiveType,
} from '@codelab/shared/abstract/core'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { TSchema } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import affixJson from 'data/export-v3/admin/atoms/AntDesignAffix.json'
import omit from 'lodash/omit'
import { ValidationService } from './validation.service'

describe('ValidationService', () => {
  let validationService: ValidationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidationService,
        {
          provide: TraceService,
          useValue: {
            addEvent: jest.fn(),
            addJsonAttributes: jest.fn(),
          },
        },
      ],
    }).compile()

    validationService = module.get<ValidationService>(ValidationService)
  })

  describe('validateAndClean', () => {
    it('should validate and clean the input correctly', () => {
      const result = validationService.validateAndClean(
        IAtomAggregate,
        affixJson,
      )

      expect(result).toEqual({
        api: omit(affixJson.api, 'kind', 'name', '__typename'),
        atom: omit(affixJson.atom, 'owner'),
      })
    })

    it('should throw an error for invalid input', () => {
      const schema: TSchema = Type.String()
      const input = 123

      expect(() => validationService.validateAndClean(schema, input)).toThrow()
    })
  })

  describe('union validation', () => {
    const schema = Type.Union([
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
        validationService.validateAndClean(schema, data),
      ).not.toThrow()
    })

    it('should throw a union', () => {
      const data = {
        kind: 'string',
        val: 2,
      }

      expect(() => validationService.validateAndClean(schema, data)).toThrow()
    })

    it('should work on type output', () => {
      const data = {
        __typename: 'PrimitiveType',
        id: '44c7df30-5f72-45ca-a3d1-d08f21ad34ba',
        kind: 'PrimitiveType',
        name: 'Boolean',
        primitiveKind: 'Boolean',
      }

      const UnionSchema = Type.Union([IPrimitiveType, IActionType], {
        discriminantKey: '__typename',
      })

      expect(() =>
        validationService.validateAndClean(UnionSchema, data),
      ).not.toThrow()
    })
  })
})
