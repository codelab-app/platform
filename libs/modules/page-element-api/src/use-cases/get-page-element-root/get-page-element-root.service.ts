import { DGraphService, DgraphUseCase } from '@codelab/backend'
import { Atom } from '@codelab/modules/atom-api'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { PageElement, PageElementLink, PageElementRoot } from '../../models'
import { GetPageElementRootInput } from './get-page-element-root.input'

interface QueryResultItem {
  uid: string
  'dgraph.type': Array<string>
  'PageElement.name': string
  'PageElement.children': Array<
    QueryResultItem & {
      'PageElement.children|order': number
    }
  >
  'PageElement.atom'?: {
    uid: string
    'dgraph.type': Array<string>
    'Atom.label': string
    'Atom.type': string
  }
}

@Injectable()
export class GetPageElementRootService extends DgraphUseCase<
  GetPageElementRootInput,
  PageElementRoot | null
> {
  constructor(dgraph: DGraphService) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: GetPageElementRootInput,
    txn: Txn,
  ) {
    const queryResult = await txn.query(`
        {
          query(func: uid(${request.pageElementId})) @recurse   {
            uid
            dgraph.type
            PageElement.name
            PageElement.atom
            Atom.label
            Atom.type
            PageElement.children @facets(order)
          }
        }
    `)

    const queryData = (queryResult.data as any).query as Array<QueryResultItem>

    if (!queryData || !queryData.length || !queryData[0]) {
      return null
    }

    const root = queryData[0]
    const rootAtom = GetPageElementRootService.createAtomFromQueryResult(root)

    const { descendants, links } =
      GetPageElementRootService.flattenPageElementTree(root)

    return new PageElementRoot(
      root.uid,
      root['PageElement.name'],
      rootAtom,
      descendants,
      links,
    )
  }

  public static flattenPageElementTree(root: QueryResultItem) {
    const descendants: Array<PageElement> = []
    const links: Array<PageElementLink> = []
    const visitedIds = new Set()

    const visit = (parent: QueryResultItem) => {
      parent['PageElement.children']?.forEach((child) => {
        if (visitedIds.has(child.uid)) {
          return
        }

        const childName = child['PageElement.name']
        const childOrder = child['PageElement.children|order']
        const atom = this.createAtomFromQueryResult(child)

        descendants.push(new PageElement(child.uid, childName, atom))

        links.push(new PageElementLink(parent.uid, child.uid, childOrder))

        visitedIds.add(child.uid)
        visit(child)
      })
    }

    visit(root)

    return { descendants, links }
  }

  public static createAtomFromQueryResult(queryResultItem: QueryResultItem) {
    const childAtom = queryResultItem['PageElement.atom']

    //TODO fix atom type
    return childAtom
      ? new Atom(
          childAtom.uid,
          {
            id: childAtom['Atom.type'],
            type: childAtom['Atom.type'],
            label: childAtom['Atom.type'],
          },
          childAtom['Atom.label'],
        )
      : null
  }
}
