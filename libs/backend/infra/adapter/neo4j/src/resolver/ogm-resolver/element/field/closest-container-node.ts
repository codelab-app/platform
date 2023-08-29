import type { IEntity } from '@codelab/shared/abstract/types'
import type { IFieldResolver } from '@graphql-tools/utils'
import { closestContainerNodeCypher } from '../../../../cypher'
import { Repository, withReadTransaction } from '../../../../infra'
import {
  componentSelectionSet,
  pageSelectionSet,
} from '../../../../selectionSet'

export const closestContainerNodeFieldResolver: IFieldResolver<
  IEntity,
  unknown
> = (element) =>
  withReadTransaction(async (txn) => {
    const Page = Repository.instance.Page
    const Component = Repository.instance.Component

    const { records } = await txn.run(closestContainerNodeCypher, {
      elementId: element.id,
    })

    const node = records[0]?.get('node')
    const label = node.labels[0]
    const id = node.properties.id

    const [model] = await (label === 'Page'
      ? (await Page).find({ selectionSet: pageSelectionSet, where: { id } })
      : (
          await Component
        ).find({
          selectionSet: componentSelectionSet,
          where: { id },
        }))

    if (!model) {
      throw new Error('Unable to find container node')
    }

    return model
  })
