import type { IAtomCategory } from '@codelab/shared/abstract/core'

import { IAtomType } from '@codelab/shared/abstract/core'
import fs from 'fs'
import path from 'path'

export const productionDataPath = path.resolve('./data/export-v3')

export const getAtomsFromFiles = ({
  /**
   * If specified, only these atoms will be returned
   */
  category,
  /**
   * This is used to only get a subset of atoms
   */
  overrides = [],
}: {
  category: IAtomCategory
  overrides?: Array<string>
}) => {
  const files = fs
    .readdirSync(path.resolve(productionDataPath, 'admin/atoms'))
    .map((file) => path.parse(file).name)
    .filter((file) => file.startsWith(category))

  // If overrides specified, filter files to only include those atoms
  if (overrides.length > 0) {
    return overrides
  }

  return files
}
