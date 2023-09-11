import { IPrimitiveTypeDTO } from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'
import { TypeOutput } from '../type.output.dto'

export const IPrimitiveTypeOutputDto = TypeOutput(IPrimitiveTypeDTO)

export type IPrimitiveTypeOutputDto = Static<typeof IPrimitiveTypeOutputDto>
