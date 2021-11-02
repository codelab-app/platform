import { z } from 'zod'
import { PersistenceType } from './persistence-type.enum'

// export interface IRecoilStateHookConfig {
//   __typename: 'RecoilStateHookConfig'
//   stateKey: string
//   defaultValue?: string
//   persisted: PersistenceType
// }

export const RecoilStateHookConfigSchema = z.object({
  stateKey: z.string().min(1),
  defaultValue: z.string().optional().nullable(),
  persisted: z.nativeEnum(PersistenceType),
})

export type IRecoilStateHookConfig = z.infer<typeof RecoilStateHookConfigSchema>
