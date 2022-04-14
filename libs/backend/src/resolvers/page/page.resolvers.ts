import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { getDriver } from '../../infra/driver'
import { Page } from '../../model'
import { MutationDeletePagesArgs, PageWhere } from '../../ogm-types.gen'
import { elementRepository } from '../../repositories'
import { pageSelectionSet } from '../../selectionSets'

const driver = getDriver()

export const deletePages: IFieldResolver<any, any> = async (
  parent,
  args: MutationDeletePagesArgs,
) => {
  const session = driver.rxSession()

  if (!args.where) {
    throw new Error('No argument provided for delete operation')
  }

  const pages = await (
    await Page()
  ).find({
    where: args.where,
    selectionSet: pageSelectionSet,
  })

  const rootElementIds = pages.map((x) => x.rootElement.id)

  await session
    .writeTransaction((txn) =>
      elementRepository.deleteElementsSubgraph(txn, rootElementIds),
    )
    .toPromise()
    .finally(() => session.close())

  return (await Page()).delete({
    where: args.where as PageWhere,
    rootValue: '',
  })
}
