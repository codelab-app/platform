import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { map, reduce } from 'rxjs/operators'
import { TagGraph } from '../../infra/ogm-types.gen'
import getTagGraphs from './getTagGraphs.cypher'

export const tagRepository = {
  getTagGraphs: (txn: RxTransaction): Observable<Array<TagGraph>> =>
    txn
      .run(getTagGraphs)
      .records()
      .pipe(
        map((record) => {
          const tag = record.get(0)
          const descendants = record.get(1)

          const tagGraph = {
            ...tag,
            descendants,
          }

          return tagGraph
        }),
        reduce<any>((tagGraphs, tagGraph) => {
          return [...tagGraphs, tagGraph]
        }, []),
      ),
}
