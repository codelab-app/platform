import type { IElementService } from '@codelab/frontend/abstract/application'
import {
  type IElementModel,
  type IMoveElementContext,
  type IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import { schemaTransformer } from '@codelab/frontend/presentation/components/interface-form'
import { useAtomService } from '@codelab/frontend-application-atom/services'
import { usePropService } from '@codelab/frontend-application-prop/services'
import { useTypeService } from '@codelab/frontend-application-type/services'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { createValidator } from '@codelab/frontend-presentation-components-form'
import type { IElementDto } from '@codelab/shared/abstract/core'
import uniqBy from 'lodash/uniqBy'

export const propsHaveErrors = (element?: IElementModel) => {
  if (!element) {
    return false
  }

  const { props, renderType } = element
  const schema = schemaTransformer.transform(renderType.current.api.current)
  const validate = createValidator(schema)
  const result = validate(props.values)

  return result ? result.details.length > 0 : false
}

export const useElementService = (): IElementService => {
  const atomService = useAtomService()
  const typeService = useTypeService()
  const propService = usePropService()
  const { rendererService } = useApplicationStore()
  const { elementDomainService } = useDomainStore()

  const createElement = async (data: IElementDto) => {
    if (data.renderType.__typename === 'Atom') {
      await atomService.loadApi(data.renderType.id)
    }

    const element = elementDomainService.addTreeNode(data)

    await elementRepository.add(element)
    await syncModifiedElements()

    return element
  }

  const deleteElement = async (subRootElement: IElementModel) => {
    console.debug('ElementService.delete', subRootElement)

    const elementsToDelete = [
      subRootElement,
      ...subRootElement.descendantElements,
    ]

    // builderService.selectPreviousElementOnDelete()

    subRootElement.detachFromTree()

    await elementRepository.delete(elementsToDelete)

    elementsToDelete.reverse().forEach((element) => {
      elementDomainService.elements.delete(element.id)
    })

    await syncModifiedElements()
  }

  const loadDependantTypes = async (element: IElementModel) => {
    const apiId = element.renderType.current.api.id

    await typeService.getInterface(apiId)
  }

  const move = async (context: IMoveElementContext) => {
    elementDomainService.move(context)

    await updateElements(elementDomainService.modifiedElements)
  }

  const syncModifiedElements = async () => {
    await updateElements(elementDomainService.modifiedElements)

    elementDomainService.resetModifiedElements()
  }

  const update = async (newElement: IUpdateElementData) => {
    const currentElement = elementDomainService.element(newElement.id)
    const newRenderTypeId = newElement.renderType.id
    const oldRenderTypeId = currentElement.renderType.id

    if (newRenderTypeId !== oldRenderTypeId) {
      propService.reset(currentElement.props)

      await atomService.loadApi(newRenderTypeId)
    }

    currentElement.writeCache(newElement)

    await elementRepository.update(currentElement)

    return currentElement
  }

  const updateElements = async (elements: Array<IElementModel>) => {
    await Promise.all(
      uniqBy(elements, (element) => element.id).map((element) =>
        elementRepository.updateNodes(element),
      ),
    )
  }

  const getElement = (id: string) => {
    return elementDomainService.element(id)
  }

  return {
    createElement,
    deleteElement,
    getElement,
    loadDependantTypes,
    move,
    propsHaveErrors,
    syncModifiedElements,
    update,
  }
}
