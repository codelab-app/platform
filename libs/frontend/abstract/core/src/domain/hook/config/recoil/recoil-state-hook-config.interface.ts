import { z } from 'zod'
import { PersistenceType } from './persistence-type.enum'

// export interface IRecoilStateHookConfig {
//   __typename: 'RecoilStateHookConfig'
//   stateKey: string
//   defaultValue?: string
//   persisted: PersistenceType
// }

export const RecoilStateHookConfigSchema = z.object({
  defaultValue: z.string().optional().nullable(),
  persisted: z.nativeEnum(PersistenceType),
  stateKey: z.string().min(1),
})

export type IRecoilStateHookConfig = z.infer<typeof RecoilStateHookConfigSchema>
