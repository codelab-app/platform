import type { TitleCase } from '@codelab/shared/abstract/types'
import type { KebabCase } from 'type-fest'
import type { ModelDataMap, ModelInteraction } from './model.data'

export type ModelUiKey = KebabCase<ModelInteraction<'uis'>>

export interface ModelUiData {
  key: ModelUiKey
  title: string
}

export enum CuiComponents {
  Sidebar = 'Sidebar',
}
