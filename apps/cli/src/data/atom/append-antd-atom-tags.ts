import { IAtomExport } from '@codelab/shared/abstract/core'
import { componentTagName } from '@codelab/shared/data'
import { v4 } from 'uuid'
import { antComponentsByCategory } from './antd-components.data'
import { searchRelatedParentName } from './utils'

export const antdCategories = Object.keys(antComponentsByCategory)

const antdComponents = Object.values(antComponentsByCategory).flat()

/**
 * We add a new component tag, but will upsert later based on name
 */
const componentTag = {
  id: v4(),
  name: componentTagName,
  children: [],
}

/**
 * Add tags to atom export data
 */
export const appendAntdAtomTags = (
  atoms: Array<IAtomExport>,
): Array<IAtomExport> => {
  return atoms.map((atom) => {
    const name = atom.name

    if (!name.includes('AntDesign')) {
      return atom
    }

    const antDesignComponentName = name.replace('AntDesign', '')

    const relatedParentName = searchRelatedParentName(
      antDesignComponentName,
      antdComponents,
    )

    const foundCategory = antdCategories.find((tag) =>
      antComponentsByCategory[tag].includes(
        relatedParentName || antDesignComponentName,
      ),
    )

    if (!foundCategory) {
      console.log(`[Import antd atoms] No tgs assign for ${name}`)
    }

    return {
      ...atom,
      tags: foundCategory
        ? [{ id: v4(), name: foundCategory }, componentTag]
        : [{ id: v4(), name: 'Other' }, componentTag],
    }
  })
}
