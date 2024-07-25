import type { KebabCase } from 'type-fest'
import type { ModelInteraction } from './model.data'

export type ModelUiKey = KebabCase<ModelInteraction<'uis'>>

export interface ModelUiData {
  key: ModelUiKey
  title: string
}

export enum CuiComponents {
  Sidebar = 'Sidebar',
  Modal = 'Modal',
  Form = 'Form',
}

export type CuiComponentsKey = keyof typeof CuiComponents
