import {
  AtomOGM,
  atomSelectionSet,
  TagOGM,
  tagSelectionSet,
} from '@codelab/backend'
import {
  IAtomExport,
  IAtomType,
  ITagExport,
} from '@codelab/shared/abstract/core'
import { componentTagName } from '@codelab/shared/data'
import { v4 } from 'uuid'
import { antTagNames } from '../../commands/import/import-seed-data/add-antd-tags'

export interface AntdDesignApi {
  property: string
  description: string
  type: string
  default: string
  version: string
  isEnum: boolean
}

export const createAntDesignTagsData = async (): Promise<Array<ITagExport>> => {
  const Tag = await TagOGM()

  const existingTags = (
    await Tag.find({
      selectionSet: tagSelectionSet,
    })
  ).map((tag) => [tag.name, tag.name] as const)

  const tagNameToIdMap = new Map(existingTags)

  const componentTag = {
    id: tagNameToIdMap.get(componentTagName) || v4(),
    name: componentTagName,
    children: [],
  }

  const antTags = antTagNames.map((tagName) => ({
    parent: {
      id: componentTag.id,
    },
    id: tagNameToIdMap.get(tagName) || v4(),
    name: tagName,
    children: [],
  }))

  return [componentTag, ...antTags]
}

/**
 * Map hardcoded atom enums to data
 *
 * Replace existing atom id & atom api with database ids
 */
export const createAntDesignAtomsData = async (): Promise<
  Array<IAtomExport>
> => {
  const Atom = await AtomOGM()

  const existingAtoms = (
    await Atom.find({
      selectionSet: atomSelectionSet,
    })
  ).map((atom) => [atom.name, atom] as const)

  const atomNameToIdMap = new Map(existingAtoms)
  const atomNames = Object.values(IAtomType)

  return atomNames.map((name) => ({
    id: atomNameToIdMap.get(name)?.id ?? v4(),
    name: name,
    type: name,
    api: {
      id: atomNameToIdMap.get(name)?.api?.id,
    },
  }))
}
