import { Entity } from '@codelab/shared/abstract/types'

export enum DragAndDropTypes {
  Component = 'component',
}

export type ComponentItemType = Entity & {
  key: string
  label: string
}
