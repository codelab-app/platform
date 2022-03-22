import { AtomFragment } from '@codelab/frontend/modules/atom'
import { IResolvers } from '@graphql-tools/utils'
import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { concat, forkJoin } from 'rxjs'
import { map } from 'rxjs/operators'
import { getDriver } from '../../infra/driver'
import {
  AnyType,
  Atom,
  ImportAdminDataInput,
  Maybe,
  MutationImportAdminDataArgs,
  TagGraph,
  TypeEdge,
  TypeGraph,
} from '../../ogm-types.gen'
import {
  adminRepository,
  fieldRepository,
  typeRepository,
} from '../../repositories'
import { atomRepository } from '../../repositories/atom'
import { tagRepository } from '../../repositories/tag'
import {
  IRxTxnResolver,
  withRxTransaction,
} from '../abstract/withRxTransaction'

const driver = getDriver()

export const importAdminData: IFieldResolver<
  any,
  any,
  MutationImportAdminDataArgs
> = async (parent, args, context, info) => {
  const payload = args.input.payload ?? ''
  const session = driver.rxSession()

  const createTypes = await session
    .writeTransaction((txn) => {
      const auth0Id = context.jwt?.sub
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

  const tags = JSON.parse(payload)?.tags as TagGraph
  const atoms = JSON.parse(payload)?.atoms as Array<Atom>
  const createTags = await tagRepository.importTagsFromJson(tags)
  const createAtom = await atomRepository.importAtomFromJson(atoms)

  return Promise.resolve({
    result: !!createTypes && !!createTags && !!createAtom,
  })
}

export const exportAdminData: IRxTxnResolver = () => (txn) => {
  return forkJoin({
    tags: tagRepository.getTagsGraph(txn),
    atoms: atomRepository.exportAtom(txn),
    typesGraph: adminRepository.getExportAdminData(txn),
  }).pipe(map((result) => ({ result })))
}
