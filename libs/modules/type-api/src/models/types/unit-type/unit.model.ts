import { Unit } from '@codelab/dgraph'
import { registerEnumType } from '@nestjs/graphql'
import { z } from 'zod'

export { Unit }

export const unitSchema = z.nativeEnum(Unit)

registerEnumType(Unit, {
  name: 'Unit',
})
