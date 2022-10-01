import { AtomOGM } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import {
  ExistingData,
  IAtomImport,
  ITagExport,
} from '@codelab/shared/abstract/core'
import { BaseUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { connectNode, connectNodes } from '@codelab/shared/data'
import { logTask } from '../shared/utils/log-task'

/**
 * We upsert by ID so we can easily change the names by re-running import
 */
export const upsertAtom = async (
  atom: IAtomImport,
  userId: string,
  atomWhere: BaseUniqueWhereCallback<IAtomImport>,
  tagWhere: BaseUniqueWhereCallback<ITagExport>,
) => {
  logTask('Upserting Atom', atom.name)

  const Atom = await AtomOGM()

  const existingAtom = (
    await Atom.find({
      where: atomWhere(atom),
    })
  )[0]

  const baseInput = {
    id: atom.id,
    name: atom.name,
    type: atom.type,
    icon: atom.icon,
  }

  const connectTags: OGM_TYPES.AtomTagsFieldInput['connect'] =
    atom.tags?.map((tag) => ({ where: { node: tagWhere(tag) } })) || []

  if (!existingAtom) {
    const createInput: OGM_TYPES.AtomCreateInput = {
      ...baseInput,
      /**
       * We assume interface has been created in a previous step
       */
      api: connectNode(atom.api.id),
      tags: { connect: connectTags },
    }

    try {
      logTask('Created Atom', atom.name, createInput)

      return await Atom.create({
        input: [createInput],
      })
    } catch (e) {
      console.error(e)
      throw new Error('Create atom failed')
    }
  } else {
    if (!atom.api?.id) {
      throw new Error('API is missing even though atom exists')
    }

    const updateInput: OGM_TYPES.AtomUpdateInput = {
      ...baseInput,
      // Assume the API exists
      api: connectNode(existingAtom.api?.id),
      tags: [{ connect: connectTags }],
    }

    logTask('Updating Atom', atom.name)

    try {
      return await Atom.update({
        where: atomWhere(atom),
        update: updateInput,
      })
    } catch (e) {
      console.error(e)
      throw new Error('Update atom failed')
    }
  }
}

export const assignAllowedChildren = async (
  atom: IAtomImport,
  data: ExistingData,
) => {
  const Atom = await AtomOGM()
  const allowedChildrenIds = atom.allowedChildren(data).map((child) => child.id)

  try {
    return await Atom.update({
      where: {
        id: atom.id,
      },
      update: {
        allowedChildren: [connectNodes(allowedChildrenIds)],
      },
    })
  } catch (e) {
    console.error(e)
    throw new Error('Update atom failed')
  }
}
