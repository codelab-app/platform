import type { GraphQLRequestContext } from '@codelab/backend/abstract/types'
import type { QueryPageComponentsArgs } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'
import { getPageComponents } from '../../../../cypher'
import { Repository, withReadTransaction } from '../../../../infra'
import { componentSelectionSet } from '../../../../selectionSet'

export const pageComponentsFieldResolver: IFieldResolver<
  unknown,
  GraphQLRequestContext,
  QueryPageComponentsArgs
> = (_, params) =>
  withReadTransaction(async (txn) => {
    const Component = await Repository.instance.Component
    const { pageId } = params

    const { records } = await txn.run(getPageComponents, {
      pageId,
    })

    const result = await Promise.all(
      records.map((node) => {
        const id = node.get(0).properties.id

        const component = Component.find({
          selectionSet: componentSelectionSet,
          where: { id },
        })

        return component
      }),
    )

    return result.flat()
  })
