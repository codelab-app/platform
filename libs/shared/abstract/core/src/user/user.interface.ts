import { z } from 'zod'
import { Role } from './role.enum'

export const UserSchema = z.object({
  id: z.string().default(''),
  auth0Id: z.string(),
  roles: z.array(z.nativeEnum(Role)),
})

export type IUser = z.infer<typeof UserSchema>
