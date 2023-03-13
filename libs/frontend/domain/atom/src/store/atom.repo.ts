import type { IAtom, IAtomRepository } from '@codelab/frontend/abstract/core'
import type { AtomWhere } from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { atomApi } from './atom.api'

@model('@codelab/AtomRepository')
export class AtomRepository extends Model({}) implements IAtomRepository {
  @modelFlow
  add = _async(function* (this: AtomRepository, atom: IAtom) {
    const {
      createAtoms: { atoms },
    } = yield* _await(atomApi.CreateAtoms({ input: [atom.toCreateInput()] }))

    return atoms[0]
  })

  @modelFlow
  update = _async(function* (this: AtomRepository, atom: IAtom) {
    const {
      updateAtoms: { atoms },
    } = yield* _await(
      atomApi.UpdateAtoms({
        update: atom.toUpdateInput(),
        where: { id: atom.id },
      }),
    )

    return atoms[0]!
  })

  @modelFlow
  find = _async(function* (this: AtomRepository, where?: AtomWhere) {
    const { atoms } = yield* _await(atomApi.GetAtoms({ where }))

    return atoms
  })

  @modelFlow
  delete = _async(function* (this: AtomRepository, atoms: Array<IAtom>) {
    const {
      deleteAtoms: { nodesDeleted },
    } = yield* _await(
      atomApi.DeleteAtoms({
        where: { id_IN: atoms.map(({ id }) => id) },
      }),
    )

    return nodesDeleted
  })
}
