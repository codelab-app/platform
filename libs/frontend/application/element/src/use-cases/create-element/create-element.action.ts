import type { IElementService } from '@codelab/frontend/abstract/application'
import { useAtomService } from '@codelab/frontend-application-atom/services'
import type { IElementDto } from '@codelab/shared/abstract/core'

export const useCreateElementAction: IElementService['createElement'] = (
  data: IElementDto,
) => {
  const { loadApi } = useAtomService()

  /**
   * Need to fetch the full api, since we don't during atom selection dropdown. The api will be used in subsequent steps such as the `ElementTreeItemElementTitle` for field validation
   */
  if (data.renderType.__typename === 'Atom') {
    this.atomService.loadApi(data.renderType.id)
  }

  const element = this.elementDomainService.addTreeNode(data)

  yield * _await(this.elementRepository.add(element))
  yield * _await(this.syncModifiedElements())

  /**
   * Syncs all components to the current element tree
   */
  // const parentElementClone = [
  //   ...this.elementService.clonedElements.values(),
  // ].find(({ sourceElement }) => sourceElement?.id === data.parentElement?.id)

  // if (parentElementClone) {
  //   const elementClone = element.clone()

  //   this.moveElementService.attachElementAsFirstChild({
  //     element: elementClone,
  //     parentElement: parentElementClone,
  //   })
  // }

  // yield* _await(this.elementService.updateAffectedElements(affectedNodeIds))
}
