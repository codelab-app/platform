import {
  type IElementDomainService,
  type IElementModel,
} from '@codelab/frontend/abstract/domain'
import {
  deleteElementRepository,
  updateElementsRepository,
} from '@codelab/frontend-domain-element/repositories'

export type AfterElementDelete = () => void

/**
 * Need to take care of reconnecting parent/sibling nodes
 */
export const deleteElementUseCase = async (
  subRootElement: IElementModel,
  elementDomainService: IElementDomainService,
  // builderService: IBuilderService,
  afterElementDeleteCallback: AfterElementDelete,
) => {
  // const parentComponent = subRootElement.parentComponent?.current
  // Check if the element is linked as a children container in parent component
  // and replace this link to component root before element is deleted
  // if (parentComponent && childrenContainer?.id === subRootElement.id) {
  //   yield* _await(
  //     this.componentService.update({
  //       id: parentComponent.id,
  //       name: parentComponent.name,
  //     }),
  //   )
  // }

  const elementsToDelete = [
    subRootElement,
    ...subRootElement.descendantElements,
  ]

  afterElementDeleteCallback()
  // builderService.selectPreviousElementOnDelete()

  subRootElement.detachFromTree()

  /**
   * delete props
   */
  await deleteElementRepository({
    where: { id_IN: elementsToDelete.map((element) => element.id) },
  })

  elementsToDelete.reverse().forEach((element) => {
    // this.removeClones(element.id)
    elementDomainService.elements.delete(element.id)
  })

  await syncModifiedElements(elementDomainService)
}

export const syncModifiedElements = async (
  elementDomainService: IElementDomainService,
) => {
  const elements = elementDomainService.modifiedElements

  const updates = elements.map((element) =>
    updateElementsRepository({
      update: element.toUpdateNodesInput(),
      where: { id: element.id },
    }),
  )

  await Promise.all(updates)

  elementDomainService.resetModifiedElements()
}
