import type {
  SchemaBuilder,
  SelectOption,
} from '@codelab/frontend-abstract-types'
import type {
  ICreateElementData,
  IElementDto,
} from '@codelab/shared-abstract-core'
import type { Completion } from '@codemirror/autocomplete'

import type { MoveData } from '../builder'
import type { IElementModel } from './element.model.interface'

export type IUpdateElementData = Pick<
  IElementDto,
  | 'childMapperComponent'
  | 'childMapperPreviousSibling'
  | 'childMapperPropKey'
  | 'id'
  | 'name'
  | 'postRenderActions'
  | 'preRenderActions'
  | 'renderForEachPropKey'
  | 'renderIfExpression'
  | 'renderType'
  | 'style'
  | 'tailwindClassNames'
>

/**
 * Some properties have their own forms, the base form only uses a subset of fields
 */
export type IUpdateBaseElementData = Omit<IUpdateElementData, 'style'>

export type ICreateElementSchemaBuilder = SchemaBuilder<
  {
    selectedElement: IElementModel
    elements: Array<SelectOption>
    actions: Array<SelectOption>
  },
  ICreateElementData
>

export type IUpdateElementSchemaBuilder = SchemaBuilder<
  {
    element: IElementModel
    elements: Array<SelectOption>
    actions: Array<SelectOption>
    components: Array<SelectOption>
    renderIfAutoComplete: Array<Completion>
  },
  IUpdateBaseElementData
>

export type IMoveElementSchemaBuilder = SchemaBuilder<
  {
    parentElements: Array<SelectOption>
    prevSiblingElements: Array<SelectOption>
  },
  MoveData
>
