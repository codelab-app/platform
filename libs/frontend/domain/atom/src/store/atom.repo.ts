import type { IAtom, IAtomRepository } from '@codelab/frontend/abstract/core'
import { filterNotHookType } from '@codelab/frontend/abstract/core'
import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import sortBy from 'lodash/sortBy'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { atomApi } from './atom.api'

// atoms are part of the system and they unlikely to change often,
// so we can cache them until the page is refreshed using Infinity as the TTL
@model('@codelab/AtomRepository')
export class AtomRepository extends Model({}) implements IAtomRepository {
  @modelFlow
  // @clearCacheForKey('atoms')
  add = _async(function* (this: AtomRepository, atom: IAtom) {
    const {
      createAtoms: { atoms },
    } = yield* _await(atomApi.CreateAtoms({ input: [atom.toCreateInput()] }))

    return atoms[0]
  })

  @modelFlow
  // @clearCacheForKey('atoms')
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
  // @cachedWithTTL('atoms', Infinity)
  find = _async(function* (
    this: AtomRepository,
    where?: AtomWhere,
    options?: AtomOptions,
  ) {
    return yield* _await(atomApi.GetAtoms({ options, where }))
  })

  @modelFlow
  // @clearCacheForKey('atoms')
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
  // @cachedWithTTL('atoms', Infinity)
  findOptions = _async(function* (this: AtomRepository) {
    const { atoms } = yield* _await(atomApi.GetAtomOptions())

    return sortBy(
      atoms.filter(({ type }) => filterNotHookType(type)),
      'name',
    )
  })
}
