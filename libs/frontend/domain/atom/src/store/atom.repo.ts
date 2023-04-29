import {
  type IAtom,
  type IAtomRepository,
  filterNotHookType,
} from '@codelab/frontend/abstract/core'
import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import sortBy from 'lodash/sortBy'
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
  find = _async(function* (
    this: AtomRepository,
    where?: AtomWhere,
    options?: AtomOptions,
  ) {
    return yield* _await(atomApi.GetAtoms({ options, where }))
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

  /**
   * Get list of atom previews for select dropdown
   */
  @modelFlow
  findOptions = _async(function* (this: AtomRepository) {
    const { atoms } = yield* _await(atomApi.GetAtomOptions())

    return sortBy(
      atoms.filter(({ type }) => filterNotHookType(type)),
      'name',
    )
  })
}
