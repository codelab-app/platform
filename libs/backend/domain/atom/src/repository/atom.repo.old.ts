import type {
  ExistingData,
  IAtomImport,
  ITag,
} from '@codelab/backend/abstract/core'
import {
  atomSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type {
  BaseTypeUniqueWhereCallback,
  BaseUniqueWhere,
} from '@codelab/shared/abstract/types'
import { connectNodeId, connectNodeIds } from '@codelab/shared/domain/mapper'
import { logTask } from '@codelab/shared/utils'

export class AtomRepository {
  private Atom = Repository.instance.Atom

  async getAll() {
    return (await this.Atom).find({
      selectionSet: atomSelectionSet,
    })
  }

  async find(where: BaseUniqueWhere) {
    return (await this.Atom).find({
      where,
      selectionSet: atomSelectionSet,
    })
  }
}

/**
 * We upsert by ID so we can easily change the names by re-running import
 */
export const upsertAtom = async (
  atom: IAtomImport,
  atomWhere: BaseTypeUniqueWhereCallback<IAtomImport>,
  tagWhere: BaseTypeUniqueWhereCallback<ITag>,
) => {
  logTask('Upserting Atom', atom.name)

  const Atom = await Repository.instance.Atom

  const existingAtom = (
    await Atom.find({
      where: atomWhere(atom),
      selectionSet: atomSelectionSet,
    })
  )[0]

  const baseInput = {
    id: atom.id,
    name: atom.name,
    type: atom.type,
    icon: atom.icon,
  }

  const connectTags: OGM_TYPES.AtomTagsFieldInput['connect'] = atom.tags.map(
    (tag) => ({ where: { node: tagWhere(tag as ITag) } }),
  )

  if (!existingAtom) {
    const createInput: OGM_TYPES.AtomCreateInput = {
      ...baseInput,
      /**
       * We assume interface has been created in a previous step
       */
      api: connectNodeId(atom.api.id),
      tags: { connect: connectTags },
    }

    try {
      logTask('Created Atom', atom.name, createInput)

      return await Atom.create({
        input: [createInput],
      })
    } catch (error) {
      console.error(error)
      throw new Error('Create atom failed')
    }
  } else {
    console.log(existingAtom)

    if (!existingAtom.api.id) {
      throw new Error('API is missing even though atom exists')
    }

    const updateInput: OGM_TYPES.AtomUpdateInput = {
      ...baseInput,
      // Assume the API exists
      api: connectNodeId(existingAtom.api.id),
      tags: [{ connect: connectTags }],
    }

    logTask('Updating Atom', atom.name)

    try {
      return await Atom.update({
        where: atomWhere(atom),
        update: updateInput,
      })
    } catch (error) {
      console.error(error)
      throw new Error('Update atom failed')
    }
  }
}

export const assignSuggestedChildren = async (
  atom: IAtomImport,
  data: ExistingData,
) => {
  const Atom = await Repository.instance.Atom

  const suggestedChildrenIds = atom
    .suggestedChildren(data)
    .map((child) => child.id)

  try {
    return await Atom.update({
      where: {
        id: atom.id,
      },
      update: {
        suggestedChildren: [connectNodeIds(suggestedChildrenIds)],
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error('Update atom failed')
  }
}
