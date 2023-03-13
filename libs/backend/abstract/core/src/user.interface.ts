import { z } from 'zod'

/**
 * We use auth0Id since that is passed from frontend
 */
export const OwnerSchema = z.object({
  auth0Id: z.string(),
})

export const OwnerFieldSchema = z.object({
  owner: OwnerSchema,
})

export type IOwner = z.infer<typeof OwnerSchema>

// export const UserSchema = OwnerSchema.extend({
//   email: z.string(),
//   id: z.string(),
//   roles: z.array(z.nativeEnum(IRole)).optional().nullable(),
//   username: z.string(),
// })

// export type IUser = z.infer<typeof UserSchema>

// export const UserExportSchema = EntitySchema.extend({
//   roles: z.array(z.nativeEnum(IRole)).optional().nullable(),
//   username: z.string(),
// })

// export type IUserExport = z.infer<typeof UserSchema>
