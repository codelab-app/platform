import {
  IAtom,
  IAtomDTO,
  IAtomService,
  ICreateAtomDTO,
  IElementDTO,
  isAtomDTO,
  IUpdateAtomDTO,
} from '@codelab/frontend/abstract/core'
import { getTagService } from '@codelab/frontend/domain/tag'
import { ModalService } from '@codelab/frontend/shared/utils'
import { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import { connectNode, connectOwner, reconnectNodes } from '@codelab/shared/data'
import { computed } from 'mobx'
import {
  _async,
  _await,
  arraySet,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { atomApi } from './atom.api'
import { Atom } from './atom.model'
import { AtomModalService, AtomsModalService } from './atom-modal.service'

@model('@codelab/AtomService')
export class AtomService
  extends Model({
    id: idProp,
    atoms: prop(() => objectMap<IAtom>()),
    count: prop(() => 1),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new AtomModalService({})),
    deleteManyModal: prop(() => new AtomsModalService({})),
    selectedIds: prop(() => arraySet<string>()).withSetter(),
  })
  implements IAtomService
{
  @modelFlow
  @transaction
  update = _async(function* (
    this: AtomService,
    atom: Atom,
    { name, type, tags = [], allowedChildren = [] }: IUpdateAtomDTO,
  ) {
    const allowedChildrenIds = allowedChildren.map(
      (allowedChild) => allowedChild,
    )

    const { updateAtoms } = yield* _await(
      atomApi.UpdateAtoms({
        update: {
          name,
          type,
          allowedChildren: [reconnectNodes(allowedChildrenIds)],
          tags: [reconnectNodes(tags)],
        },
        where: { id: atom.id },
      }),
    )

    const updatedAtom = updateAtoms.atoms[0]

    if (!updatedAtom) {
      throw new Error('Failed to update atom')
    }

    atom.writeCache(updatedAtom)

    return atom
  })

  @computed
  get atomsList() {
    return Array.from(this.atoms.values())
  }

  @modelAction
  public writeCacheFromElements(elements: Array<IElementDTO>) {
    const atoms = elements
      .map((element) => element.renderAtomType)
      .filter(isAtomDTO)

    return atoms.map((atom) => this.writeCache(atom))
  }

  @modelAction
  writeCache(atom: IAtomDTO) {
    console.debug('AtomService.writeCache', atom)

    const tagService = getTagService(this)

    atom.tags.map((tag) => tagService.writeCache(tag))

    let atomModel = this.atoms.get(atom.id)

    if (atomModel) {
      atomModel.writeCache(atom)
    } else {
      atomModel = Atom.hydrate(atom)
      this.atoms.set(atom.id, atomModel)
    }

    return atomModel
  }

  @modelFlow
  @transaction
  getAll = _async(function* (
    this: AtomService,
    where?: AtomWhere,
    options?: AtomOptions,
  ) {
    const { atoms, atomsAggregate } = yield* _await(
      atomApi.GetAtoms({ where, options }),
    )

    this.count = atomsAggregate.count

    return atoms.map((atom) => this.writeCache(atom))
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: AtomService, id: string) {
    if (this.atoms.has(id)) {
      return this.atoms.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  /**
   * @param interfaceId Optional interface ID for connecting to existing interface, instead of creating an interface
   */
  @modelFlow
  @transaction
  create = _async(function* (this: AtomService, data: Array<ICreateAtomDTO>) {
    const createApiNode = (atom: ICreateAtomDTO) => ({
      id: v4(),
      name: `${atom.name} API`,
      owner: connectOwner(atom.owner),
    })

    const connectTags = (atom: ICreateAtomDTO) => {
      return atom.tags?.map((tag) => ({
        where: { node: { id: tag } },
      }))
    }

    const connectOrCreateApi = (atom: ICreateAtomDTO) =>
      atom.api
        ? connectNode(atom.api)
        : {
            create: { node: createApiNode(atom) },
          }

    const input = data.map((atom) => ({
      id: atom.id ?? v4(),
      name: atom.name,
      type: atom.type,
      tags: { connect: connectTags(atom) },
      api: connectOrCreateApi(atom),
    }))

    const {
      createAtoms: { atoms },
    } = yield* _await(atomApi.CreateAtoms({ input }))

    if (!atoms.length) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Atom was not created')
    }

    return atoms.map((atom) => {
      const atomModel = Atom.hydrate(atom)

      this.atoms.set(atomModel.id, atomModel)

      return atomModel
    })
  })

  @modelFlow
  @transaction
  deleteMany = _async(function* (this: IAtomService, ids: Array<string>) {
    for (const id of ids) {
      if (this.atoms.has(id)) {
        this.atoms.delete(id)
      }
    }

    const { deleteAtoms } = yield* _await(
      atomApi.DeleteAtoms({ where: { id_IN: ids } }),
    )

    if (deleteAtoms.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Atom was not deleted')
    }

    return [...this.atoms.values()].filter((atom) => atom.id in ids)
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: IAtomService, id: string) {
    const existing = this.atoms.get(id)

    if (!existing) {
      throw new Error('Atom not found')
    }

    this.atoms.delete(id)

    const { deleteAtoms } = yield* _await(
      atomApi.DeleteAtoms({ where: { id } }),
    )

    if (deleteAtoms.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Atom was not deleted')
    }

    return existing
  })
}
