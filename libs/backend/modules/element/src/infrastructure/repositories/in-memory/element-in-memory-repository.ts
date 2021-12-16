import { CreateResponsePort } from '@codelab/backend/abstract/core'
import { InMemoryRepository } from '@codelab/backend/infra'
import {
  IElement,
  IElementGraph,
  IEnumTypeValue,
  IHook,
  IPropMapBinding,
} from '@codelab/shared/abstract/core'
import Fuse from 'fuse.js'
import {
  ComponentWhere,
  ElementExistsAndOwnerResponse,
  GetReferencesResponse,
  IElementRepository,
} from '../abstract/element-repository.interface'

/**
 * In-memory implementation of {@see IElementRepository}.
 */
export class ElementInMemoryRepository
  extends InMemoryRepository<IElement>
  implements IElementRepository
{
  async updateAll(elements: Array<IElement>): Promise<void> {
    elements.forEach((element) => this.update(element))
  }

  createAll(elements: Array<IElement>): Promise<Array<CreateResponsePort>> {
    return Promise.all(elements.map((element) => this.create(element)))
  }

  async getLastOrderInParent(parentId: string): Promise<number | undefined> {
    const children = this.data.filter((c) => c.parentElement?.id === parentId)

    const lastChild = children
      ?.sort(
        (a, b) => (a.parentElement?.order ?? 0) - (b.parentElement?.order ?? 0),
      )
      .pop()

    return lastChild?.parentElement?.order ?? undefined
  }

  async addHook(elementId: string, hook: IHook): Promise<CreateResponsePort> {
    const element = await this.getOne(elementId)

    if (!element) {
      throw new Error('Element not found')
    }

    const id = (hook.id = this.generateId())

    element.hooks.push(hook)

    return { id }
  }

  async addPropMapBinding(
    elementId: string,
    propMapBinding: IPropMapBinding,
  ): Promise<CreateResponsePort> {
    const element = await this.getOne(elementId)

    if (!element) {
      throw new Error('Element not found')
    }

    const id = (propMapBinding.id = this.generateId())

    element.propMapBindings.push(propMapBinding)

    return { id }
  }

  async elementExistsAndGetOwner(
    elementId: string,
  ): Promise<ElementExistsAndOwnerResponse> {
    const element = await this.getOne(elementId)

    return {
      elementExists: !!element,
      ownerId: element?.owner?.id,
    }
  }

  async getComponents(
    where: ComponentWhere | undefined,
  ): Promise<Array<IElement>> {
    const all = await this.getAll()
    let results = all.filter((e) => !!e.componentTag)

    if (where?.name) {
      // Dgraph doesn't order the results by relevance, use Fuse for that
      const fuse = new Fuse(results ?? [], {
        keys: ['name', 'componentTag.name'],
        shouldSort: true,
        isCaseSensitive: false,
      })

      results = fuse.search(where.name).map((r) => r.item)
    }

    if (where?.ownerId) {
      results = results.filter((e) => !e.owner || e.owner?.id === where.ownerId)
    }

    if (where?.uids) {
      const uidsSet = new Set(where.uids)
      results = results.filter((e) => uidsSet.has(e.id))
    }

    if (where?.fixedIds) {
      const idsSet = new Set(where.fixedIds)
      results = results.filter((e) => idsSet.has(e.id))
    }

    return results
  }

  async getEnumValues(
    enumValueIds: Array<string>,
  ): Promise<Array<IEnumTypeValue>> {
    throw new Error('Not implemented')
  }

  async getGraph(rootElementId: string): Promise<IElementGraph> {
    throw new Error('Not implemented')
  }

  async getGraphByFixedId(fixedId: string): Promise<IElementGraph> {
    throw new Error('Not implemented')
  }

  async getGraphByRootIds(
    rootElementIds: Array<string>,
  ): Promise<IElementGraph> {
    throw new Error('Not implemented')
  }

  async getOneByFixedId(fixedId: string): Promise<IElement | undefined> {
    const all = await this.getAll()

    return all.find((e) => e.fixedId === fixedId)
  }

  async getReferences(
    elementId: string,
  ): Promise<GetReferencesResponse | undefined> {
    throw new Error('Not implemented')
  }

  async isElementRoot(elementId: string): Promise<boolean | undefined> {
    throw new Error('Not implemented')
  }

  async removeHook(elementId: string, hook: IHook): Promise<void> {
    throw new Error('Not implemented')
  }

  async removePropMapBinding(
    elementId: string,
    propMapBinding: IPropMapBinding,
  ): Promise<void> {
    throw new Error('Not implemented')
  }

  async createGraph(graph: IElementGraph): Promise<CreateResponsePort> {
    throw new Error('Not implemented')
  }
}
