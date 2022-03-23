import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import { ModalStore } from '@codelab/frontend/shared/utils'
import { AtomWhere } from '@codelab/shared/abstract/codegen-v2'
import { AtomType } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { difference } from 'lodash'
import { computed } from 'mobx'
import {
  _async,
  _await,
  detach,
  ExtendedModel,
  idProp,
  Model,
  model,
  modelAction,
  modelClass,
  modelFlow,
  objectMap,
  prop,
  Ref,
  rootRef,
  transaction,
} from 'mobx-keystone'
import { AtomFragment } from '../graphql/Atom.fragment.v2.1.graphql.gen'
import type { CreateAtomInputSchema } from '../use-cases/create-atom/createAtomSchema'
import { makeTagConnectData } from '../use-cases/helper'
import type { UpdateAtomInputSchema } from '../use-cases/update-atom/updateAtomSchema'
import { atomApi } from './atom.api'

@model('codelab/Atom')
export class Atom extends Model({
  id: idProp,
  type: prop<AtomType>(),
  name: prop<string>(),
  tagIds: prop<Array<string>>(),
  // TODO add tags to atom after refactoring tag module to mobx. 1. in props, 2. in Atom.update() 3. in AtomStore.createAtom()
  // tags: prop<Tag[]>(),
  api: prop<Ref<InterfaceType>>(),
}) {
  static fromFragment(atom: AtomFragment) {
    return new Atom({
      id: atom.id,
      name: atom.name,
      type: atom.type,
      api: typeRef(atom.api.id) as Ref<InterfaceType>,
      tagIds: atom.tags.map((tag) => tag.id),
    })
  }
}

export const atomRef = rootRef<Atom>('AtomRef', {
  onResolvedValueChange(ref, newAtom, oldAtom) {
    if (oldAtom && !newAtom) {
      detach(ref)
    }
  },
})

export type WithAtomService = {
  atomService: AtomService
}

@model('codelab/AtomService')
export class AtomService extends Model({
  atoms: prop(() => objectMap<Atom>()),
  createModal: prop(() => new ModalStore({})),
  updateModal: prop(() => new ModalStore({})),
  deleteModal: prop(() => new ModalStore({})),
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

    const atomModel = Atom.fromFragment(updatedAtom)

    this.atoms.set(atom.id, atomModel)

    return atomModel
  })

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
  createAtom = _async(function* (
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
      descendantTypesIds: [],
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
  delete = _async(function* (this: AtomService, ids: Array<string>) {
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
