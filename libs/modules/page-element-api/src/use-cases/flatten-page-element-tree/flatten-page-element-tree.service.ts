import { DgraphArrayMapper, UseCase } from '@codelab/backend'
import { Atom } from '@codelab/modules/atom-api'
import {
  DgraphProp,
  Prop,
  PropAggregate,
  PropAggregateMapper,
  PropMapper,
} from '@codelab/modules/prop-api'
import { Injectable } from '@nestjs/common'
import { PageElement, PageElementLink } from '../../models'
import {
  FlattenPageElementTreeRequest,
  FlattenRequestItem,
} from './flatten-page-element-tree.request'
import { FlattenPageElementTreeResponse } from './flatten-page-element-tree.response'

@Injectable()
export class FlattenPageElementTreeService
  implements
    UseCase<FlattenPageElementTreeRequest, FlattenPageElementTreeResponse>
{
  private arrayPropMapper: DgraphArrayMapper<DgraphProp, Prop>

  private arrayPropAggregateMapper: DgraphArrayMapper<Prop, PropAggregate>

  constructor(
    propsMapper: PropMapper,
    propAggregateMapper: PropAggregateMapper,
  ) {
    this.arrayPropMapper = new DgraphArrayMapper(propsMapper)
    this.arrayPropAggregateMapper = new DgraphArrayMapper(propAggregateMapper)
  }

  async execute({ root }: FlattenPageElementTreeRequest) {
    const descendants: Array<PageElement> = []
    const links: Array<PageElementLink> = []
    const visitedIds = new Set()

    const visit = async (parent: FlattenRequestItem) => {
      for (const child of parent['PageElement.children'] || []) {
        if (visitedIds.has(child.uid)) {
          continue
        }

        const childName = child['PageElement.name'] as string
        let childOrder = child['PageElement.children|order']

        if (typeof childOrder !== 'number') {
          childOrder = 0 // this shouldn't be happening, we always assign order, but just in case
        }

        const atom = this.createAtomFromQueryResult(child)
        const props = await this.arrayPropMapper.map(child['PageElement.props'])
        const propAggregates = await this.arrayPropAggregateMapper.map(props)

        descendants.push(
          new PageElement({
            id: child.uid,
            name: childName,
            atom: atom as any,
            props: propAggregates,
          }),
        )

        links.push(new PageElementLink(parent.uid, child.uid, childOrder))

        visitedIds.add(child.uid)
        await visit(child)
      }
    }

    await visit(root)

    const rootAtom = this.createAtomFromQueryResult(root)

    return { descendants, links, rootAtom }
  }

  public createAtomFromQueryResult(item: FlattenRequestItem) {
    const childAtom = item['PageElement.atom']

    if (!childAtom) {
      return null
    }

    return new Atom({
      id: childAtom['uid'],
      type: childAtom['Atom.type'] as any,
      label: childAtom['Atom.label'] as string,
      propTypes: {
        id: childAtom['Atom.propTypes']
          ? (childAtom['Atom.propTypes']['uid'] as string)
          : '',
      },
    })
  }
}
