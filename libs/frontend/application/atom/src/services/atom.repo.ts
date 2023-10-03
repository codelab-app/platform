import type { IAtomRepository } from '@codelab/frontend/abstract/application'
import {
  filterNotHookType,
  IAtomModel,
} from '@codelab/frontend/abstract/domain'
import { clearCacheForKey } from '@codelab/frontend/shared/utils'
import type {
  AtomOptions,
  AtomUniqueWhere,
  AtomWhere,
} from '@codelab/shared/abstract/codegen'
import sortBy from 'lodash/sortBy'
import { Model, model } from 'mobx-keystone'
import { getSelectAtomOptionsApi } from '../get-select-atom-options'
import { atomApi } from './atom.api'

// atoms are part of the system and they unlikely to change often,
// so we can cache them until the page is refreshed using Infinity as the TTL
@model('@codelab/AtomRepository')
export class AtomRepository extends Model({}) implements IAtomRepository {
  @clearCacheForKey('atoms')
  async add(this: AtomRepository, atom: IAtomModel) {
    const {
      createAtoms: { atoms },
    } = await atomApi.CreateAtoms({ input: [atom.toCreateInput()] })

    return atoms[0]
  }

  @clearCacheForKey('atoms')
  async delete(this: AtomRepository, atoms: Array<IAtomModel>) {
    const {
      deleteAtoms: { nodesDeleted },
    } = await atomApi.DeleteAtoms({
      where: { id_IN: atoms.map(({ id }) => id) },
    })

    return nodesDeleted
  }

  // @cachedWithTTL('atoms', Infinity)
  async find(this: AtomRepository, where?: AtomWhere, options?: AtomOptions) {
    return await atomApi.GetAtoms({ options, where })
  }

  async findOne(this: AtomRepository, where: AtomUniqueWhere) {
    return (await this.find(where)).items[0]
  }

  /**
   * Get list of atom previews for select dropdown
   */

  // @cachedWithTTL('atoms', Infinity)
  async getSelectAtomOptions(this: AtomRepository) {
    const { atoms } = await getSelectAtomOptionsApi.GetSelectAtomOptions()

    return sortBy(
      atoms.filter(({ type }) => filterNotHookType(type)),
      'name',
    )
  }

  // @clearCacheForKey('atoms')
  async update(this: AtomRepository, atom: IAtomModel) {
    const {
      updateAtoms: { atoms },
    } = await atomApi.UpdateAtoms({
      update: atom.toUpdateInput(),
      where: { id: atom.id },
    })

    return atoms[0]!
  }
}
