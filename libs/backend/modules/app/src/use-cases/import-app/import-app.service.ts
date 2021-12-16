import { UseCasePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphRepository,
  DgraphUpdateMutationJson,
  ITransaction,
} from '@codelab/backend/infra'
import { GetAtomsService } from '@codelab/backend/modules/atom'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '@codelab/backend/modules/element'
import {
  IAtom,
  IElement,
  IExportApp,
  IUser,
} from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { Inject, Injectable } from '@nestjs/common'
import { Mutation } from 'dgraph-js-http'
import { omit } from 'lodash'
import { CreateAppService } from '../create-app'
import { ImportAppRequest } from './import-app.request'
import {
  collectAllEdges,
  collectAllElements,
  createPlaceholderElement,
  parsePayload,
  PayloadIdToExistingIdMap,
  replaceIdInPayload,
  replaceManyIdsInPayload,
  splitElementsByFixedId,
} from './utils'

@Injectable()
export class ImportAppService
  implements UseCasePort<ImportAppRequest, CreateResponse>
{
  constructor(
    protected createAppService: CreateAppService,
    protected getAtomsService: GetAtomsService,
    @Inject(IElementRepositoryToken) protected elementRepo: IElementRepository,
  ) {}

  async execute({
    input: { payload },
    currentUser,
    transaction,
  }: ImportAppRequest): Promise<CreateResponse> {
    let parsedPayload: IExportApp = parsePayload(payload)

    parsedPayload = await this.createAppAndReplaceIdReferences(
      parsedPayload,
      currentUser,
    )

    parsedPayload = await this.replaceAtomIdReferences(parsedPayload)

    // Create placeholder elements first, we update them later with the content
    // That way we can resolve all references (app, atom, pages, other elements)
    // Before writing the actual element data, where those are likely referenced in the props
    parsedPayload = await this.replaceElementIdReferences(
      parsedPayload,
      transaction,
      currentUser,
    )

    parsedPayload = await this.createPagesAndReplaceIdReferences(
      parsedPayload,
      currentUser,
      transaction,
    )

    await this.updatePlaceholderElements(parsedPayload, transaction)

    return { id: parsedPayload.id }
  }

  /** Creates the app and returns the payload with replaced appId everywhere in the payload */
  protected async createAppAndReplaceIdReferences(
    payload: IExportApp,
    currentUser: IUser,
  ): Promise<IExportApp> {
    const { id: appId } = await this.createAppService.execute({
      currentUser,
      input: { name: payload.name },
    })

    return replaceIdInPayload(payload, {
      payloadId: payload.id,
      existingId: appId,
    })
  }

  protected async createPagesAndReplaceIdReferences(
    payload: IExportApp,
    currentUser: IUser,
    transaction: ITransaction,
  ): Promise<IExportApp> {
    const pageIdMap = new PayloadIdToExistingIdMap()

    // TODO use page repository after implementing it
    for (const page of payload.pages) {
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
        uid: payload.id, // this is updated earlier too, so it's the one we want
        pages: { uid: pageBlankNode },
      }

      const mutation: Mutation = { setJson: [createPageJson, updateAppJson] }
      const response = await transaction.mutate(mutation)
      const newId = DgraphRepository.getUid(response, pageBlankNode)

      pageIdMap.set({ existingId: newId, payloadId: page.id })
    }

    return replaceManyIdsInPayload(payload, pageIdMap)
  }

  protected async updatePlaceholderElements(
    payload: IExportApp,
    transaction: ITransaction,
  ): Promise<void> {
    // All the elements have their ids replaced by their placeholder id, so we can just run an update on them
    // And we must make sure the links are updated too

    for (const page of payload.pages) {
      const tree = new ElementTree(page.elements)
      const roots = tree.getRootVertices()
      const updates: Array<IElement> = []

      const makeUpdateForElement = (
        element: IElement,
        parentId?: string,
        order?: number,
      ): void => {
        if (!element.id) {
          throw new Error('Element has no id')
        }

        // All the placeholder elements are completely empty except for the id (ofc), the fixedId and the owner
        updates.push({
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
        })

        const children = tree.getChildren(element.id)

        for (const child of children) {
          makeUpdateForElement(
            child,
            element.id,
            tree.getOrderInParent(child.id),
          )
        }
      }

      for (const root of roots) {
        makeUpdateForElement(root, undefined)
      }

      await this.elementRepo.updateAll(updates, transaction)
    }
  }

  /**
   * Replaces all the ids in the payload with existing ones.
   * For components with a fixedId, if its found - it will be used.
   * For everything else - an empty placeholder element is created.
   */
  private async replaceElementIdReferences(
    payload: IExportApp,
    transaction: ITransaction,
    currentUser: IUser,
  ): Promise<IExportApp> {
    const allElements: Array<IElement> = collectAllElements(payload)
    const elementsIdMap = new PayloadIdToExistingIdMap()
    const importedElements = splitElementsByFixedId(allElements)

    // Find out all the existing components by fixedId. We will update them instead of creating new ones
    const fixedIds = importedElements.withFixedId
      .map((c) => c.fixedId)
      .filter((id): id is string => !!id)

    const existingComponentsByFixedId: Map<string, IElement> =
      await this.elementRepo
        .getComponents({ fixedIds }, transaction)
        .then(
          (r) =>
            new Map(
              r
                .filter((ec) => !!ec.fixedId)
                .map((ec) => [ec.fixedId as string, ec]),
            ),
        )

    for (const payloadComponent of importedElements.withFixedId) {
      const existingComponent = existingComponentsByFixedId.get(
        payloadComponent.fixedId,
      )

      if (!existingComponent?.id || !payloadComponent?.id) {
        continue
      }

      elementsIdMap.set({
        existingId: existingComponent.id,
        payloadId: payloadComponent.id,
      })
    }

    // Go through all the components and see if we are to create some elements or update and delete old ones
    if (existingComponentsByFixedId.size > 0) {
      const allEdges = collectAllEdges(payload)

      const appTree = new ElementTree({
        vertices: allElements,
        edges: allEdges,
      })

      const importedVertexIdByFixedId: Map<string, string> = new Map(
        allElements
          .filter((e) => e.fixedId)
          .map((e) => [e.fixedId as string, e.id]),
      )

      for (const existingComponent of existingComponentsByFixedId.values()) {
        const existingComponentGraph = await this.elementRepo.getGraph(
          existingComponent.id,
          transaction,
        )

        const rootImportedId = importedVertexIdByFixedId.get(
          existingComponent.fixedId as string,
        ) as string

        const importedTree = new ElementTree(
          appTree.getSubgraph(rootImportedId),
        )

        const existingComponentTree = new ElementTree(existingComponentGraph)
        const toDelete: Array<string> = []

        // TLDR: compare by fixedId child by child each element in the existing tree with the same element in the imported tree
        // If we find a child that is not in the imported tree, we will delete it
        // If we find a child that is in both, we will update it
        const compareLevel = async (
          payloadParentId: string,
          existingParentId: string,
        ) => {
          const payloadChildren = importedTree.getChildren(payloadParentId)

          const existingChildren =
            existingComponentTree.getChildren(existingParentId)

          const payloadChildrenByFixedId = new Map(
            payloadChildren.map((c) => [c.fixedId, c]),
          )

          for (const existingChild of existingChildren) {
            const foundPayloadChild = payloadChildrenByFixedId.get(
              existingChild.fixedId,
            )

            if (!foundPayloadChild) {
              // Element found in existing tree but not in payload tree. Delete it
              toDelete.push(existingChild.id)
            } else {
              // Element found in both trees. Mark it for update
              elementsIdMap.set({
                existingId: existingChild.id,
                payloadId: foundPayloadChild.id,
              })

              // Recurse
              await compareLevel(foundPayloadChild?.id, existingChild.id)
            }
          }
        }

        await compareLevel(rootImportedId, existingComponent.id)

        if (toDelete.length > 0) {
          await this.elementRepo.deleteAll(toDelete, transaction)
        }
      }
    }

    // For the rest - create placeholder elements, so we can update them later
    const elementsToCreate = [
      ...importedElements.withoutFixedId, // all without fixed id
      ...importedElements.withFixedId.filter(
        // all with fixed id, which we couldn't find earlier
        (c) => !existingComponentsByFixedId.has(c.fixedId),
      ),
    ].filter((c) => !elementsIdMap.hasPayloadId(c.id))

    const placeholderElements = await this.elementRepo.createAll(
      elementsToCreate.map((e) => createPlaceholderElement(e, currentUser)),
      transaction,
    )

    if (placeholderElements.length !== elementsToCreate.length) {
      throw new Error('Failed to create placeholder elements')
    }

    // Go through all elements and assign the new placeholder id in the map
    // Right now order doesn't matter, since they're all just placeholders
    for (const [i, placeholderElement] of placeholderElements.entries()) {
      const importedId = elementsToCreate[i].id

      if (!importedId) {
        continue
      }

      elementsIdMap.set({
        existingId: placeholderElement.id,
        payloadId: importedId,
      })
    }

    return replaceManyIdsInPayload(payload, elementsIdMap)
  }

  /**
   * Finds all the existing atoms that are referenced by the elements - either by id or by Atom.type
   * Replaces all the atom references in the payload with the existing ones
   * Throws error if some atoms are not found
   * Returns the replaced payload
   */
  private async replaceAtomIdReferences(
    payload: IExportApp,
  ): Promise<IExportApp> {
    const allElements: Array<IElement> = collectAllElements(payload)
    const atomIdsMap = new PayloadIdToExistingIdMap()

    const allInputAtoms = allElements
      .map((e) => e.atom)
      .filter((a): a is IAtom => !!a)

    const inputAtomIds =
      allInputAtoms.map((a) => a.id).filter((id): id is string => !!id) ?? []

    // Fetch the existing atoms
    const existingAtomsById: Map<string, IAtom> = await this.getAtomsService
      .execute({ where: { ids: inputAtomIds } })
      .then((r) => new Map(r.map((a) => [a.id, a])))

    const inputAtomTypes = allInputAtoms.map((a) => a.type) ?? []

    const existingAtomsByType: Map<string, IAtom> = await this.getAtomsService
      .execute({ where: { types: inputAtomTypes } })
      .then((r) => new Map(r.map((a) => [a.type, a])))

    // Store the old -> new map pairs
    for (const inputAtom of allInputAtoms) {
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

      atomIdsMap.set({ payloadId: inputAtom.id, existingId: existingAtom.id })
    }

    return replaceManyIdsInPayload(payload, atomIdsMap)
  }
}
