import { Typebox } from '@codelab/shared/abstract/typebox'
import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IElementRenderTypeKind } from './element-render-type'
import { IProp, IPropDTO } from './prop.dto.interface'

export const IComponentDTO = Type.Object({
  api: IEntity,
  childrenContainerElement: IEntity,
  id: Type.String(),
  keyGenerator: Typebox.Nullish(Type.String()),
  name: Type.String(),
  owner: Typebox.Nullish(IEntity),
  props: IPropDTO,
  rootElement: IEntity,
  store: IEntity,
})

export type IComponentDTO = Static<typeof IComponentDTO>

export const IComponent = Type.Composite([
  Type.Object({
    __typename: Type.Literal(`${IElementRenderTypeKind.Component}`),
  }),
  Typebox.Overwrite(
    IComponentDTO,
    Type.Object({
      props: IProp,
    }),
  ),
])

export type IComponent = Static<typeof IComponent>
