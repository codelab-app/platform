import type { IValidationService } from '@codelab/shared/abstract/infra'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { FormatRegistry } from '@sinclair/typebox'

import {
  AllOrNoneSchema,
  AllSchema,
  AtLeastOneSchema,
  AtMostOneSchema,
  DefinedSchema,
  ExactlyOneSchema,
  NoneSchema,
  TAll,
  TAllOrNone,
  TAtLeastOne,
  TAtMostOne,
  TDefined,
  TExactlyOne,
  TNone,
} from '../schema'
import { Ipv4Schema, IsIPv4, TIpv4 } from '../schema/ipv4.schema'
import { ValidationService } from './validation.service'

/**
 * `typebox` either needs to register own ipv4 or use ajv add formats and use ajv validate
 */
FormatRegistry.Set('ipv4', IsIPv4)

export const Validator: IValidationService = ValidationService.getInstance([
  [TAtLeastOne, AtLeastOneSchema],
  [Typebox.TRef, Typebox.Ref],
  [TExactlyOne, ExactlyOneSchema],
  [TAllOrNone, AllOrNoneSchema],
  [TAtMostOne, AtMostOneSchema],
  [TAll, AllSchema],
  [TDefined, DefinedSchema],
  [TNone, NoneSchema],
  [TIpv4, Ipv4Schema],
])
