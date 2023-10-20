import type { IEntity } from '@codelab/shared/abstract/types'

export interface IMoveFirstChildProps {
  element: IEntity
  parentElement: IEntity
}

export interface IMoveNextSiblingProps {
  element: IEntity
  targetElement: IEntity
}

export interface IMoveElementService {
  /**
   * @returns affected node ids
   */
  attachElementAsFirstChild(context: IMoveFirstChildProps): Array<string>
  /**
   * @returns affected node ids
   */
  attachElementAsNextSibling(context: IMoveNextSiblingProps): Array<string>
  detachElementFromElementTree(elementId: string): Array<string>
  moveElementAsFirstChild(props: {
    element: IEntity
    parentElement: IEntity
  }): Promise<void>
  moveElementAsNextSibling(props: {
    element: IEntity
    targetElement: IEntity
  }): Promise<void>
}
