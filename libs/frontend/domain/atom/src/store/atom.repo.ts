import type { IAtomRepository } from '@codelab/frontend/abstract/core'
import { filterNotHookType, IAtom } from '@codelab/frontend/abstract/core'
import { cachedWithTTL, clearCacheForKey } from '@codelab/frontend/shared/utils'
import { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import sortBy from 'lodash/sortBy'
import { Model, model } from 'mobx-keystone'
import { atomApi } from './atom.api'

// atoms are part of the system and they unlikely to change often,
// so we can cache them until the page is refreshed using Infinity as the TTL
@model('@codelab/AtomRepository')
export class AtomRepository extends Model({}) implements IAtomRepository {
  @clearCacheForKey('atoms')
  async add(this: AtomRepository, atom: IAtom) {
    const {
      createAtoms: { atoms },
    } = await atomApi.CreateAtoms({ input: [atom.toCreateInput()] })

    return atoms[0]
  }

  @clearCacheForKey('atoms')
  async update(this: AtomRepository, atom: IAtom) {
    const {
      updateAtoms: { atoms },
    } = await atomApi.UpdateAtoms({
      update: atom.toUpdateInput(),
      where: { id: atom.id },
    })

    return atoms[0]!
  }

  @cachedWithTTL('atoms', Infinity)
  async find(this: AtomRepository, where?: AtomWhere, options?: AtomOptions) {
    return await atomApi.GetAtoms({ options, where })
  }

  @clearCacheForKey('atoms')
  async delete(this: AtomRepository, atoms: Array<IAtom>) {
    const {
      deleteAtoms: { nodesDeleted },
    } = await atomApi.DeleteAtoms({
      where: { id_IN: atoms.map(({ id }) => id) },
    })

    return nodesDeleted
  }

  /**
   * Get list of atom previews for select dropdown
   */

  @cachedWithTTL('atoms', Infinity)
  async findOptions(this: AtomRepository) {
    const { atoms } = await atomApi.GetAtomOptions()

    return sortBy(
      atoms.filter(({ type }) => filterNotHookType(type)),
      'name',
    ) as unknown as Array<
      Pick<IAtom, 'id' | 'name' | 'requiredParents' | 'type'>
    >
  }
}
