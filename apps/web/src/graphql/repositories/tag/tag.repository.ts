import { Maybe } from '@codelab/shared/abstract/types'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { map, reduce } from 'rxjs/operators'
import { Tag as TagType, TagGraph } from '../../ogm-types.gen'
import getTagGraphs from './getTagGraphs.cypher'

type CreateTagOperation = (
  map: Map<string, TagType>,
) => Promise<Map<string, TagType>>

type CreateTagArgs = {
  name: string
  isRoot: boolean
  parent: Maybe<{ name: string; isRoot: boolean }>
}

export const tagRepository = {
  // getTagsGraph: (txn: RxTransaction): Observable<Maybe<TagGraph>> =>
  //   txn
  //     .run(getTagsGraph)
  //     .records()
  //     .pipe(
  //       first(() => true, undefined),
  //       map((r) => r?.get('graph') as Maybe<TagGraph>),
  //     ),

  getTagGraphs: (txn: RxTransaction): Observable<Array<TagGraph>> =>
    txn
      .run(getTagGraphs)
      .records()
      .pipe(
        map((record) => {
          const tag = record.get(0)
          const descendants = record.get(1)

          const tagGraph = {
            ...tag.properties,
            descendants,
          }

          return tagGraph
        }),
        reduce<any>((tagGraphs, tagGraph) => {
          return [...tagGraphs, tagGraph]
        }, []),
      ),

  importTagsFromJson: async (tags: TagGraph) => null,
}
