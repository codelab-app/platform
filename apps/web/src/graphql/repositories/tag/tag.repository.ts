import { Maybe } from '@codelab/shared/abstract/types'
import { TreeService } from '@codelab/shared/core'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { first, map } from 'rxjs/operators'
import { Tag } from '../../model'
import {
  CreateTagsMutationResponse,
  Tag as TagType,
  TagCreateInput,
  TagGraph,
} from '../../ogm-types.gen'
import getTagsGraph from './getTagsGraph.cypher'

type CreateTagOperation = (
  map: Map<string, TagType>,
) => Promise<Map<string, TagType>>

type CreateTagArgs = {
  name: string
  isRoot: boolean
  parent: Maybe<{ name: string; isRoot: boolean }>
}

export const tagRepository = {
  getTagsGraph: (txn: RxTransaction): Observable<Maybe<TagGraph>> =>
    txn
      .run(getTagsGraph)
      .records()
      .pipe(
        first(() => true, undefined),
        map((r) => r?.get('graph') as Maybe<TagGraph>),
      ),

  importTagsFromJson: async (tags: TagGraph): Promise<Map<string, TagType>> => {
    const tagsInput: Array<CreateTagArgs> = []
    const tagTree = new TreeService(tags ?? { vertices: [], edges: [] })
    const rootTagId = tagTree.getRootVertex()?.id

    if (rootTagId) {
      tagTree.bfsVisit((v) => {
        const parent = v.parent(v.data().id)[0]
        tagsInput.push({
          name: v.data().name,
          isRoot: v.data().isRoot,
          parent: parent
            ? {
                name: parent.data().name,
                isRoot: parent.data().isRoot,
              }
            : undefined,
        })
      }, rootTagId)
    }

    const tagImportOperations: Array<CreateTagOperation> = []
    tagsInput.map((tag: any) => {
      tagImportOperations.push(async (createdTagsMap: Map<string, TagType>) => {
        const tagFound = createdTagsMap.get(tag.name)

        if (!tagFound) {
          let tagInput: TagCreateInput = { name: tag.name, isRoot: tag.isRoot }

          if (tag.parent) {
            tagInput = {
              ...tagInput,
              parent: {
                connect: { where: { node: { name: tag.parent.name } } },
              },
            }
          }

          const tagCreated: CreateTagsMutationResponse = await (
            await Tag()
          ).create({
            input: [tagInput],
          })

          createdTagsMap.set(tag.name, tagCreated.tags[0])
        }

        return createdTagsMap
      })
    })

    const allTagPromises = await tagImportOperations.reduce(
      async (createdTagsMap, operation) => {
        return await operation(await createdTagsMap)
      },
      Promise.resolve(new Map<string, TagType>()),
    )

    return Promise.resolve(allTagPromises)
  },
}
