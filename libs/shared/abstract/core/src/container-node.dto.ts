import type { IEntity } from '@codelab/shared/abstract/types'

export enum IContainerNodeKind {
  Component = 'Component',
  Page = 'Page',
}

export interface IContainerNode extends IEntity {
  kind: keyof typeof IContainerNodeKind
}
