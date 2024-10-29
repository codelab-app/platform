import { Type } from '@sinclair/typebox'

import { AtomSchema } from './atom.model.interface'

export const AtomExportSchema = Type.Omit(AtomSchema, ['owner'])
