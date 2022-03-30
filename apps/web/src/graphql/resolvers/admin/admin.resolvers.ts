import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { concat, forkJoin, from } from 'rxjs'
import { map } from 'rxjs/operators'
import { getDriver } from '../../infra/driver'
import {
  AnyType,
  AppCreateInput,
  Atom,
  MutationImportAdminDataArgs,
  TypeEdge,
  TypeGraph,
} from '../../ogm-types.gen'
import { fieldRepository, typeRepository } from '../../repositories'
import { appRepository } from '../../repositories/app'
import { atomRepository } from '../../repositories/atom'
import { IRxTxnResolver } from '../abstract/withRxTransaction'

const driver = getDriver()

export const importAdminData: IFieldResolver<
  any,
  any,
  MutationImportAdminDataArgs
> = async (parent, args, context, info) => {
  const payload = args.input.payload ?? ''
  const session = driver.rxSession()
  const auth0Id = context.jwt?.sub

  const createTypes = await session
    .writeTransaction((txn) => {
      const importedGraphs = JSON.parse(payload)?.typesGraph as Array<TypeGraph>

      const vertices: Array<AnyType> = importedGraphs.reduce(
        (result: Array<AnyType>, g: TypeGraph) => [...result, ...g.vertices],
        [],
      )

      const edges = importedGraphs.reduce(
        (result: Array<TypeEdge>, g: TypeGraph) => [...result, ...g.edges],
        [],
      )

      const createTypeNodes$ = typeRepository.upsertTypes(
        txn,
        vertices,
        auth0Id,
      )

      const createFields$ = fieldRepository.createFields(txn, edges)

      return concat(createTypeNodes$, createFields$).pipe(map((res) => res))
    })
    .toPromise()
    .finally(() => session.close())

  const apps = JSON.parse(payload)?.apps ?? ([] as Array<AppCreateInput>)
  // const tags = JSON.parse(payload)?.tags as TagGraph
  const atoms = JSON.parse(payload)?.atoms ?? ([] as Array<Atom>)
  // const createTags = await tagRepository.importTagsFromJson(tags)
  const createAtom = await atomRepository.createAtom(atoms)
  const createApps = await appRepository.createApp(apps, auth0Id)

  return Promise.resolve({
    success: !!createApps && !!createTypes && /* !!createTags &&*/ !!createAtom,
  })
}

export const exportAdminData: IRxTxnResolver = () => (txn) => {
  return forkJoin({
    apps: from(appRepository.getApp()),
    // tags: tagRepository.getTagGraphs(txn),
    atoms: atomRepository.getAtom(txn),
    typesGraph: typeRepository.getAllTypes(txn),
  }).pipe(map((result) => ({ result })))
}
