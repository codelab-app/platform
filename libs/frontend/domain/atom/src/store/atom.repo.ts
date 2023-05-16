import type { IAtom, IAtomRepository } from '@codelab/frontend/abstract/core'
import { filterNotHookType } from '@codelab/frontend/abstract/core'
import { cachedWithTTL } from '@codelab/frontend/shared/utils'
import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import sortBy from 'lodash/sortBy'
import { Model, model } from 'mobx-keystone'
import { atomApi } from './atom.api'

// atoms are part of the system and they unlikely to change often,
// so we can cache them until the page is refreshed using Infinity as the TTL
@model('@codelab/AtomRepository')
export class AtomRepository extends Model({}) implements IAtomRepository {
  add = async (atom: IAtom) => {
    const {
      createAtoms: { atoms },
    } = await atomApi.CreateAtoms({ input: [atom.toCreateInput()] })

    return atoms[0]
  }

  update = async (atom: IAtom) => {
    const {
      updateAtoms: { atoms },
    } = await atomApi.UpdateAtoms({
      update: atom.toUpdateInput(),
      where: { id: atom.id },
    })

    return atoms[0]!
  }

  @cachedWithTTL(Infinity)
  find = async (where?: AtomWhere, options?: AtomOptions) => {
    return await atomApi.GetAtoms({ options, where })
  }

  delete = async (atoms: Array<IAtom>) => {
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
  @cachedWithTTL(Infinity)
  findOptions = async () => {
    const { atoms } = await atomApi.GetAtomOptions()

    return sortBy(
      atoms.filter(({ type }) => filterNotHookType(type)),
      'name',
    )
  }
}
