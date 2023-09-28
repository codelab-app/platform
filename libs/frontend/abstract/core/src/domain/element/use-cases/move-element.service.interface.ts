import { IEntity } from '@codelab/shared/abstract/types'

export interface IMoveFirstChildProps {
  element: IEntity
  parentElement: IEntity
}

export interface IMoveNextSiblingProps {
  element: IEntity
  targetElement: IEntity
}

export interface IMoveElementService {
  moveElementAsFirstChild(props: {
    element: IEntity
    parentElement: IEntity
  }): Promise<void>
  moveElementAsNextSibling(props: {
    element: IEntity
    targetElement: IEntity
  }): Promise<void>
  /**
   * @param props.object an element or a component
   */
  moveNodeToAnotherTree(props: {
    dropPosition: number
    object: IEntity
    targetElement: IEntity
  }): Promise<void>
  /**
   * @returns affected node ids
   */
  attachElementAsFirstChild(context: IMoveFirstChildProps): Array<string>
  /**
   * @returns affected node ids
   */
  attachElementAsNextSibling(context: IMoveNextSiblingProps): Array<string>

  detachElementFromElementTree(elementId: string): Array<string>
}
