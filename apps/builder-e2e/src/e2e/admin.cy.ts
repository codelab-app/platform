import { IAtomType, ITagExport } from '@codelab/shared/abstract/core'
import { difference } from 'lodash'
import { antdTagTree } from '../../../../libs/shared/data/src/tag/antd-tag-tree.data'
import { AntdTag } from '../../../../libs/shared/data/src/tag/antd-tags.data'
import { ExportedData } from '../../../cli/src/commands/export/export.types'

describe('Admin', () => {
  before(() => {
    cy.resetDatabase()
  })

  describe('parse', () => {
    it(`should parse Ant Design CSV data & import`, () => {
      cy.log('yarn cli parse')
        .exec('yarn cli parse --env test --email cypress@codelab.ai', {
          timeout: 30000,
        })
        .its('stdout')
        .then((res) => {
          cy.log(res)
        })

      cy.log('yarn cli data export').exec(
        'yarn cli data export --env test --seedData ./apps/builder-e2e/src/data/seed-data-test.json --skipUserData --skipSeedData false',
        { timeout: 30000 },
      )

      cy.exec('ls')
        .its('stdout')
        .then((res) => cy.log(res))

      return cy
        .readFile('./src/data/seed-data-test.json')
        .then((payload: ExportedData) => {
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
        })
    })
  })
})
