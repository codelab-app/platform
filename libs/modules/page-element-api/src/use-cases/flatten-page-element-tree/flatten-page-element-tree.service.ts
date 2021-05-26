import { UseCase } from '@codelab/backend'
import { Atom } from '@codelab/modules/atom-api'
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
  async execute({ root }: FlattenPageElementTreeRequest) {
    const descendants: Array<PageElement> = []
    const links: Array<PageElementLink> = []
    const visitedIds = new Set()

    const visit = (parent: FlattenRequestItem) => {
      parent['PageElement.children']?.forEach((child) => {
        if (visitedIds.has(child.uid)) {
          return
        }

        const childName = child['PageElement.name'] as string
        const childOrder = child['PageElement.children|order']
        const atom = this.createAtomFromQueryResult(child)

        descendants.push(
          new PageElement({ id: child.uid, name: childName, atom }),
        )

        links.push(
          new PageElementLink(parent.uid, child.uid, childOrder as number),
        )

        visitedIds.add(child.uid)
        visit(child)
      })
    }

    visit(root)

    const rootAtom = this.createAtomFromQueryResult(root)

    return { descendants, links, rootAtom }
  }

  public createAtomFromQueryResult(item: FlattenRequestItem) {
    const childAtom = item['PageElement.atom']

    return childAtom
      ? new Atom({
          id: childAtom['uid'],
          type: childAtom['Atom.type'] as any,
          label: childAtom['Atom.label'] as string,
        })
      : null
  }
}
