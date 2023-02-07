import type {
  IAtom,
  IAuth0Id,
  IComponent,
  ICreateElementDTO,
  ICreatePropMapBindingDTO,
  IElement,
  IElementRef,
  IElementService,
  IInterfaceType,
  IUpdateElementDTO,
  IUpdatePropMapBindingDTO,
  RenderType,
} from '@codelab/frontend/abstract/core'
import {
  IElementDTO,
  isAtomDTO,
  isComponentDTO,
  RenderTypeEnum,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import {
  PropMapBinding,
  PropMapBindingModalService,
} from '@codelab/frontend/domain/prop'
import { getTypeService } from '@codelab/frontend/domain/type'
import { getComponentService } from '@codelab/frontend/presenter/container'
import { createSlug, runSequentially } from '@codelab/frontend/shared/utils'
import type {
  ElementCreateInput,
  ElementUpdateInput,
  ElementWhere,
} from '@codelab/shared/abstract/codegen'
import { RenderedComponentFragment } from '@codelab/shared/abstract/codegen'
import type { IEntity, Maybe } from '@codelab/shared/abstract/types'
import { connectNode, reconnectNode } from '@codelab/shared/data'
import { isNonNullable } from '@codelab/shared/utils'
import { computed } from 'mobx'
import {
  _async,
  _await,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { isNil, until } from 'ramda'
import { v4 } from 'uuid'
import type { UpdateElementsMutationVariables } from '../graphql/element.endpoints.graphql.gen'
import {
  makeCreateInput,
  makeDefaultProps,
  makeDuplicateInput,
  makeUpdateInput,
} from './api.utils'
import { elementApi, propMapBindingApi } from './apis'
import { Element } from './element.model'
import {
  CreateElementModalService,
  ElementModalService,
  UpdateElementModalService,
} from './element-modal.service'

/**
 * We will have a single ElementService that contains all elements from
 *
 * - PageElementTree
 * - ComponentElementTree
 */
@model('@codelab/ElementService')
export class ElementService
  extends Model({
    id: idProp,
    /**
     * Contains all elements
     *
     * - Elements part of rootTree
     * - Elements that are detached
     */
    elements: prop(() => objectMap<IElement>()),
    clonedElements: prop(() => objectMap<IElement>()),
    createModal: prop(() => new CreateElementModalService({})),
    updateModal: prop(() => new UpdateElementModalService({})),
    deleteModal: prop(() => new ElementModalService({})),

    createPropMapBindingModal: prop(() => new ElementModalService({})),
    updatePropMapBindingModal: prop(() => new PropMapBindingModalService({})),
    deletePropMapBindingModal: prop(() => new PropMapBindingModalService({})),

    // _atomService: prop<Ref<IAtomService>>(),
  })
  implements IElementService
{
  @computed
  private get atomService() {
    return getAtomService(this)
  }

  @computed
  private get componentService() {
    return getComponentService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }

  @modelFlow
  @transaction
  public getAll = _async(function* (
    this: ElementService,
    where?: ElementWhere,
  ) {
    const { elements } = yield* _await(
      elementApi.GetElements({
        where,
      }),
    )

    return elements.map((element) => this.writeCache(element))
  })

  @modelAction
  private writeAtomsCache(elements: Array<IElementDTO>) {
    console.debug('ElementService.writeAtomsCache', elements)

    const atoms = elements
      .map((element) => element.renderAtomType)
      .filter(isAtomDTO)

    return atoms.map((atom) =>
      // Add all non-existing atoms to the AtomStore, so we can safely reference them in Element
      this.atomService.writeCache(atom),
    )
  }

  @modelAction
  private writeComponentsCache(elements: Array<IElementDTO>) {
    console.debug('ElementService.writeComponentsCache', elements)

    const components = elements
      .map((v) => v.parentComponent || v.renderComponentType)
      .filter(isComponentDTO)

    return components.map((component) =>
      this.componentService.writeCache(component),
    )
  }

  @modelAction
  public loadComponentTree(component: RenderedComponentFragment) {
    const elements = [
      component.rootElement,
      ...component.rootElement.descendantElements,
    ]

    const hydratedElements = elements.map((element) => this.writeCache(element))
    const rootElement = this.element(component.rootElement.id)

    if (!rootElement) {
      throw new Error('No root element found')
    }

    return { rootElement, hydratedElements }
  }

  @modelAction
  public writeCache = (element: IElementDTO): IElement => {
    console.debug('ElementService.writeCache', element)

    this.writeAtomsCache([element])
    this.writeComponentsCache([element])

    let elementModel = this.elements.get(element.id)

    if (elementModel) {
      elementModel.writeCache(element)
      this.writeClonesCache(element)
    } else {
      elementModel = Element.hydrate(element)
      this.elements.set(element.id, elementModel)
    }

    return elementModel
  }

  /**
   * We need a separate create function for element trees
   */
  @modelFlow
  @transaction
  public create = _async(function* (
    this: ElementService,
    data: Array<ICreateElementDTO>,
  ) {
    const input: Array<ElementCreateInput> = []

    for (const elementInput of data) {
      const parentElement = this.elements.get(
        elementInput.parentElementId as string,
      )

      const slug = createSlug(elementInput.slug, parentElement?.baseId)
      // When creating a new element, we need the interface type fields
      // and we use it to create a props with default values for the created element
      const typeApi = yield* _await(this.getElementInputTypeApi(elementInput))

      input.push(
        makeCreateInput({
          ...elementInput,
          slug,
          propsData: makeDefaultProps(typeApi),
        }),
      )
    }

    const {
      createElements: { elements },
    } = yield* _await(elementApi.CreateElements({ input }))

    return elements.map((element) => this.writeCache(element))
  })

  /**
   * Returns the associated interface type of the new element to be created.
   * To be used to check on the fields that has a default value
   * and make a default `dataProps` input for the creation of the element
   */
  @modelFlow
  private getElementInputTypeApi = _async(function* (
    this: ElementService,
    elementInput: ICreateElementDTO,
  ) {
    let baseElementType: Maybe<IAtom | IComponent>

    if (elementInput.renderType?.model === RenderTypeEnum.Component) {
      baseElementType = yield* _await(
        this.componentService.getOne(elementInput.renderType.id),
      )

      if (!baseElementType) {
        throw new Error(
          `Component with id ${elementInput.renderType.id} not found`,
        )
      }
    } else if (elementInput.renderType?.model === RenderTypeEnum.Atom) {
      baseElementType = yield* _await(
        this.atomService.getOne(elementInput.renderType.id),
      )

      if (!baseElementType) {
        throw new Error(`Atom with id ${elementInput.renderType.id} not found`)
      }
    }

    if (baseElementType) {
      const typeApi = yield* _await(
        this.typeService.getOne(baseElementType.api.id),
      )

      // Atoms and components have interface type
      return typeApi as Maybe<IInterfaceType>
    }

    return
  })

  /**
   * Used to load the entire page tree
   */
  @modelFlow
  private getDescendants = _async(function* (
    this: ElementService,
    rootId: IElementRef,
  ) {
    const { elementTrees } = yield* _await(
      elementApi.GetElementTree({ where: { id: rootId } }),
    )

    if (!elementTrees[0]) {
      return []
    }

    const elements: Array<IElementDTO> = [
      elementTrees[0],
      ...(elementTrees[0]?.descendantElements ?? []),
    ]

    return elements.map((element) => this.writeCache(element))
  })

  @modelAction
  public element(id: string) {
    return this.elements.get(id) || this.clonedElements.get(id)
  }

  @modelFlow
  @transaction
  public update = _async(function* (
    this: ElementService,
    element: IElement,
    input: IUpdateElementDTO,
  ) {
    const slug = createSlug(input.slug, element.baseId)

    const {
      atom: currentAtom,
      renderComponentType: currentRenderComponentType,
    } = element

    const { model: renderTypeModel, id: newRenderTypeId } =
      input.renderType ?? {}

    const isUpdatedWithAtom = renderTypeModel === RenderTypeEnum.Atom
    const isUpdatedWithComponent = renderTypeModel === RenderTypeEnum.Component

    const isCurrentlyEmptyElement =
      isNil(currentAtom) && isNil(currentRenderComponentType)

    const changedFromAtomToComponent =
      isUpdatedWithAtom && !isNil(currentRenderComponentType)

    const changedFromComponentToAtom =
      isUpdatedWithComponent && !isNil(currentAtom)

    const changedFromEmptyToAtomOrComponent =
      isCurrentlyEmptyElement && (isUpdatedWithAtom || isUpdatedWithComponent)

    const renderTypeChanged =
      changedFromAtomToComponent ||
      changedFromComponentToAtom ||
      changedFromEmptyToAtomOrComponent

    const renderIdChanged =
      (isUpdatedWithAtom && newRenderTypeId !== currentAtom?.id) ||
      (isUpdatedWithComponent &&
        newRenderTypeId !== currentRenderComponentType?.id)

    // we only want to change the props of the element if the user changes the atom or component
    let propsData: string | undefined

    if (renderTypeChanged || renderIdChanged) {
      // When replacing the atom or component of an element, we need the interface type fields of the new
      // atom/component and we use it to create a props with default values for the updated element
      const typeApi = yield* _await(this.getElementInputTypeApi(input))
      propsData = makeDefaultProps(typeApi)
    }

    const update = makeUpdateInput({
      ...input,
      slug,
      propsData,
    })

    const {
      updateElements: { elements },
    } = yield* _await(
      elementApi.UpdateElements({
        where: { id: element.id },
        update,
      }),
    )

    return elements.map((e: IElementDTO) => this.writeCache(e))
  })

  /**
   * Directly uses generated GraphQL operations
   */
  @modelFlow
  @transaction
  public patchElement = _async(function* (
    this: ElementService,
    entity: IEntity,
    input: ElementUpdateInput,
  ) {
    const {
      updateElements: { elements },
    } = yield* _await(
      elementApi.UpdateElements({
        where: { id: entity.id },
        update: input,
      }),
    )

    return elements.map((element) => this.writeCache(element))[0]!
  })

  @modelFlow
  @transaction
  private detachElementFromElementTree = _async(function* (
    this: ElementService,
    elementId: string,
  ) {
    /**
Detaches element from an element tree. Will perform 3 conditional checks to see which specific detach to call

- Detach from parent
- Detach from next sibling
- Detach from prev sibling
- Connect prev to next
*/
    const element = this.element(elementId)

    if (!element) {
      console.warn(`Can't find element id ${elementId}`)

      return
    }

    /**
parent
  prev
  element
  next
*/
    const updateElementInputs = [
      // Detach from parent
      element.makeDetachParentInput(),
      // Detach from next sibling
      element.makeDetachNextSiblingInput(),
      // Detach from prev sibling
      element.makeDetachPrevSiblingInput(),
    ]

    const updateElementCacheFns: Array<() => void> = [
      // Detach from parent
      element.detachParent(),
      // Attach next to prev
      element.attachPrevToNextSibling(),
      // Detach from next sibling
      element.detachNextSibling(),
      // Detach from prev sibling
      element.detachPrevSibling(),
    ]

    const updateElementRequests = updateElementInputs
      .filter(isNonNullable)
      .map((input) => elementApi.UpdateElements(input))

    yield* _await(Promise.all(updateElementRequests))
    updateElementCacheFns.forEach((fn) => fn())
  })

  /**
   * Moves an element to the next postion of target element
   */
  @modelFlow
  @transaction
  public moveElementAsNextSibling = _async(
    runSequentially(
      'elementTransaction',
      function* (
        this: ElementService,
        {
          elementId,
          targetElementId,
        }: Parameters<IElementService['moveElementAsNextSibling']>[0],
      ) {
        const element = this.element(elementId)
        const targetElement = this.element(targetElementId)

        if (!element || !targetElement) {
          return
        }

        if (targetElement.nextSiblingId === elementId) {
          return
        }

        yield* _await(this.detachElementFromElementTree(elementId))

        yield* _await(
          this.attachElementAsNextSibling({ elementId, targetElementId }),
        )
      },
    ),
  )

  @modelFlow
  @transaction
  public moveElementAsFirstChild = _async(
    runSequentially(
      'elementTransaction',
      function* (
        this: ElementService,
        {
          elementId,
          parentElementId,
        }: Parameters<IElementService['moveElementAsFirstChild']>[0],
      ) {
        const element = this.element(elementId)
        const parentElement = this.element(parentElementId)

        if (!element || !parentElement) {
          return
        }

        yield* _await(this.detachElementFromElementTree(elementId))

        yield* _await(
          this.attachElementAsFirstChild({ elementId, parentElementId }),
        )
      },
    ),
  )

  @modelFlow
  @transaction
  public createElementAsFirstChild = _async(
    runSequentially(
      'elementTransaction',
      function* (this: ElementService, data: ICreateElementDTO) {
        if (!data.parentElementId) {
          throw new Error('Parent element id doesnt exist')
        }

        const [element] = yield* _await(this.create([data]))

        if (!element) {
          throw new Error('Create element failed')
        }

        yield* _await(
          this.attachElementAsFirstChild({
            elementId: element.id,
            parentElementId: data.parentElementId,
          }),
        )

        return element
      },
    ),
  )

  @modelFlow
  @transaction
  public createElementAsNextSibling = _async(
    runSequentially(
      'elementTransaction',
      function* (this: ElementService, data: ICreateElementDTO) {
        const [element] = yield* _await(this.create([data]))

        if (!element) {
          throw new Error('Create element failed')
        }

        yield* _await(
          this.attachElementAsNextSibling({
            elementId: element.id,
            targetElementId: String(data.prevSiblingId),
          }),
        )

        return element
      },
    ),
  )

  @modelFlow
  @transaction
  private attachElementAsNextSibling = _async(function* (
    this: ElementService,
    {
      elementId,
      targetElementId,
    }: {
      elementId: string
      targetElementId: string
    },
  ) {
    const element = this.element(elementId)
    const targetElement = this.element(targetElementId)

    if (!element || !targetElement) {
      return
    }

    const updateElementInputs: Array<UpdateElementsMutationVariables> = []
    const updateElementCacheFns: Array<() => void> = []

    // Attach to parent
    if (targetElement.parentElement) {
      updateElementCacheFns.push(
        element.attachToParent(targetElement.parentElement.id),
      )
    }

    /**
     * [target]-nextSbiling
     * target-[element]-nextSibling
     * element appends to nextSibling
     */
    if (targetElement.nextSibling) {
      updateElementInputs.push(
        element.makeAppendSiblingInput(targetElement.nextSibling.id),
      )
      updateElementCacheFns.push(
        element.appendSibling(targetElement.nextSibling.id),
      )

      /** [element]-nextSibling */
      updateElementInputs.push(
        targetElement.nextSibling.makePrependSiblingInput(element.id),
      )
      updateElementCacheFns.push(
        targetElement.nextSibling.prependSibling(element.id),
      )
    }

    updateElementInputs.push(element.makePrependSiblingInput(targetElement.id))
    updateElementCacheFns.push(element.prependSibling(targetElement.id))

    const updateElementRequests = updateElementInputs
      .filter(isNonNullable)
      .map((input) => elementApi.UpdateElements(input))

    yield* _await(Promise.all(updateElementRequests))
    updateElementCacheFns.forEach((fn) => fn())
  })

  /**
   * Moves an element to the next position of children[0] of parent children element
   */
  @modelFlow
  @transaction
  private attachElementAsFirstChild = _async(function* (
    this: ElementService,
    {
      elementId,
      parentElementId,
    }: {
      elementId: string
      parentElementId: string
    },
  ) {
    const element = this.element(elementId)
    const parentElement = this.element(parentElementId)

    if (!element || !parentElement) {
      return
    }

    const updateElementInputs = []
    const updateElementCacheFns: Array<() => void> = []

    /**
parentElement
  firstChild

parentElement
  [element]
  firstChild

element is new parentElement's first child
     */
    if (parentElement.firstChild) {
      updateElementInputs.push(
        element.makeAppendSiblingInput(parentElement.firstChild.id),
      )
      updateElementCacheFns.push(
        element.appendSibling(parentElement.firstChild.id),
      )
    }

    // attach to parent
    updateElementInputs.push(
      element.makeAttachToParentAsFirstChildInput(parentElementId),
    )
    updateElementCacheFns.push(
      element.attachToParentAsFirstChild(parentElement.id),
    )

    const updateElementRequests = updateElementInputs.map((input) =>
      elementApi.UpdateElements(input),
    )

    yield* _await(Promise.all(updateElementRequests))
    updateElementCacheFns.forEach((fn) => fn())
  })

  @modelFlow
  @transaction
  public moveElementToAnotherTree = _async(
    runSequentially(
      'elementTransaction',
      function* (
        this: ElementService,
        {
          elementId,
          targetElementId,
          dropPosition,
        }: Parameters<IElementService['moveElementToAnotherTree']>[0],
      ) {
        const targetElement = this.element(targetElementId)

        if (!targetElement) {
          return
        }

        let element = this.element(elementId)

        if (!element) {
          const elementTree = Element.getElementTree(targetElement)

          const existingInstances = elementTree?.elementsList.filter(
            ({ renderComponentType }) => renderComponentType?.id === elementId,
          )

          const component = this.componentService.component(elementId)

          if (!component) {
            return
          }

          const componentInstanceCounter = existingInstances?.length
            ? ` ${existingInstances.length}`
            : ''

          const name = `${component.name}${componentInstanceCounter}`
          const slug = `${component.name}${componentInstanceCounter}`

          const renderType: RenderType = {
            id: component.id,
            model: RenderTypeEnum.Component,
          }

          const parentElementId = targetElement.id
          const data = { name, slug, renderType, parentElementId }

          element = (yield* _await(this.create([data])))[0]
        } else {
          yield* _await(this.detachElementFromElementTree(element.id))
        }

        if (!element) {
          return
        }

        const insertAfterId = targetElement.children[dropPosition]?.id

        if (!insertAfterId || dropPosition === 0) {
          yield* _await(
            this.attachElementAsFirstChild({
              elementId: element.id,
              parentElementId: targetElement.id,
            }),
          )
        } else {
          yield* _await(
            this.attachElementAsNextSibling({
              elementId: element.id,
              targetElementId: insertAfterId,
            }),
          )
        }

        Element.getElementTree(element)?.removeElements([
          element,
          ...element.descendants,
        ])

        Element.getElementTree(targetElement)?.addElements([
          element,
          ...element.descendants,
        ])
      },
    ),
  )

  @modelFlow
  @transaction
  public deleteElementSubgraph = _async(
    runSequentially(
      'elementTransaction',
      function* (this: ElementService, root: IElementRef) {
        const { elementTrees } = yield* _await(
          elementApi.GetElementTree({ where: { id: root } }),
        )

        if (!elementTrees[0]) {
          return []
        }

        const idsToDelete: Array<string> = [
          elementTrees[0].id,
          ...elementTrees[0].descendantElements.map((element) => element.id),
        ]

        const rootElement = this.element(root)

        if (rootElement) {
          yield* _await(this.detachElementFromElementTree(rootElement.id))
        }

        for (const id of idsToDelete.reverse()) {
          this.elements.delete(id)
          this.removeClones(id)
        }

        const {
          deleteElements: { nodesDeleted },
        } = yield* _await(
          elementApi.DeleteElements({
            where: {
              id_IN: idsToDelete,
            },
            delete: {
              propMapBindings: [{}],
              props: {},
            },
          }),
        )

        if (nodesDeleted === 0) {
          throw new Error('No elements deleted')
        }

        return idsToDelete
      },
    ),
  )

  @computed
  get elementSlugs() {
    return [...this.elements.values()].map((e) => e.slug)
  }

  // handle slug creation where many duplicates for the same element exists
  private createDuplicateSlug(element: IElement) {
    const slug_root = `${element.slug}_duplicate`

    if (!this.elementSlugs.includes(slug_root)) {
      return slug_root
    }

    // find how many slug with following format `${slug_root}${index}`
    const duplicates = this.elementSlugs.filter((s) => s.startsWith(slug_root))

    /**
     * Normally next_index = duplicates.length
     * However, we need to make sure that index isn't used by user
     */
    const next_index = until(
      (x: number) => !duplicates.includes(`${slug_root}${x}`),
      (v: number) => v + 1,
    )(duplicates.length)

    return `${slug_root}${next_index}`
  }

  private async recursiveDuplicate(element: IElement, parent: IElement) {
    const duplicate_slug = this.createDuplicateSlug(element)

    const createInput: ElementCreateInput = makeDuplicateInput(
      element,
      duplicate_slug,
    )

    const {
      createElements: {
        elements: [createdElement],
      },
    } = await elementApi.CreateElements({ input: createInput })

    if (!createdElement) {
      throw new Error('No elements created')
    }

    const elementModel = this.writeCache(createdElement)
    const lastChildId = parent.children[parent.children.length - 1]?.id

    if (!lastChildId) {
      await this.attachElementAsFirstChild({
        elementId: elementModel.id,
        parentElementId: parent.id,
      })
    } else {
      await this.attachElementAsNextSibling({
        elementId: elementModel.id,
        targetElementId: lastChildId,
      })
    }

    const children = await Promise.all(
      element.children.map((child) =>
        this.recursiveDuplicate(child, elementModel),
      ),
    )

    const oldToNewIdMap: Map<string, IElement> = children.reduce(
      (a, m) => new Map([...a, ...m]),
      new Map([[element.id, elementModel]]),
    )

    return oldToNewIdMap
  }

  @modelFlow
  @transaction
  public cloneElement = _async(
    runSequentially(
      'elementTransaction',
      function* (
        this: ElementService,
        targetElement: IElement,
        targetParent: IElement,
      ) {
        const oldToNewIdMap = yield* _await(
          this.recursiveDuplicate(targetElement, targetParent),
        )

        const createdElements = [...oldToNewIdMap.values()]
        // re-attach the prop map bindings now that we have the new ids
        const allInputs = [targetElement, ...targetElement.descendants]

        for (const inputElement of allInputs) {
          const newId = oldToNewIdMap.get(inputElement.id)?.id

          if (!newId) {
            throw new Error(`Could not find new id for ${inputElement.id}`)
          }

          const duplicated = createdElements.find(
            (element) => element.id === newId,
          )

          if (!duplicated) {
            throw new Error(`Could not find duplicated element ${newId}`)
          }

          for (const propMapBinding of inputElement.propMapBindings.values()) {
            yield* _await(
              this.createPropMapBinding(duplicated, {
                elementId: newId,
                targetElementId: propMapBinding.targetElementId
                  ? oldToNewIdMap.get(propMapBinding.targetElementId)?.id
                  : undefined,
                targetKey: propMapBinding.targetKey,
                sourceKey: propMapBinding.sourceKey,
              }),
            )
          }
        }

        return createdElements
      },
    ),
  )

  @modelFlow
  @transaction
  public convertElementToComponent = _async(
    runSequentially(
      'elementTransaction',
      function* (this: ElementService, element: Element, auth0Id: IAuth0Id) {
        if (!element.parentElement) {
          throw new Error("Can't convert root element")
        }

        const name = element.label
        const slug = element.slug
        const elementId = element.id
        const parentElement = element.parentElement
        const prevSibling = element.prevSibling

        // 1. detach the element from the element tree
        yield* _await(this.detachElementFromElementTree(elementId))

        // 2. create the component with predefined root element
        const [createdComponent] = yield* _await(
          this.componentService.create([
            {
              auth0Id,
              id: v4(),
              name,
              rootElementId: elementId,
              childrenContainerElementId: elementId,
            },
          ]),
        )

        if (!createdComponent) {
          throw new Error('Create component failed')
        }

        // 3. create a new element as an instance of the component
        if (!prevSibling) {
          const [createdElement] = yield* _await(
            this.create([
              {
                name,
                slug,
                renderType: {
                  id: createdComponent.id,
                  model: RenderTypeEnum.Component,
                },
                parentElementId: parentElement.id,
              },
            ]),
          )

          if (!createdElement) {
            throw new Error('Create element failed')
          }

          yield* _await(
            this.attachElementAsFirstChild({
              elementId: createdElement.id,
              parentElementId: parentElement.id,
            }),
          )

          return createdElement
        }

        return yield* _await(
          this.createElementAsNextSibling({
            name,
            slug,
            renderType: {
              id: createdComponent.id,
              model: RenderTypeEnum.Component,
            },
            parentElementId: parentElement.id,
            prevSiblingId: prevSibling.id,
          }),
        )
      },
    ),
  )

  @modelFlow
  @transaction
  public createPropMapBinding = _async(function* (
    this: ElementService,
    element: IElement,
    createInput: ICreatePropMapBindingDTO,
  ) {
    const {
      createPropMapBindings: {
        propMapBindings: [createdPropMapBinding],
      },
    } = yield* _await(
      propMapBindingApi.CreatePropMapBindings({
        input: {
          sourceKey: createInput.sourceKey.trim(),
          targetKey: createInput.targetKey.trim(),
          element: connectNode(element.id),
          targetElement: connectNode(createInput.targetElementId),
        },
      }),
    )

    if (!createdPropMapBinding) {
      throw new Error('No prop map bindings created')
    }

    const propMapBinding = PropMapBinding.hydrate(createdPropMapBinding)

    element.addPropMapBinding(propMapBinding)

    return propMapBinding
  })

  @modelFlow
  @transaction
  public updatePropMapBinding = _async(function* (
    this: ElementService,
    element: Element,
    propMapBinding: PropMapBinding,
    updateData: IUpdatePropMapBindingDTO,
  ) {
    const {
      updatePropMapBindings: {
        propMapBindings: [updatedPropMapBinding],
      },
    } = yield* _await(
      propMapBindingApi.UpdatePropMapBindings({
        where: { id: propMapBinding.id },
        update: {
          sourceKey: updateData.sourceKey,
          targetKey: updateData.targetKey,
          targetElement: reconnectNode(updateData.targetElementId),
        },
      }),
    )

    if (!updatedPropMapBinding) {
      throw new Error('No prop map bindings updated')
    }

    propMapBinding.writeCache(updatedPropMapBinding)

    return propMapBinding
  })

  @modelFlow
  @transaction
  public deletePropMapBinding = _async(function* (
    this: ElementService,
    element: Element,
    propMapBinding: PropMapBinding,
  ) {
    const {
      deletePropMapBindings: { nodesDeleted },
    } = yield* _await(
      propMapBindingApi.DeletePropMapBindings({
        where: { id: propMapBinding.id },
      }),
    )

    if (nodesDeleted === 0) {
      throw new Error('No prop map bindings deleted')
    }

    element.removePropMapBinding(propMapBinding)

    return propMapBinding
  })

  @modelAction
  writeClonesCache(elementFragment: IElementDTO) {
    return [...this.clonedElements.values()]
      .filter((c) => c.sourceElementId === elementFragment.id)
      .map((e) =>
        e.writeCache({
          ...elementFragment,
          parentComponent: e.parentComponent?.current
            ? ({
                id: e.parentComponent.current.id,
              } as IElementDTO['parentComponent'])
            : undefined,
        }),
      )
  }

  @modelAction
  removeClones(elementId: string) {
    return [...this.clonedElements.entries()]
      .filter(([_, component]) => component.sourceElementId === elementId)
      .forEach(([id]) => this.clonedElements.delete(id))
  }
}
