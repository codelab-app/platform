import type { ExportedData, ITag } from '@codelab/backend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { antdTagTree } from 'libs/shared/data/seed/src/tag/antd/antd-tag-tree.data'
import { AntdTag } from 'libs/shared/data/seed/src/tag/antd/antd-tags.data'
import difference from 'lodash/difference'
import * as path from 'path'

const TIMEOUT = 180000

export const seedData = () => {
  cy.log('yarn cli seed')
    .exec('yarn cli data seed --stage test --email cypress@codelab.app', {
      failOnNonZeroExit: false,
      timeout: TIMEOUT,
    })
    /**
     * Currently cannot catch errors from exec failing
     *
     * https://github.com/cypress-io/cypress/issues/5094
     */
    .then((res) => {
      cy.log(`${res.code}`)
      cy.log(res.stdout)
      cy.log(res.stderr)
    })
}

const DEFAULT_SEED_FILE_PATH = './src/data/seed-data.test.json'
const getFullPath = (file: string) => path.join('apps/builder-e2e', file)

export const importData = (file: string = DEFAULT_SEED_FILE_PATH) => {
  cy.log('yarn cli data import')
    .exec(
      ` yarn cli data import --seedDataPath ${getFullPath(
        file,
      )} --skipUserData --skipSeedData false --email cypress@codelab.app`,
      {
        failOnNonZeroExit: false,
        timeout: TIMEOUT,
      },
    )
    .then((res) => {
      cy.log(`${res.code}`)
      cy.log(res.stdout)
      cy.log(res.stderr)
    })
}

export const exportAndAssert = (file = DEFAULT_SEED_FILE_PATH) => {
  cy.log('yarn cli data export')
    .exec(
      `yarn cli data export --seedDataPath ${getFullPath(
        file,
      )} --skipUserData --skipSeedData false`,
      { failOnNonZeroExit: false, timeout: TIMEOUT },
    )
    .then((res) => {
      cy.log(`${res.code}`)
      cy.log(res.stdout)
      cy.log(res.stderr)
    })

  return cy.readFile(file).then((payload: ExportedData) => {
    const { atoms, tags, types } = payload
    const tagMap = new Map(tags.map((tag) => [tag.id, tag]))
    const typeMap = new Map(types.map((type) => [type.id, type]))

    const hydratedAtoms = atoms.map((atom) => ({
      ...atom,
      api: typeMap.get(atom.api.id),
      tags: atom.tags.map((tag) => tagMap.get(tag.id)),
    }))

    /**
     * Assert all atoms have been created
     */
    const allAtomNames = Object.values(IAtomType)

    const assignedTags = hydratedAtoms.reduce<Array<ITag>>(
      (atomTags, atom) => [
        ...atom.tags.filter((tag): tag is ITag => Boolean(tag)),
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
