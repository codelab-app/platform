import { IRole } from '@codelab/shared/abstract/core'
import { EntitySchema } from '@codelab/shared/abstract/types'
import { z } from 'zod'

/**
 * We use auth0Id since that is passed from frontend
 */
export const UserRefSchema = z.object({
  auth0Id: z.string(),
})

export const OwnerSchema = z.object({
  owner: UserRefSchema,
})

export type IUserRef = z.infer<typeof UserRefSchema>

export const UserSchema = UserRefSchema.extend({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  roles: z.array(z.nativeEnum(IRole)).optional().nullable(),
})

export type IUser = z.infer<typeof UserSchema>

export const UserExportSchema = EntitySchema.extend({
  username: z.string(),
  roles: z.array(z.nativeEnum(IRole)).optional().nullable(),
})

export type IUserExport = z.infer<typeof UserSchema>
