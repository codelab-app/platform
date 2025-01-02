import type { IValidationService } from '@codelab/shared/abstract/infra'
import type { TKind, TSchema } from '@sinclair/typebox'

import { TypeBoxProvider } from '../provider/typebox.provider'
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
import { RefSchema, TRef } from '../schema/ref'
import { ValidationService } from './validation.service'

const schemaKindMap = [
  [TAtLeastOne, AtLeastOneSchema],
  [TRef, RefSchema],
  [TExactlyOne, ExactlyOneSchema],
  [TAllOrNone, AllOrNoneSchema],
  [TAtMostOne, AtMostOneSchema],
  [TAll, AllSchema],
  [TDefined, DefinedSchema],
  [TNone, NoneSchema],
  [TIpv4, Ipv4Schema],
] as const

const formatMap = [['ipv4', IsIPv4]] as const

// Initialize TypeBox provider with maps
const typeBoxProvider = TypeBoxProvider.getInstance({
  formatMap,
  schemaKindMap,
})

export const Validator: IValidationService =
  ValidationService.getInstance(typeBoxProvider)
