import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IElementRenderTypeKind } from './element-render-type'
import { IRef } from './model/node-type.interface'
import { IProp, IPropDTO } from './prop.dto.interface'

export const IComponentDTO = Type.Object({
  api: IRef,
  childrenContainerElement: IRef,
  id: Type.String(),
  name: Type.String(),
  owner: Typebox.Nullish(IRef),
  props: IPropDTO,
  rootElement: IRef,
  store: IRef,
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
