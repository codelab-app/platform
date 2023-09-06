import { IEntity } from '@codelab/shared/abstract/types'
import { Typebox } from '@codelab/shared/infra/validation'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { RenderType } from './render-type'

export const IElementDTO = Type.Object({
  childMapperComponent: Typebox.Nullish(IEntity),
  childMapperPreviousSibling: Typebox.Nullish(IEntity),
  childMapperPropKey: Typebox.Nullish(Type.String()),
  customCss: Typebox.Nullish(Type.String()),
  firstChild: Typebox.Nullish(IEntity),
  guiCss: Typebox.Nullish(Type.String()),
  id: Type.String(),
  name: Type.String(),
  nextSibling: Typebox.Nullish(IEntity),
  page: Typebox.Nullish(IEntity),
  parent: Typebox.Nullish(IEntity),
  parentComponent: Typebox.Nullish(IEntity),
  postRenderAction: Typebox.Nullish(IEntity),
  preRenderAction: Typebox.Nullish(IEntity),
  prevSibling: Typebox.Nullish(IEntity),
  props: IEntity,
  propTransformationJs: Typebox.Nullish(Type.String()),
  refKey: Typebox.Nullish(Type.String()),
  renderForEachPropKey: Typebox.Nullish(Type.String()),
  renderIfExpression: Typebox.Nullish(Type.String()),
  renderType: Typebox.Nullish(RenderType),
  style: Typebox.Nullish(Type.String()),
})

/**
 * This is the graphql fragment equivalent, used for hydrating object
 */
export type IElementDTO = Static<typeof IElementDTO>

export interface ICreateIElementDTO extends IElementDTO {
  closestContainerNode: IEntity
}
