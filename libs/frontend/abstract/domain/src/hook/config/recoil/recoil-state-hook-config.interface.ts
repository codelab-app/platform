import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { PersistenceType } from './persistence-type.enum'

// export interface IRecoilStateHookConfig {
//   __typename: 'RecoilStateHookConfig'
//   stateKey: string
//   defaultValue?: string
//   persisted: PersistenceType
// }

export const RecoilStateHookConfigSchema = Type.Object({
  defaultValue: Typebox.Nullish(Type.String()),
  persisted: Type.Enum(PersistenceType),
  stateKey: Type.String({ minLength: 1 }),
})

export type IRecoilStateHookConfig = Static<typeof RecoilStateHookConfigSchema>
