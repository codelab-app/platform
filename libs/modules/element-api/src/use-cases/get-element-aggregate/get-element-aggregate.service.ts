import { UseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { ElementAggregate } from '../../models'
import { FlattenElementTreeService } from '../flatten-element-tree'
import { GetDgraphElementAggregateService } from './get-dgraph-element-aggregate.service'
import { GetElementAggregateRequest } from './get-element-aggregate.request'

@Injectable()
/**
 * Fetches, flattens and returns the whole tree bellow a certain element
 */
export class GetElementAggregateService
  implements UseCase<GetElementAggregateRequest, ElementAggregate | null>
{
  constructor(
    private getDgraphElementAggregateService: GetDgraphElementAggregateService,
    private flattenElementTreeService: FlattenElementTreeService,
  ) {}

  async execute(request: GetElementAggregateRequest) {
    const root = await this.getDgraphElementAggregateService.execute(request)

    console.log(root)

    if (!root) {
      return null
    }

    const { descendants, links, rootAtom } =
      await this.flattenElementTreeService.execute({ root })

    return new ElementAggregate({
      id: root.uid,
      name: root['Element.name'] as string,
      atom: rootAtom,
      descendants,
      links,
      css: root['Element.css'],
    })
  }
}
