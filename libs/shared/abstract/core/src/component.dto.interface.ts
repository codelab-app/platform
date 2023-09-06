import { IEntity } from '@codelab/shared/abstract/types'
import { Typebox } from '@codelab/shared/infra/validation'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IAuth0Owner } from './user.interface'

export const IComponentDTO = Type.Composite([
  IAuth0Owner,
  Type.Object({
    api: IEntity,
    childrenContainerElement: IEntity,
    id: Type.String(),
    keyGenerator: Typebox.Nullish(Type.String()),
    name: Type.String(),
    props: IEntity,
    rootElement: IEntity,
    store: IEntity,
  }),
])

export type IComponentDTO = Static<typeof IComponentDTO>
