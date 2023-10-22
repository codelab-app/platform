import type { IRef } from '@codelab/shared/abstract/core'

export enum DragAndDropTypes {
  Component = 'component',
}

export interface ComponentItemType extends IRef {
  key: string
  label: string
}
