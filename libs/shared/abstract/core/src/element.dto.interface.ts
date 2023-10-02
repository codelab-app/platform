import { Typebox } from '@codelab/shared/abstract/typebox'
import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IAtomDTO } from './atom.dto.interface'
import { IComponentDTO } from './component.dto.interface'
import { IElementRenderTypeDto } from './element-render-type'
import { IPropDTO } from './prop.dto.interface'

export const IElementDTO = Type.Object({
  childMapperComponent: Typebox.Nullish(IEntity),
  childMapperPreviousSibling: Typebox.Nullish(IEntity),
  childMapperPropKey: Typebox.Nullish(Type.String()),
  /**
   * For frontend models we can compute from Mobx, but for backend we would map the data in
   */
  closestContainerNode: IEntity,
  firstChild: Typebox.Nullish(IEntity),
  id: Type.String(),
  name: Type.String(),
  nextSibling: Typebox.Nullish(IEntity),
  page: Typebox.Nullish(IEntity),
  parentComponent: Typebox.Nullish(IEntity),
  parentElement: Typebox.Nullish(IEntity),
  postRenderAction: Typebox.Nullish(IEntity),
  preRenderAction: Typebox.Nullish(IEntity),
  prevSibling: Typebox.Nullish(IEntity),
  // Treat element as aggregate, so we include prop data here
  props: IPropDTO,
  // props: IEntity,
  renderForEachPropKey: Typebox.Nullish(Type.String()),
  renderIfExpression: Typebox.Nullish(Type.String()),
  renderType: IElementRenderTypeDto,
  style: Typebox.Nullish(Type.String()),
})

export type IElementDTO = Static<typeof IElementDTO>

export const IElementSerialized = IElementDTO

// export const IElementSerialized = Typebox.Overwrite(
//   IElementDTO,
//   Type.Object({
//     props: Type.Union([IAtomDTO, IComponentDTO]),
//   }),
// )

export type IElementSerialized = Static<typeof IElementSerialized>

export const ICreateElementDTO = Type.Composite([
  IElementDTO,
  Type.Object({
    /**
     * Used for composite key
     */
    closestContainerNode: IEntity,
  }),
])

export type ICreateElementDTO = Static<typeof ICreateElementDTO>
