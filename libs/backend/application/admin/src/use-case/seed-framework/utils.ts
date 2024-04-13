import { IAtomType } from '@codelab/shared/abstract/core'
import fs from 'fs'
import intersection from 'lodash/intersection'
import size from 'lodash/size'
import { ObjectTyped } from 'object-typed'
import path from 'path'

export const productionDataPath = path.resolve('./data/export-v3')

export const isSubset = (array: Array<string>, superset: Array<string>) => {
  return size(intersection(array, superset)) === size(array)
}

export const getAtomsFromFiles = () => {
  const files = fs
    .readdirSync(path.resolve(productionDataPath, 'admin/atoms'))
    .map((file) => path.parse(file).name)

  return files
}

/**
 * We just test random 5 atoms to be more efficient
 */
export const getPartialAtomsFromFiles = () => {
  const totalCount = 4
  const files = getAtomsFromFiles()

  return [
    // Always include button
    IAtomType.AntDesignButton,
    // Then 4 other random ones
    ...files
      .sort(() => 0.5 - Math.random())
      .slice(0, files.length - totalCount)
      .map((key) => IAtomType[key as IAtomType]),
  ]
}
