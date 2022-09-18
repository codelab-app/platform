import { IAtomExport } from '@codelab/shared/abstract/core'
import fs from 'fs'
import path from 'path'
import { searchRelatedParentName } from './utils'

export const getAntdIconNames = () => {
  const antdIconPaths = path.resolve(
    process.cwd(),
    'apps/builder/public/assets/atoms/antd',
  )

  const iconNames = fs.readdirSync(antdIconPaths)

  return iconNames.map((name) => name.replace('.svg', ''))
}

export const appendAntdAtomIcons = (
  atoms: Array<IAtomExport>,
): Array<IAtomExport> => {
  const antdIconNames = getAntdIconNames()

  const atomsWithIcon = atoms.map((atom) => {
    const atomName = atom.name
    const isAntdAtom = atomName.includes('AntDesign')

    if (!isAntdAtom) {
      return atom
    }

    let expectedIconName = atomName.replace('AntDesign', '')
    let foundIconName = antdIconNames.includes(expectedIconName)

    if (!foundIconName) {
      // GridItem is children of Grid...
      expectedIconName =
        searchRelatedParentName(expectedIconName, antdIconNames) || ''
      foundIconName = Boolean(expectedIconName)
    }

    return {
      ...atom,
      icon: foundIconName ? `/assets/atoms/antd/${expectedIconName}.svg` : '',
    }
  })

  return atomsWithIcon
}
