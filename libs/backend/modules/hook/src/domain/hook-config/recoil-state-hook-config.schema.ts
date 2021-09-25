import { PersistenceType } from '@codelab/shared/abstract/core'
import { z } from 'zod'

export type RecoilStateHookConfig = {
  stateKey: string
  defaultValue?: string
  persisted?: PersistenceType
}

export const recoilStateHookConfigSchema: z.ZodSchema<RecoilStateHookConfig> =
  z.object({
    stateKey: z.string().nonempty(),
    defaultValue: z.string().optional(),
    persisted: z
      .nativeEnum(PersistenceType)
      .default(PersistenceType.NotPersisted),
  })
