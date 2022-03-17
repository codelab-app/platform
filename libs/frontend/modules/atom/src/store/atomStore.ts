import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import { ModalStore } from '@codelab/frontend/shared/utils'
import { AtomWhere } from '@codelab/shared/abstract/codegen-v2'
import { AtomType } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  detach,
  ExtendedModel,
  idProp,
  Model,
  model,
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
import type { UpdateAtomInputSchema } from '../use-cases/update-atom/updateAtomSchema'
import { atomApi } from './atomApi'

@model('codelab/Atom')
export class Atom extends Model({
  id: idProp,
  type: prop<AtomType>(),
  name: prop<string>(),
  // TODO add tags to atom after refactoring tag module to mobx. 1. in props, 2. in Atom.update() 3. in AtomStore.createAtom()
  // tags: prop<Tag[]>(),
  api: prop<Ref<InterfaceType>>(),
}) {
  @modelFlow
  @transaction
  update = _async(function* (
    this: Atom,
    { name, type, tags }: UpdateAtomInputSchema,
  ) {
    this.name = name
    this.type = type

    const { updateAtoms } = yield* _await(
      atomApi.UpdateAtoms({
        update: { name, type },
        where: { id: this.id },
      }),
    )

    const atom = updateAtoms?.atoms[0]

    if (!atom) {
      throw new Error('Failed to update atom')
    }

    this.name = atom.name
    this.type = atom.type

    return atom
  })

  static fromFragment(atom: AtomFragment) {
    return new Atom({
      id: atom.id,
      name: atom.name,
      type: atom.type,
      api: typeRef(atom.api.id) as Ref<InterfaceType>,
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

@model('codelab/AtomModalStore')
class AtomModalStore extends ExtendedModel(() => ({
  baseModel: modelClass<ModalStore<Ref<Atom>>>(ModalStore),
  props: {},
})) {
  @computed
  get atom() {
    return this.metadata?.current ?? null
  }
}

@model('codelab/AtomStore')
export class AtomStore extends Model({
  atoms: prop(() => objectMap<Atom>()),
  createModal: prop(() => new ModalStore({})),
  updateModal: prop(() => new AtomModalStore({})),
  deleteModal: prop(() => new AtomModalStore({})),
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
  getAll = _async(function* (this: AtomStore, where?: AtomWhere) {
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
  getOne = _async(function* (this: AtomStore, id: string) {
    if (this.atoms.has(id)) {
      return this.atoms.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  @transaction
  createAtom = _async(function* (
    this: AtomStore,
    input: CreateAtomInputSchema,
    ownerId: Nullish<string>,
  ) {
    const apiOwner = ownerId
      ? { connect: [{ where: { node: { auth0Id: ownerId } } }] }
      : undefined

    const apiNode = { name: `${input.name} API`, owner: apiOwner }

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
  delete = _async(function* (this: AtomStore, id: string) {
    if (this.atoms.has(id)) {
      this.atoms.delete(id)
    }

    const { deleteAtoms } = yield* _await(
      atomApi.DeleteAtoms({ where: { id } }),
    )

    if (deleteAtoms.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Atom was not deleted')
    }

    return deleteAtoms
  })
}
