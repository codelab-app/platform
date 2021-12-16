import { ITransaction } from '@codelab/backend/infra'
import type { IElement, IUser } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../infrastructure/repositories/abstract/element-repository.interface'

@Injectable()
export class ElementValidator {
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
  ) {}

  public static validateElementIsOwned(
    element: Pick<IElement, 'owner'>,
    currentUser: IUser | undefined,
  ) {
    if (!currentUser) {
      throw new Error("You don't have access to this element")
    }

    const ownerId = element.owner?.id
    const message = "You don't have access to this element"

    if (ownerId) {
      if (ownerId !== currentUser.id) {
        throw new Error(message)
      }
    }
  }

  /**
   * Throws error
   * if the element doesn't exist
   * if no currentUser is not provided
   * if the currentUser doesn't have ownership rights over the element
   */
  async existsAndIsOwnedBy(
    elementId: string | undefined,
    currentUser: IUser | undefined,
    transaction: ITransaction,
  ): Promise<void> {
    if (!elementId || elementId === 'undefined') {
      throw new Error('elementId not provided')
    }

    if (!currentUser) {
      throw new Error("You don't have access to this element")
    }

    const { elementExists, ownerId } =
      await this.elementRepository.elementExistsAndGetOwner(
        elementId,
        transaction,
      )

    if (!elementExists) {
      throw new Error("Element doesn't exist")
    }

    ElementValidator.validateElementIsOwned(
      { owner: ownerId ? { id: ownerId } : undefined },
      currentUser,
    )
  }

  /**
   * Throws error
   * if the provided props don't match the interface of the element's atom
   */
  async propsAreValid(elementId: string): Promise<void> {
    // const element =
    //   typeof elementOrId === 'string'
    //     ? await this.query(elementOrId)
    //     : elementOrId
    // TODO validate props string, could use TypeTree.toJsonSchema?
  }

  /**
   * Throws error
   * if the element is the root element of its tree
   */
  async isNotRoot(elementId: string, transaction: ITransaction): Promise<void> {
    if (!elementId) {
      throw new Error('elementId not provided')
    }

    const rootContainerId = await this.elementRepository.isElementRoot(
      elementId,
      transaction,
    )

    if (rootContainerId) {
      throw new Error('Element is root')
    }
  }

  /**
   * Throws error
   * if the element has a parent element or a ~instanceOfComponent reference
   */
  public async isNotReferenced(
    elementId: string,
    transaction: ITransaction,
  ): Promise<void> {
    if (!elementId) {
      throw new Error('elementId not provided')
    }

    const response = await this.elementRepository.getReferences(
      elementId,
      transaction,
    )

    const hasParent = !!response?.parentId
    const hasInstances = !!response?.componentInstances?.length
    const parentName = response?.parentName

    const instancesNames = response?.componentInstances?.reduce(
      (acc, instance) => acc + instance.name + ', ',
      '',
    )

    if (hasParent || hasInstances) {
      throw new Error(
        `Element is referenced in ${parentName ?? instancesNames ?? ''}`,
      )
    }
  }
}
