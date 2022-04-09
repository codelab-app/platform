import { IIdentifiable } from '@codelab/shared/abstract/types'

export enum DragAndDropTypes {
  Component = 'component',
}

export interface ComponentItemType extends IIdentifiable {
  key: string
  label: string
}
