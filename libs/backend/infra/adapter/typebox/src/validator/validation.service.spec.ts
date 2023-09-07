import { IAtomOutputDto } from '@codelab/backend/abstract/core'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { IAtomDTO } from '@codelab/shared/abstract/core'
import { Typebox } from '@codelab/shared/infra/validation'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { TSchema } from '@sinclair/typebox'
import { TString } from '@sinclair/typebox'
import affixJson from 'data/export-v2/admin/atoms/AntDesignAffix.json'
import { ValidationService } from './validation.service'

describe('ValidationService', () => {
  let validationService: ValidationService
  let traceService: TraceService

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
    traceService = module.get<TraceService>(TraceService)
  })

  describe('validateAndClean', () => {
    it('should validate and clean the input correctly', () => {
      const result = validationService.validateAndClean(
        IAtomOutputDto,
        affixJson,
      )

      console.log(affixJson, result)

      expect(result).toEqual(affixJson)
    })

    // it('should throw an error for invalid input', () => {
    //   const schema: TSchema = TString()
    //   const input = 123 // This is a number, should be a string

    //   expect(() => validationService.validateAndClean(schema, input)).toThrow()
    // })
  })
})
