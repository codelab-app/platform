import { ModalService } from '@codelab/frontend/shared/utils'
import { AtomWhere } from '@codelab/shared/abstract/codegen-v2'
import { Nullish } from '@codelab/shared/abstract/types'
import { difference } from 'lodash'
import { computed } from 'mobx'
import {
  _async,
  _await,
  createContext,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  Ref,
  transaction,
} from 'mobx-keystone'
import type { CreateAtomInputSchema, UpdateAtomInputSchema } from '../use-cases'
import { makeTagConnectData } from '../use-cases/helper'
import { atomApi } from './atom.api'
import { Atom, AtomFromFragmentInput } from './atom.model'
import { AtomModalService, AtomsModalService } from './atom-modal.service'

export type WithAtomService = {
  atomService: AtomService
}

@model('codelab/AtomService')
export class AtomService extends Model({
  atoms: prop(() => objectMap<Atom>()),
  createModal: prop(() => new ModalService({})),
  updateModal: prop(() => new AtomModalService({})),
  deleteModal: prop(() => new AtomsModalService({})),
  selectedAtoms: prop(() => Array<Ref<Atom>>()).withSetter(),
}) {
  @computed
  get atomsList() {
    return [...this.atoms.values()]
  }

  atom(id: string) {
    return this.atoms.get(id)
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: AtomService,
    atom: Atom,
    { name, type, tags }: UpdateAtomInputSchema,
  ) {
    const existingTagIds = atom.tagIds
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

    atom.updateFromFragment(updatedAtom)

    return atom
  })

  @modelAction
  addAtom(atom: Atom) {
    this.atoms.set(atom.id, atom)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: AtomService, where?: AtomWhere) {
    const { atoms } = yield* _await(atomApi.GetAtoms({ where }))

    return atoms.map((atom) => {
      if (this.atoms.get(atom.id)) {
        return this.atoms.get(atom.id)
      } else {
        const atomModel = Atom.fromFragment(atom)
        this.atoms.set(atom.id, atomModel)

        return atomModel
      }
    })
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
    input: CreateAtomInputSchema,
    ownerId: Nullish<string>,
  ) {
    const apiOwner = ownerId
      ? { connect: [{ where: { node: { auth0Id: ownerId } } }] }
      : undefined

    const apiNode = {
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

    const atomModel = Atom.fromFragment(atom)

    this.atoms.set(atomModel.id, atomModel)

    return atomModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: AtomService, atoms: Array<Atom>) {
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
}

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const atomServiceContext = createContext<AtomService>()
