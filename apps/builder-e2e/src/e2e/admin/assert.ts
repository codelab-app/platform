import { ExportedData, ITagExport } from '@codelab/backend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { antdTagTree } from 'libs/shared/data/src/tag/antd-tag-tree.data'
import { AntdTag } from 'libs/shared/data/src/tag/antd-tags.data'
import difference from 'lodash/difference'
import * as path from 'path'

export const seedData = () => {
  cy.log('yarn cli seed').exec(
    'yarn cli data seed --stage test --email cypress@codelab.app',
    {
      timeout: 90000,
    },
  )
  // .its('stdout')
  // .then((res) => {
  //   cy.log(res)
  // })
}

const DEFAULT_SEED_FILE_PATH = './src/data/seed-data.test.json'
const getFullPath = (file: string) => path.join('apps/builder-e2e', file)

// TODO: CLI commands should have stage, and automatically load equivalent envs depended on state

export const importData = (file: string = DEFAULT_SEED_FILE_PATH) => {
  cy.log('yarn cli data import').exec(
    ` yarn cli data import --seedDataPath ${getFullPath(
      file,
    )} --skipUserData --skipSeedData false --email cypress@codelab.app`,
    { timeout: 90000 },
  )
}

export const exportAndAssert = (file = DEFAULT_SEED_FILE_PATH) => {
  cy.log('yarn cli data export').exec(
    `yarn cli data export --seedDataPath ${getFullPath(
      file,
    )} --skipUserData --skipSeedData false`,
    { timeout: 90000 },
  )

  return cy.readFile(file).then((payload: ExportedData) => {
    const { atoms, tags, types } = payload
    const tagMap = new Map(tags.map((tag) => [tag.id, tag]))
    const typeMap = new Map(types.map((type) => [type.id, type]))

    const hydratedAtoms = atoms.map((atom) => ({
      ...atom,
      tags: atom.tags.map((tag) => tagMap.get(tag.id)),
      api: typeMap.get(atom.api.id),
    }))

    /**
     * Assert all atoms have been created
     */
    const allAtomNames = Object.values(IAtomType)

    const assignedTags = hydratedAtoms.reduce<Array<ITagExport>>(
      (atomTags, atom) => [
        ...atom.tags.filter((t): t is ITagExport => Boolean(t)),
        ...atomTags,
      ],
      [],
    )

    const assignedTagNames = assignedTags.map((tag) => tag.name)
    const createdAtomNames = hydratedAtoms.map((atom) => atom.name)

    expect(allAtomNames).toEqual(expect.arrayContaining(createdAtomNames))

    /**
     * The category tags are the tags that haven't been assigned to atoms. These tags are parents of tags that are actually assigned to atoms
     *
     * These category tags also happen to be the root tags from the tag tree data
     */
    const unassignedTags = difference(
      // All tags
      Object.values(AntdTag),
      // Minus assigned tags
      assignedTagNames,
      // Minus root level category tags
      Object.keys(antdTagTree),
      // Minus other non-root, non-atom tags
      [AntdTag.Typography, AntdTag.Grid],
    )

    /**
     * Should have no un-assigned tags
     */
    expect(unassignedTags).toHaveLength(0)

    return payload
  })
}
