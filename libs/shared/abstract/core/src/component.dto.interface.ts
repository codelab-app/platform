import { IEntity } from '@codelab/shared/abstract/types'
import { Typebox } from '@codelab/shared/infra/validation'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const IComponentDTO = Type.Object({
  api: IEntity,
  childrenContainerElement: IEntity,
  id: Type.String(),
  keyGenerator: Typebox.Nullish(Type.String()),
  name: Type.String(),
  props: IEntity,
  rootElement: IEntity,
  store: IEntity,
})

export type IComponentDTO = Static<typeof IComponentDTO>
