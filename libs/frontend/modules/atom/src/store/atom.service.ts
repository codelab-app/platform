import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { AtomWhere } from '@codelab/shared/abstract/codegen'
import {
  IAtomDTO,
  IAtomService,
  ICreateAtomDTO,
  IUpdateAtomDTO,
} from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/data'
import { difference } from 'lodash'
import { computed } from 'mobx'
import {
  _async,
  _await,
  arraySet,
  createContext,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { makeTagConnectData } from '../use-cases/helper'
import { atomApi } from './atom.api'
import { Atom } from './atom.model'
import { AtomModalService, AtomsModalService } from './atom-modal.service'

@model('@codelab/AtomService')
export class AtomService
  extends Model({
    _atoms: prop(() => objectMap<Atom>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new AtomModalService({})),
    deleteManyModal: prop(() => new AtomsModalService({})),
    selectedIds: prop(() => arraySet<string>()).withSetter(),
  })
  implements IAtomService
{
  @computed
  get atoms() {
    return [...this._atoms.values()]
  }

  atom(id: string) {
    return this._atoms.get(id)
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: AtomService,
    atom: Atom,
    { name, type, tags }: IUpdateAtomDTO,
  ) {
    const existingTagIds = atom.tags.map((tag) => tag.id)
    const connect = makeTagConnectData(difference(tags, existingTagIds))

    const disconnect = makeTagConnectData(
      difference(existingTagIds, tags || []),
    )

    const { updateAtoms } = yield* _await(
      atomApi.UpdateAtoms({
        update: {
          name,
          type,
          tags: [{ connect, disconnect }],
        },
        where: { id: atom.id },
      }),
    )

    const updatedAtom = updateAtoms?.atoms[0]

    if (!atom) {
      throw new Error('Failed to update atom')
    }

    atom.updateCache(updatedAtom)

    return atom
  })

  @modelAction
  addAtom(atom: Atom) {
    this._atoms.set(atom.id, atom)
  }

  @modelAction
  addOrUpdate(atom: IAtomDTO) {
    let atomModel = this.atom(atom.id)

    if (atomModel) {
      atomModel.updateCache(atom)
    } else {
      atomModel = Atom.hydrate(atom)
      this.addAtom(atomModel)
    }

    return atomModel
  }

  @modelAction
  updateCache(atoms: Array<IAtomDTO>) {
    return atoms.map((atom) => this.addOrUpdate(atom))
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: AtomService, where?: AtomWhere) {
    // const tagService = getTagService(this)
    const { atoms } = yield* _await(atomApi.GetAtoms({ where }))

    console.log(atoms)

    return atoms.map((atom) => {
      const atomModel = Atom.hydrate(atom)
      this._atoms.set(atom.id, atomModel)

      return atomModel
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: AtomService, id: string) {
    if (this._atoms.has(id)) {
      return this._atoms.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

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

    const input = data.map((atom) => ({
      id: v4(),
      name: atom.name,
      type: atom.type,
      tags: { connect: connectTags(atom) },
      api: { create: { node: createApiNode(atom) } },
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

      this._atoms.set(atomModel.id, atomModel)

      return atomModel
    })
  })

  @modelFlow
  @transaction
  deleteMany = _async(function* (this: IAtomService, ids: Array<string>) {
    for (const id of ids) {
      if (this._atoms.has(id)) {
        this._atoms.delete(id)
      }
    }

    const { deleteAtoms } = yield* _await(
      atomApi.DeleteAtoms({ where: { id_IN: ids } }),
    )

    if (deleteAtoms.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Atom was not deleted')
    }

    return deleteAtoms
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: IAtomService, id: string) {
    const existing = throwIfUndefined(this._atoms.get(id))

    if (existing) {
      this._atoms.delete(id)
    }

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

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const atomServiceContext = createContext<AtomService>()

export const getAtomService = (self: any) => {
  const atomStore = atomServiceContext.get(self)

  if (!atomStore) {
    throw new Error('atomServiceContext is not defined')
  }

  return atomStore
}
