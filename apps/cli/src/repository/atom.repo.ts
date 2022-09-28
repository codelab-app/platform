import { AtomOGM } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IAtomExport, ITagExport } from '@codelab/shared/abstract/core'
import { BaseUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { connectNode, connectNodes, connectTypeId } from '@codelab/shared/data'
import { logTask } from '../shared/utils/log-task'
import { getApiName } from '../use-cases/seed/data/ant-design.data'

/**
 * We upsert by ID so we can easily change the names by re-running import
 */
export const upsertAtom = async (
  atom: IAtomExport,
  userId: string,
  atomWhere: BaseUniqueWhereCallback<IAtomExport>,
  tagWhere: BaseUniqueWhereCallback<ITagExport>,
) => {
  logTask('Upserting Atom', atom.name)

  const Atom = await AtomOGM()

  const existingAtom = await Atom.find({
    where: atomWhere(atom),
  })

  const baseInput = {
    id: atom.id,
    name: atom.name,
    type: atom.type,
    icon: atom.icon,
  }

  const connectTags: OGM_TYPES.AtomTagsFieldInput['connect'] =
    atom.tags?.map((tag) => ({ where: { node: tagWhere(tag) } })) || []

  if (!existingAtom.length) {
    const createInput: OGM_TYPES.AtomCreateInput = {
      ...baseInput,
      // Always re-create the API if atom is missing
      api: {
        create: {
          node: {
            id: atom.api.id,
            name: getApiName(atom.name),
            owner: connectTypeId(userId),
          },
        },
      },
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
      api: connectNode(atom.api?.id),
      tags: [{ connect: connectTags }],
    }

    logTask('Updated Atom', atom.name)

    try {
      return await Atom.update({
        where: {
          id: atom.id,
        },
        update: updateInput,
      })
    } catch (e) {
      console.error(e)
      throw new Error('Update atom failed')
    }
  }
}

export const assignAllowedChildren = async (atom: IAtomExport) => {
  const Atom = await AtomOGM()
  const allowedChildrenIds = atom.allowedChildren.map((child) => child.id)

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
