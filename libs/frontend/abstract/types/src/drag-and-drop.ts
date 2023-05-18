import type { IEntity } from '@codelab/shared/abstract/types'

export enum DragAndDropTypes {
  Component = 'component',
}

export interface ComponentItemType extends IEntity {
  key: string
  label: string
}
