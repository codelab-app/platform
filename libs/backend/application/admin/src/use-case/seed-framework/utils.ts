import { IAtomType } from '@codelab/shared/abstract/core'
import fs from 'fs'
import path from 'path'

export const productionDataPath = path.resolve('./data/export-v3')

export const getAtomsFromFiles = ({
  /**
   * If specified, only these atoms will be returned
   */
  overrides = [],
  /**
   * This is used to only get a subset of atoms
   */
  partial = false,
}: { partial?: boolean; overrides?: Array<string> } = {}) => {
  const files = fs
    .readdirSync(path.resolve(productionDataPath, 'admin/atoms'))
    .map((file) => path.parse(file).name)

  // If overrides specified, filter files to only include those atoms
  if (overrides.length > 0) {
    return overrides
  }

  if (!partial) {
    return files
  }

  const totalCount = 4

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
