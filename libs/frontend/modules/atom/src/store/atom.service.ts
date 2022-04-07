import { getTagService } from '@codelab/frontend/modules/tag'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { AtomWhere } from '@codelab/shared/abstract/codegen'
import {
  IAtom,
  IAtomDTO,
  IAtomService,
  ICreateAtomDTO,
  IUpdateAtomDTO,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
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

export type WithAtomService = {
  atomService: AtomService
}

@model('@codelab/AtomService')
export class AtomService extends Model({
  atoms: prop(() => objectMap<Atom>()),
  createModal: prop(() => new ModalService({})),
  updateModal: prop(() => new AtomModalService({})),
  deleteModal: prop(() => new AtomsModalService({})),
  selectedIds: prop(() => arraySet<string>()).withSetter(),
}) {
  @computed
  get atomsList() {
    return [...this.atoms.values()]
  }

  @computed
  get getResourceAtomList() {
    const atoms = this.atomsList
    const resourceAtoms = atoms.filter((a) => filterResourceType(a.type))

    return resourceAtoms
  }

  atom(id: string) {
    return this.atoms.get(id)
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
    this.atoms.set(atom.id, atom)
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
    const tagService = getTagService(this)
    const { atoms } = yield* _await(atomApi.GetAtoms({ where }))

    return this.updateCache(atoms)
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

  @modelFlow
  @transaction
  create = _async(function* (
    this: AtomService,
    input: ICreateAtomDTO,
    ownerId: Nullish<string>,
  ) {
    const apiOwner = ownerId
      ? { connect: { where: { node: { auth0Id: ownerId } } } }
      : undefined

    const apiNode = {
      id: v4(),
      name: `${input.name} API`,
      owner: apiOwner,
    }

    const tagsConnect = input.tags?.map((tag) => ({
      where: { node: { id: tag } },
    }))

    const {
      createAtoms: { atoms },
    } = yield* _await(
      atomApi.CreateAtoms({
        input: {
          id: v4(),
          name: input.name,
          type: input.type,
          tags: { connect: tagsConnect },
          api: { create: { node: apiNode } },
        },
      }),
    )

    const atom = atoms[0]

    if (!atom) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Atom was not created')
    }

    const atomModel = Atom.hydrate(atom)

    this.atoms.set(atomModel.id, atomModel)

    return atomModel
  })

  @modelFlow
  @transaction
  deleteMany = _async(function* (this: IAtomService, atoms: Array<IAtom>) {
    const ids = atoms.map((atom) => atom.id)

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

    return deleteAtoms
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: IAtomService, id: string) {
    const existing = throwIfUndefined(this.atoms.get(id))

    if (existing) {
      this.atoms.delete(id)
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
