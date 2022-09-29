import { AtomOGM } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import {
  ExistingData,
  IAtomImport,
  ITagExport,
  ITypeExport,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { BaseUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { connectNode, connectNodes } from '@codelab/shared/data'
import { logTask } from '../shared/utils/log-task'
import { getApiName } from '../use-cases/seed/data/ant-design.data'
import { upsertType } from './type.repo'

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
    /**
     * Perform an upsert for the interface type, so we can always connect during atom creation
     */
    await upsertType(
      {
        __typename: ITypeKind.InterfaceType,
        id: atom.api.id,
        name: getApiName(atom.name),
        kind: ITypeKind.InterfaceType,
        fieldsConnection: {
          edges: [],
        },
        ownerConnection: {
          edges: [],
        },
      },
      userId,
      (type: ITypeExport) => ({ id: type.id }),
    )

    const createInput: OGM_TYPES.AtomCreateInput = {
      ...baseInput,
      // Connect here since we upsert interface type earlier
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
