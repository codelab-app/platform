import type { IEntity, Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { IAtomID } from '../atom'
import type { IComponentID } from '../component'
import type { IPropData } from '../prop'
import type { ElementFragment } from './element.fragment.graphql.gen'

export enum RenderTypeEnum {
  Component = 'component',
  Atom = 'atom',
}

export interface RenderType {
  // This is the ID of either `atom` or `component`
  id: IAtomID | IComponentID
  model: RenderTypeEnum
}

export interface ICreateElementDTO {
  id: string
  name: string
  parentElement?: IEntity
  preRenderActionId?: Nullish<string>
  postRenderActionId?: Nullish<string>
  customCss?: Nullish<string>
  guiCss?: Nullish<string>
  propsData?: string
  prevSiblingId?: Nullable<string>
  /**
   * We should connect to `atom` or `component` in future
   */
  renderType?: Nullable<RenderType>
}

export type IUpdateElementDTO = ICreateElementDTO & {
  renderForEachPropKey?: Nullable<string>
  renderIfExpression?: Nullable<string>
  props?: Nullable<IPropData>
  preRenderActionId?: Nullish<string>
  postRenderActionId?: Nullish<string>
  propTransformationJs?: Nullish<string>
}

/**
 * Some properties have their own forms, the base form only uses a subset of fields
 */
export type IUpdateBaseElementDTO = Pick<
  IUpdateElementDTO,
  | 'id'
  | 'renderType'
  | 'name'
  | 'renderIfExpression'
  | 'renderForEachPropKey'
  | 'preRenderActionId'
  | 'postRenderActionId'
>

/**
 * This is the graphql fragment equivalent, used for hydrating object
 */
export type IElementDTO = ElementFragment
