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
    // Keep the atoms in a context, because if there are duplicate atoms anywhere in the tree
    // dgraph will return only the ID of the atom after the first time
    const atomContext = new Map<string, Atom | null | undefined>()

    // do a breadth-first traversal
    const traversalQueue: Array<{
      element: FlattenRequestItem
      parentId?: string
    }> = [{ element: root }]

    while (traversalQueue.length > 0) {
      const item = traversalQueue.shift()

      if (!item) {
        continue
      }

      const { element, parentId } = item

      if (visitedIds.has(element.uid)) {
        continue
      }

      const elementName = element['PageElement.name'] as string
      let elementOrder = element['PageElement.children|order']

      if (typeof elementOrder !== 'number') {
        elementOrder = 1 // this shouldn't be happening, we always assign order, but just in case
      }

      const atom = this.createAtomFromQueryResult(element, atomContext)
      const props = await this.arrayPropMapper.map(element['PageElement.props'])
      const propAggregates = await this.arrayPropAggregateMapper.map(props)

      // We don't want to add the root element to the descendants array
      if (parentId) {
        descendants.push(
          new PageElement({
            id: element.uid,
            name: elementName,
            atom: atom as any,
            props: propAggregates,
            css: element['PageElement.css'],
          }),
        )

        links.push(new PageElementLink(parentId, element.uid, elementOrder))
      }

      visitedIds.add(element.uid)

      const children = element['PageElement.children'] || []

      // Edge case alert:
      // sort the children by ID, because it seems that that's how dgraph executes the query
      // but sometimes results don't match that. If we start with a element with a latter id,
      // and we have elements with the same atom - the atom of the element with the latter ID won't have
      // propTypes defined, because they are already defined in the element with the prior ID
      children.sort((a, b) => b.uid.localeCompare(a.uid))

      if (!children || !children.length) {
        continue
      }

      traversalQueue.push(
        ...children.map((c) => ({ element: c, parentId: element.uid })),
      )
    }

    const rootAtom = this.createAtomFromQueryResult(root, atomContext)

    return { descendants, links, rootAtom }
  }

  public createAtomFromQueryResult(
    item: FlattenRequestItem,
    atomContext: Map<string, Atom | null | undefined>,
  ) {
    const childAtom = item['PageElement.atom']

    if (!childAtom) {
      return null
    }

    if (atomContext.has(childAtom.uid)) {
      return atomContext.get(childAtom.uid)
    }

    const atom = new Atom({
      id: childAtom['uid'],
      type: childAtom['Atom.type'] as any,
      label: childAtom['Atom.label'] as string,
      propTypes: {
        id: childAtom['Atom.propTypes']
          ? (childAtom['Atom.propTypes']['uid'] as string)
          : '',
      },
    })

    atomContext.set(atom.id, atom)

    return atom
  }
}
