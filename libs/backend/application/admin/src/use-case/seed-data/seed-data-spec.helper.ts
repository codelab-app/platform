import type { ITagDTO, IUserDTO } from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { AntdTag, antdTagTree } from '@codelab/shared/data/seed'
import difference from 'lodash/difference'
import { ExportAdminDataService } from '../export-admin-data.service'
import { ImportAdminDataService } from '../import-admin-data'
import { SeedDataService } from './seed-data.service'

export const importData = ({ auth0Id }: IUserDTO, exportPath: string) =>
  new ImportAdminDataService(exportPath).execute({
    auth0Id,
  })

export const exportAndAssert = async (exportPath: string) => {
  await new ExportAdminDataService(exportPath).execute()

  const importService = await new ImportAdminDataService(exportPath)
  const payload = importService.exportedAdminData
  const { atoms, tags, types } = payload
  /**
   * Assert all atoms have been created
   */
  const allAtomNames = Object.values(IAtomType)

  const assignedTags = atoms.reduce<Array<ITagDTO>>(
    (atomTags, atom) => [
      ...(atom.tags ?? []).filter((tag): tag is ITagDTO => Boolean(tag)),
      ...atomTags,
    ],
    [],
  )

  const assignedTagNames = assignedTags.map((tag) => tag.name)
  const createdAtomNames = atoms.map((atom) => atom.name)

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
}

export const seedData = (user: IUserDTO) => new SeedDataService().execute(user)
