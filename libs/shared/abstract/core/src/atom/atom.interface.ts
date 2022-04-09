import { IEntity, IIdentifiable } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { z } from 'zod'
import { IInterfaceType, TypeKind } from '../type'
import { AtomType } from './atom-type.enum'

export const AtomSchema = z.object({
  id: z.string().default(''),
  type: z.nativeEnum(AtomType),
  name: z.string(),
  api: z.object({ id: z.string() }),
})

// export type IAtom = z.infer<typeof AtomSchema>

export interface IAtom extends IEntity {
  name: string
  type: AtomType
  tagIds: Array<string>
  api: Ref<IInterfaceType>
  // typeKind: TypeKind
}
