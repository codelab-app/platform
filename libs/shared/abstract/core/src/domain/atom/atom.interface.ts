import { IEntity } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ITag } from '../tag'
import { IInterfaceType } from '../type'
import { AtomType } from './atom-type.enum'

export interface IAtom extends IEntity {
  name: string
  type: AtomType
  tags: Array<ITag>
  api: Ref<IInterfaceType>
  updateFromFragment(atom: any): void
}

// export const AtomSchema = z.object({
//   id: z.string().default(''),
//   type: z.nativeEnum(AtomType),
//   name: z.string(),
//   api: z.object({ id: z.string() }),
// })

// export type IAtom = z.infer<typeof AtomSchema>
