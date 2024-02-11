import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IElementRenderTypeKind } from '../element/element-render-type'
import { IRef } from '../model/node-type.interface'
import { IProp, IPropDto } from '../prop/prop.dto.interface'

export const IComponentDto = Type.Object({
  api: IRef,
  childrenContainerElement: IRef,
  id: Type.String(),
  name: Type.String(),
  owner: Typebox.Nullish(IRef),
  props: IPropDto,
  rootElement: IRef,
  store: IRef,
})

export type IComponentDto = Static<typeof IComponentDto>

export const IComponent = Type.Composite([
  Type.Object({
    __typename: Type.Literal(`${IElementRenderTypeKind.Component}`),
  }),
  Typebox.Overwrite(
    IComponentDto,
    Type.Object({
      props: IProp,
    }),
  ),
])

export type IComponent = Static<typeof IComponent>
