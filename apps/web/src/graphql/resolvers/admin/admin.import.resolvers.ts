import { from, of } from 'rxjs'
import {
  concatMap,
  filter,
  first,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators'
import { MutationImportAdminDataArgs, TypeGraph } from '../../ogm-types.gen'
import { typeRepository } from '../../repositories'
import {
  IRxTxnResolver,
  withRxTransaction,
} from '../abstract/withRxTransaction'
import { upsertFieldEdge } from '../type/field/upsertFieldEdge/upsertFieldEdgeResolver'
import { diffTypeGraph } from '../type/type/importTypeGraphResolver'

// export const adminImportResolvers: IResolvers = {
//   importAdminData: async (
//     _source,
//     args: MutationImportAdminDataArgs,
//     req: any,
//   ) => {
// const currentUserId = req.jwt?.sub
// const payload: any = JSON.parse(args.input.payload as any)
// // 1. Import tags.
// const tags: Array<any> = []
// const tagTree = new TreeService(payload.tags)
// const rootTagId = tagTree.getRootVertex()?.id

// if (rootTagId) {
//   tagTree.bfsVisit((v) => {
//     const parent = v.parent(v.data().id)[0]
//     tags.push({
//       id: v.data().id,
//       name: v.data().name,
//       isRoot: v.data().isRoot,
//       parent: parent
//         ? {
//             id: parent.data().id,
//             name: parent.data().name,
//             isRoot: parent.data().isRoot,
//           }
//         : undefined,
//     })
//   }, rootTagId)
// }

// const tagImportOperations: Array<any> = []
// tags.map((tag: any) => {
//   tagImportOperations.push(async (createdTagsMap: Map<string, any>) => {
//     const tagFound = createdTagsMap.get(tag.name)

//     if (!tagFound) {
//       let common: any = { name: tag.name, isRoot: tag.isRoot }

//       if (tag.parent) {
//         common = {
//           ...common,
//           parent: {
//             connect: { where: { node: { name: tag.parent.name } } },
//           },
//         }
//       }

//       const tagCreated = await Tag().create({ input: [common] })
//       createdTagsMap.set(tag.name, tagCreated.tags[0])
//     }

//     return createdTagsMap
//   })
// })

// await tagImportOperations.reduce(async (createdTagsMap, operation) => {
//   return await operation(await createdTagsMap)
// }, Promise.resolve(new Map<string, any>()))

// typeRepository.createTypes

/*
    // 2. Import types......
    const createdTypesMap: Map<string, any> = new Map<string, any>()
    const interfaceTypes = payload.interfaceTypes
    const allTypes = payload.allTypes

    const createdTypes = await Promise.all(
      allTypes.map(async (typeInput: any) => {
        const common = {
          name: typeInput.name,
          owner: { connect: { where: { node: { auth0Id: currentUserId } } } },
        }

        // eslint-disable no-case-declarations 
        switch (typeInput.typeKind) {
          case TypeKind.UnionType:
            // for now, ignore this type
            break
          case TypeKind.ArrayType:
            // for now, ignore this type
            break
          case TypeKind.InterfaceType:
            if (typeInput.fieldsConnection.totalCount == 0) {
              // if interfacetype has fields, will handle it in atom creation with fields
              return await InterfaceType().create({ input: [common] })
            }

            break
          case TypeKind.EnumType:
            if (!typeInput.allowedValues) {
              throw new Error('Invalid form input')
            }

            const enumTypeValues = typeInput.allowedValues.map((el: any) => {
              return { node: { id: el.id, name: el.name, value: el.value } }
            })

            return await EnumType().create({
              input: [{ ...common, allowedValues: { create: enumTypeValues } }],
            })
          case TypeKind.PrimitiveType:
            if (!typeInput.primitiveKind) {
              throw new Error('Primitive kind is required')
            }

            const primitiveInput = {
              ...common,
              primitiveKind: typeInput.primitiveKind,
            }

            return await PrimitiveType().create({ input: [primitiveInput] })
          case TypeKind.LambdaType:
            return await LambdaType().create({ input: [common] })
          case TypeKind.AppType:
            return await AppType().create({ input: [common] })
          case TypeKind.RenderPropsType:
            return await RenderPropsType().create({ input: [common] })
          case TypeKind.ReactNodeType:
            return await ReactNodeType().create({ input: [common] })
          case TypeKind.PageType:
            return await PageType().create({ input: [common] })
          case TypeKind.MonacoType:
            if (!typeInput.language) {
              throw new Error('Language is required')
            }

            const monacoInput = { ...common, language: typeInput.language }

            return await MonacoType().create({ input: [monacoInput] })
          case TypeKind.ElementType:
            if (!typeInput.elementKind) {
              throw new Error('Element kind is required')
            }

            const elementInput = {
              ...common,
              elementKind: typeInput.elementKind,
            }

            return await ElementType().create({ input: [elementInput] })
          default:
            throw new Error('Invalid create form type')
        }
      }),
    )

    createdTypes.map((el: any) => {
      if (!el) {
        return
      }

      const typeCreatedKeys = Object.keys(el)

      const typeKey =
        _.difference(typeCreatedKeys, ['__typename', 'info'])[0] || '' // get the object key from create() response

      const typeObject = el[typeKey] || []
      const tyeKind = typeKey.charAt(0).toLocaleUpperCase() + typeKey.slice(1)
      const key = `${tyeKind}-${typeObject[0]?.name}`
      createdTypesMap.set(key, typeObject[0])
    })

    // 3. Import atoms......
    const atomOperations: Array<any> = []
    payload.atoms?.map((atom: any) => {
      atomOperations.push(async (createdAtomsMap: Map<string, any>) => {
        const atomFound = createdAtomsMap.get(atom.name)

        if (!atomFound) {
          let apiTypeFound = await InterfaceType().find({
            where: { name: atom.api?.name },
          })

          if (!apiTypeFound?.length) {
            let atomApiInput: any = {
              name: atom.api?.name,
              owner: {
                connect: { where: { node: { auth0Id: currentUserId } } },
              },
            }

            const interfaceTypeFound = interfaceTypes?.find(
              (el: any) => el.name == atom.api?.name,
            )

            const fieldConnect: any = {
              fields: { connect: [] },
            }

            if (interfaceTypeFound?.fieldsConnection.totalCount) {
              interfaceTypeFound.fieldsConnection.edges.map((el: any) => {
                fieldConnect.fields.connect.push({
                  where: { node: { name: el.node.name } },
                  edge: {
                    key: el.key,
                    name: el.name,
                    description: el.description,
                  },
                })
              })
            }

            atomApiInput = { ...atomApiInput, ...fieldConnect }
            apiTypeFound = await (
              await InterfaceType().create({ input: [atomApiInput] })
            ).interfaceTypes
          }

          const tagConnects = atom.tags?.map((tag: any) => {
            return { where: { node: { name: tag.name } } }
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
                  node: { id: apiTypeFound[0]?.id },
                },
              },
            },
          }

          const atomCreated = await (
            await Atom().create({ input: [atomCreateInput] })
          ).atoms[0]

          createdAtomsMap.set(atomCreated?.name, atomCreated)
        }

        return createdAtomsMap
      })
    })

    await atomOperations.reduce(
      async (_createdAtomsMap: Map<string, any>, operation: any) => {
        return await operation(await _createdAtomsMap)
      },
      Promise.resolve(new Map<string, any>()),
    )

    */
//   return Promise.resolve({ result: true })
// },
// }

const importAdminDataPayload: IRxTxnResolver<
  MutationImportAdminDataArgs,
  any
> =
  ({ input: { payload } }, req) =>
  (txn) => {
    const auth0Id = req.jwt?.sub
    const importedGraphs = JSON.parse(payload)?.typesGraph as Array<TypeGraph>
    console.log('graphs... length...', importedGraphs.length)

    const emptyGraph: TypeGraph = {
      __typename: 'TypeGraph',
      edges: [],
      vertices: [],
    }

    const diffVertexIds: Array<string> = []
    const existingVertexIds: Array<string> = []
    const createdVertexIds: Array<string> = []

    return from(importedGraphs).pipe(
      mergeMap((importedGraph, n) => {
        const rootIds = importedGraph.vertices.map((v) => v.id)

        return typeRepository.getTypeGraph(txn, rootIds).pipe(
          first(() => true, undefined),
          switchMap((existingGraph, i) => {
            const graphDiff = diffTypeGraph(
              importedGraph,
              existingGraph ?? emptyGraph,
            )

            const vertices: Array<any> = []

            // imported non-existing vertices
            for (const leftOnlyVertex of graphDiff.vertices.leftOnly) {
              // The promises will not be executed until the observables are subscribed to
              if (diffVertexIds.indexOf(leftOnlyVertex.id) == -1) {
                const type = { ...leftOnlyVertex, auth0Id }
                vertices.push(type)
                diffVertexIds.push(leftOnlyVertex.id)
              }
            }

            for (const rightOnlyVertex of graphDiff.vertices.rightOnly) {
              if (existingVertexIds.indexOf(rightOnlyVertex.id) == -1) {
                existingVertexIds.push(rightOnlyVertex.id)
              }
            }

            return typeRepository.createTypes(txn, vertices).pipe(
              switchMap((createdTypes) =>
                of({
                  createdTypes,
                  graphDiff,
                }),
              ),
            )
          }),
        )
      }),
      filter((res: any) => !!res.createdTypes.properties?.id),
      mergeMap((res: any) => {
        const graphDiff = res.graphDiff
        console.log('node is created...', res.createdTypes.properties?.id)
        createdVertexIds.push(res.createdTypes.properties.id)

        const availableIds = [...existingVertexIds, ...createdVertexIds]
        const inputs: Array<any> = []

        // imported non-existing edges
        for (const leftOnlyEdge of graphDiff.edges.leftOnly) {
          if (
            leftOnlyEdge.__resolveType == 'InterfaceTypeEdge' &&
            availableIds.indexOf(leftOnlyEdge.source) != -1 &&
            availableIds.indexOf(leftOnlyEdge.target) != -1
          ) {
            const input = {
              ...leftOnlyEdge,
              interfaceTypeId: leftOnlyEdge.source,
              targetTypeId: leftOnlyEdge.target,
            }

            inputs.push(input)
          }
        }

        return of(inputs)
      }),
      filter((edgeInputs) => !!edgeInputs.length),
      concatMap((edgeInputs) => {
        for (const input of edgeInputs) {
          // return upsertFieldEdgeWihoutOGM({input, isCreating: true})(txn).pipe(
          return upsertFieldEdge({ input, isCreating: true })(txn).pipe(
            map((fieldEdge) => {
              return { result: !!fieldEdge.key }
            }),
          )
        }

        return of({ result: !!edgeInputs })
      }),
    )
  }

export const importAdminData = withRxTransaction<
  MutationImportAdminDataArgs,
  any
>(importAdminDataPayload)
