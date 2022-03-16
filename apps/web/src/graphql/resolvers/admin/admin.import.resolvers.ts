import { IGraph } from '@codelab/shared/abstract/core'
import { TreeService } from '@codelab/shared/core'
import { forkJoin, from, Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Atom, Tag } from '../../model'
import { TypeGraph } from '../../ogm-types.gen'
import { typeRepository } from '../../repositories'
import {
  IRxTxnResolver,
  withRxTransaction,
} from '../abstract/withRxTransaction'
import {
  upsertExtraTypeEdge,
  upsertFieldEdgeWihoutValidation,
} from '../type/field/upsertFieldEdge/upsertFieldEdgeResolver'

interface ImportDataArgs {
  input: {
    payload: string
  }
}

export const createTagsOGM = (tags: IGraph<any, any>): Observable<any> => {
  const tagsInput: Array<any> = []
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

  const allTagPromises = Promise.all(
    tagsInput.map((tag) => {
      let common: any = { name: tag.name, isRoot: tag.isRoot }

      if (tag.parent) {
        common = {
          ...common,
          parent: {
            connect: { where: { node: { name: tag.parent.name } } },
          },
        }
      }

      return Tag().create({ input: [common] })
    }),
  )

  return of(allTagPromises)
}

export const creatAtomsOGM = (atoms: Array<any>): Observable<any> => {
  const allAtomPromises = Promise.all(
    atoms.map((atom) => {
      const tagNames = atom?.tags?.map((tag: any) => tag.name) || []

      const tagConnects = tagNames.map((name: string) => {
        return { where: { node: { name } } }
      })

      const atomCreateInput = {
        name: atom.name,
        type: atom.type,
        tags: {
          connect: tagConnects,
        },
        api: {
          connect: {
            where: {
              node: {
                id: atom.api?.id,
              },
            },
          },
        },
      }

      return Atom().create({ input: [atomCreateInput] })
    }),
  )

  return of(allAtomPromises)
}

const importAdminDataPayload: IRxTxnResolver<ImportDataArgs, any> =
  ({ input: { payload } }, req) =>
  (txn) => {
    const auth0Id = req.jwt?.sub
    const importedGraphs = JSON.parse(payload)?.typesGraph as Array<TypeGraph>
    const tags = JSON.parse(payload)?.tags as IGraph<any, any>
    const atoms = JSON.parse(payload)?.atoms as Array<any>

    const vertices: Array<any> = importedGraphs.reduce(
      (result: Array<any>, g: any) => [...result, ...g.vertices],
      [],
    )

    const edges = importedGraphs.reduce(
      (result: Array<any>, g: any) => [...result, ...g.edges],
      [],
    )

    const createTypeNodes$ = typeRepository.upsertTypes(txn, vertices, auth0Id)

    const createTypeEdges$ = from(edges).pipe(
      switchMap((edge: any) => {
        if (edge.__resolveType === 'InterfaceTypeEdge') {
          return upsertFieldEdgeWihoutValidation(edge)(txn)
        } else {
          return upsertExtraTypeEdge(edge)(txn)
        }
      }),
    )

    const createTags$ = createTagsOGM(tags)
    const createAtom$ = creatAtomsOGM(atoms)

    // return concat(createTypeNodes$, createTypeEdges$, createTags$, createAtom$)
    return forkJoin({
      typeNodes: createTypeNodes$,
      typeEdges: createTypeEdges$,
      tags: createTags$,
      atoms: createAtom$,
    }).pipe(
      switchMap(() => {
        return of({ result: true })
      }),
    )
  }

export const importAdminData = withRxTransaction<ImportDataArgs, any>(
  importAdminDataPayload,
)
