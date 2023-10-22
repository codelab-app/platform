import type { IRef } from '@codelab/shared/abstract/core'

export interface IMoveFirstChildProps {
  element: IRef
  parentElement: IRef
}

export interface IMoveNextSiblingProps {
  element: IRef
  targetElement: IRef
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
    element: IRef
    parentElement: IRef
  }): Promise<void>
  moveElementAsNextSibling(props: {
    element: IRef
    targetElement: IRef
  }): Promise<void>
}
