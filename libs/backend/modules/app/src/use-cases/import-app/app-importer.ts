import { CreateResponsePort } from '@codelab/backend/abstract/core'
import {
  DgraphEntityType,
  DgraphUpdateMutationJson,
  getUidFromResponse,
  ITransaction,
} from '@codelab/backend/infra'
import { GetAtomsService } from '@codelab/backend/modules/atom'
import { IElementRepository } from '@codelab/backend/modules/element'
import {
  IAtom,
  IElement,
  IExportApp,
  IUser,
} from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { entityMapById } from '@codelab/shared/utils'
import { Mutation } from 'dgraph-js-http'
import { omit, partition } from 'lodash'
import { CreateAppService } from '../create-app'
import {
  collectAllEdges,
  collectAllElements,
  collectAllFixedIds,
  collectEntityIds,
  createMapByFixedId,
  createPlaceholderElement,
  PayloadIdToExistingIdMap,
  replaceIdInPayload,
  replaceManyIdsInPayload,
} from './utils'

/**
 * Helper class for ImportApp use case.
 * Use once per execution, do not reuse
 */
export class AppImporter {
  // we define it using the payload setter
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private allPayloadElements: Array<IElement> = null!

  private readonly elementsIdMap = new PayloadIdToExistingIdMap()

  private readonly elementIdsToDelete = new Set<string>()

  constructor(
    payload: IExportApp,
    private readonly currentUser: IUser,
    private readonly transaction: ITransaction,
    private readonly createAppService: CreateAppService,
    private readonly getAtomsService: GetAtomsService,
    private readonly elementRepo: IElementRepository,
  ) {
    this.payload = payload
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _payload: IExportApp = null!

  get payload(): IExportApp {
    return this._payload
  }

  set payload(value: IExportApp) {
    this._payload = value
    this.allPayloadElements = collectAllElements(value)
  }

  /**
   * Main entrypoint
   */
  async import() {
    const app = await this.importApp()
    await this.resolveAtomReferences()

    // Create placeholder elements first, we update them later with the content
    // That way we can resolve all references (app, atom, pages, other elements)
    // Before writing the actual element data, where those are likely referenced in the props
    await this.replaceElementIdReferences()

    await this.createPagesAndReplaceIdReferences()

    await this.updatePlaceholderElements()

    return { app }
  }

  //
  // Sub-entry points:
  //

  /**
   * Imports the app and returns the app create response
   */
  private async importApp() {
    const app = await this.createAppService.execute({
      currentUser: this.currentUser,
      input: { name: this.payload.name },
    })

    this.payload = replaceIdInPayload(this.payload, {
      payloadId: this.payload.id,
      newId: app.id,
    })

    return app
  }

  /**
   * Finds all the existing atoms that are referenced by the elements - either by id or by Atom.type
   * Replaces all the atom references in the payload with the existing ones
   * Throws error if some atoms are not found
   * Returns the replaced payload
   */
  private async resolveAtomReferences() {
    const atomIdsMap = new PayloadIdToExistingIdMap()

    // Find all atoms in the payload
    const allPayloadAtoms = this.allPayloadElements
      .map((e) => e.atom)
      .filter((a): a is IAtom => !!a)

    const payloadAtomIds = collectEntityIds(allPayloadAtoms)

    // Fetch the existing atoms
    const existingAtomsById: Map<string, IAtom> = await this.getAtomsService
      .execute({ where: { ids: payloadAtomIds } })
      .then(entityMapById)

    const payloadAtomTypes = allPayloadAtoms.map((a) => a.type)

    const existingAtomsByType: Map<string, IAtom> = await this.getAtomsService
      .execute({ where: { types: payloadAtomTypes } })
      .then((r) => new Map(r.map((a) => [a.type, a])))

    // Store the old -> new map pairs
    for (const inputAtom of allPayloadAtoms) {
      if (!inputAtom.id) {
        throw new Error(`Atom id is not defined for ${inputAtom.id}`)
      }

      let existingAtom = existingAtomsById.get(inputAtom.id)

      if (!existingAtom?.id || existingAtom.type !== inputAtom.type) {
        // Checking by type ensures that it's not a coincidental match of ids
        existingAtom = existingAtomsByType.get(inputAtom.type)
      }

      if (!existingAtom?.id) {
        throw new Error(`Atom ${inputAtom.id} - ${inputAtom.type} is not found`)
      }

      atomIdsMap.set({ payloadId: inputAtom.id, newId: existingAtom.id })
    }

    this.payload = replaceManyIdsInPayload(this.payload, atomIdsMap)
  }

  /**
   * Replaces all the ids in the payload with existing ones.
   * For components with a fixedId, if its found - it will be used.
   * For everything else - an empty placeholder element is created.
   */
  private async replaceElementIdReferences() {
    const [componentsWithFixedId, withoutFixedId] = partition(
      this.allPayloadElements,
      (e) => e.componentTag && e.fixedId,
    )

    // Find out all the existing components by fixedId. We will update them instead of creating new ones
    const fixedIds = collectAllFixedIds(componentsWithFixedId)

    const existingComponentsByFixedId: Map<string, IElement> =
      await this.elementRepo
        .getComponents({ fixedIds }, this.transaction)
        .then(createMapByFixedId)

    await this.replaceComponentsWithFixedId(
      componentsWithFixedId,
      existingComponentsByFixedId,
    )

    // For the rest - create placeholder elements, so we can update them later
    const elementsToCreate = [
      ...withoutFixedId, // all without fixed id
      ...componentsWithFixedId.filter(
        // all with fixed id, which we couldn't find earlier
        (c) => !existingComponentsByFixedId.has(c.fixedId as string),
      ),
    ].filter((c) => !this.elementsIdMap.hasPayloadId(c.id))

    const placeholderElements = await this.createPlaceholderElements(
      elementsToCreate,
    )

    this.replacePlaceholderElementIds(placeholderElements, elementsToCreate)

    this.payload = replaceManyIdsInPayload(this.payload, this.elementsIdMap)
  }

  /**
   * Creates the pages and replace their ids in the payload
   */
  private async createPagesAndReplaceIdReferences() {
    const pageIdMap = new PayloadIdToExistingIdMap()

    for (const page of this.payload.pages) {
      // the root id is replaced by the earlier stage, so we can reliably use it as an existing element reference
      if (!page.rootElementId) {
        throw new Error(`Root element id for page ${page.id} is missing`)
      }

      const pageBlankNode = '_:page'

      const createPageJson = {
        uid: pageBlankNode,
        'dgraph.type': [DgraphEntityType.Page],
        name: page.name,
        root: { uid: page.rootElementId },
      }

      const updateAppJson: DgraphUpdateMutationJson<any> = {
        uid: this.payload.id, // this is updated earlier too, so it's the one we want
        pages: { uid: pageBlankNode },
      }

      const mutation: Mutation = { setJson: [createPageJson, updateAppJson] }
      const response = await this.transaction.mutate(mutation)
      const newId = getUidFromResponse(response, pageBlankNode)

      pageIdMap.set({ newId: newId, payloadId: page.id })
    }

    this.payload = replaceManyIdsInPayload(this.payload, pageIdMap)
  }

  /**
   * Updates all the previously created placeholder elements with the actual content
   */
  private async updatePlaceholderElements(): Promise<void> {
    // All the elements have their ids replaced by their placeholder id, so we can just run an update on them
    // And we must make sure the links are updated too

    for (const page of this.payload.pages) {
      const tree = new ElementTree(page.elements)
      const roots = tree.getRootVertices()
      const updates: Array<IElement> = []

      for (const root of roots) {
        updates.push(
          ...this.recursiveElementUpdateGenerator(tree, root, undefined),
        )
      }

      await this.elementRepo.updateAll(updates, this.transaction)
    }
  }

  //
  // Helper methods:
  //

  private replacePlaceholderElementIds(
    placeholderElements: Array<CreateResponsePort>,
    elementsToCreate: Array<IElement>,
  ): void {
    // Go through all elements and assign the new placeholder id in the map
    // Right now order doesn't matter, since they're all just placeholders
    for (const [i, placeholderElement] of placeholderElements.entries()) {
      const importedId = elementsToCreate[i].id

      if (!importedId) {
        continue
      }

      this.elementsIdMap.set({
        newId: placeholderElement.id,
        payloadId: importedId,
      })
    }
  }

  private async createPlaceholderElements(
    elementsToCreate: Array<IElement>,
  ): Promise<Array<CreateResponsePort>> {
    const input = elementsToCreate.map((e) =>
      createPlaceholderElement(e, this.currentUser),
    )

    const placeholderElements = await this.elementRepo.createAll(
      input,
      this.transaction,
    )

    if (placeholderElements.length !== elementsToCreate.length) {
      throw new Error('Failed to create placeholder elements')
    }

    return placeholderElements
  }

  /** Adds to this.elementsIdMap all the existing components by fixed id */
  private async replaceComponentsWithFixedId(
    componentsWithFixedId: Array<IElement>,
    existingComponentsByFixedId: Map<string, IElement>,
  ) {
    const isAnExistingComponentWithFixedId = (c: IElement) =>
      c.componentTag && c.fixedId && existingComponentsByFixedId.has(c.fixedId)

    const getNewIdByFixedId = (fixedId: string) =>
      existingComponentsByFixedId.get(fixedId)?.id as string

    const addElementToExisting = (el: IElement) =>
      this.elementsIdMap.set({
        payloadId: el.id,
        newId: getNewIdByFixedId(el.fixedId as string),
      })

    componentsWithFixedId
      .filter(isAnExistingComponentWithFixedId)
      .forEach(addElementToExisting)

    if (existingComponentsByFixedId.size === 0) {
      return
    }

    const appTree = this.getAppTree()

    const payloadElementsByFixedId: Map<string, IElement> = createMapByFixedId(
      this.allPayloadElements,
    )

    // Go through all the components and see if we are
    // to create some elements or update and delete old ones from their descendants
    for (const existingComponent of existingComponentsByFixedId.values()) {
      const existingComponentGraph = await this.elementRepo.getGraph(
        existingComponent.id,
        this.transaction,
      )

      const rootImportedId = payloadElementsByFixedId.get(
        existingComponent.fixedId as string,
      )?.id as string

      const importedTree = new ElementTree(appTree.getSubgraph(rootImportedId))
      const existingComponentTree = new ElementTree(existingComponentGraph)

      await this.compareElementLevel(
        rootImportedId,
        existingComponent.id,
        importedTree,
        existingComponentTree,
      )
    }

    if (this.elementIdsToDelete.size > 0) {
      await this.elementRepo.deleteAll(
        Array.from(this.elementIdsToDelete),
        this.transaction,
      )
    }
  }

  private getAppTree(): ElementTree {
    const allEdges = collectAllEdges(this.payload)

    return new ElementTree({
      vertices: this.allPayloadElements,
      edges: allEdges,
    })
  }

  /**
   * Compare by fixedId child by child each element in the existing tree with the same element in the imported tree
   * If we find a child that is not in the imported tree, we will delete it
   */
  private async compareElementLevel(
    payloadParentId: string,
    existingParentId: string,
    payloadTree: ElementTree,
    existingTree: ElementTree,
  ): Promise<void> {
    const payloadChildren = payloadTree.getChildren(payloadParentId)
    const existingChildren = existingTree.getChildren(existingParentId)

    const payloadChildrenByFixedId = new Map(
      payloadChildren.map((c) => [c.fixedId, c]),
    )

    for (const existingChild of existingChildren) {
      const foundPayloadChild = payloadChildrenByFixedId.get(
        existingChild.fixedId,
      )

      if (foundPayloadChild) {
        // Element found in both trees. Mark it for update
        this.elementsIdMap.set({
          newId: existingChild.id,
          payloadId: foundPayloadChild.id,
        })

        // Recurse
        return await this.compareElementLevel(
          foundPayloadChild?.id,
          existingChild.id,
          payloadTree,
          existingTree,
        )
      }

      // Element found in existing tree but not in payload tree. Delete it
      this.elementIdsToDelete.add(existingChild.id)
    }
  }

  /**
   * Generates a update entity for the given element and all its descendants
   */
  private *recursiveElementUpdateGenerator(
    tree: ElementTree,
    element: IElement,
    parentId?: string,
    order?: number,
  ): Generator<IElement, any, any> {
    if (!element.id) {
      throw new Error('Element has no id')
    }

    // All the placeholder elements are completely empty except for the id (ofc), the fixedId and the owner
    yield {
      ...omit(element, 'fixedId', 'owner'),
      componentTag: element.componentTag
        ? { ...element.componentTag, id: '' }
        : undefined,
      atom: element.atom ? { ...element.atom } : undefined, // atom ids are replaced too in a prev step
      props: { ...element.props, id: '' },
      propMapBindings:
        element.propMapBindings?.map((pmb) => ({ ...pmb, id: '' })) ?? [],
      hooks: element.hooks?.map((hook) => ({ ...hook, id: '' })) ?? [],
      parentElement: parentId ? { id: parentId, order } : undefined,
    }

    const children = tree.getChildren(element.id)

    for (const child of children) {
      yield* this.recursiveElementUpdateGenerator(
        tree,
        child,
        element.id,
        tree.getOrderInParent(child.id),
      )
    }
  }
}
