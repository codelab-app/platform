import {
  ExportedData,
  IAtomType,
  IInterfaceTypeExport,
  ITagExport,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { difference } from 'lodash'
import * as path from 'path'
import { antdTagTree } from '../../../../../libs/shared/data/src/tag/antd-tag-tree.data'
import { AntdTag } from '../../../../../libs/shared/data/src/tag/antd-tags.data'

export const seedData = () => {
  cy.log('yarn cli seed')
    .exec('yarn cli seed --env test --email cypress@codelab.ai', {
      timeout: 30000,
    })
    .its('stdout')
    .then((res) => {
      cy.log(res)
    })
}

const DEFAULT_SEED_FILE_PATH = './src/data/seed-data-test.json'
const getFullPath = (file: string) => path.join('apps/builder-e2e', file)

export const importData = (file: string = DEFAULT_SEED_FILE_PATH) => {
  cy.log('yarn cli data import').exec(
    `yarn cli data import --env test --seedDataPath ${getFullPath(
      file,
    )} --skipUserData --skipSeedData false --email cypress@codelab.ai`,
    { timeout: 30000 },
  )
}

export const getFieldsCount = (payload: ExportedData) => {
  return (
    payload.types
      // Get only interface types
      .filter(
        (type): type is IInterfaceTypeExport =>
          type.__typename === ITypeKind.InterfaceType,
      )
      // Get all the fields
      .map((type) => type.fieldsConnection.edges).length
  )
}

export const exportAndAssert = (file = DEFAULT_SEED_FILE_PATH) => {
  cy.log('yarn cli data export').exec(
    `yarn cli data export --env test --seedDataPath ${getFullPath(
      file,
    )} --skipUserData --skipSeedData false`,
    { timeout: 30000 },
  )

  cy.exec('ls')
    .its('stdout')
    .then((res) => cy.log(res))

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
