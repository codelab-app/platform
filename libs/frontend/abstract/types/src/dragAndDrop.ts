import { EntityLike } from '@codelab/shared/abstract/types'

export enum DragAndDropTypes {
  Component = 'component',
}

export type ComponentItemType = EntityLike & {
  key: string
  label: string
}
