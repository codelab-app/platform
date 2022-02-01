import {
  CreateResponsePort,
  DgraphEntityType,
  IAtomRepository,
  ITypeRepository,
  ITypeRepositoryToken,
} from '@codelab/backend/abstract/core'
import {
  BaseRepository,
  DgraphRepository,
  getUidFromResponse,
  mergeAndMutate,
} from '@codelab/backend/infra'
import {
  AtomSchema,
  AtomType,
  IAtom,
  IUser,
  Role,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import Fuse from 'fuse.js'
import { AtomMutationFactory } from './atom-mutation-factory'
import { AtomQueryFactory } from './atom-query-factory'

@Injectable()
export class AtomRepository
  extends BaseRepository<IAtom>
  implements IAtomRepository
{
  protected readonly entityType = DgraphEntityType.Atom

  protected readonly queryFactory = new AtomQueryFactory()

  protected readonly mutationFactory = new AtomMutationFactory()

  protected readonly schema = AtomSchema

  constructor(
    dgraph: DgraphRepository,
    @Inject(ITypeRepositoryToken) protected readonly typeRepo: ITypeRepository,
  ) {
    super(dgraph)
  }

  async getAtomByType(
    atomType: AtomType,
    transaction: Txn,
  ): Promise<Maybe<IAtom>> {
    const queryName = `getOne`
    // eq doesn't work for some reason https://discuss.dgraph.io/t/query-based-on-eq-stopped-working-for-one-predicate/5939/10
    const filter = `regexp(atomType,/^${atomType}$/i)`
    const query = this.queryFactory.forGet(filter, queryName)

    return this.getHelper(query, transaction, queryName)
  }

  getAtomsByTypes(
    atomTypes: Array<AtomType>,
    transaction: Txn,
  ): Promise<Array<IAtom>> {
    const filter = `regexp(atomType,/(^${atomTypes.join('$)|(^')}$)/i)`
    const queryName = `getAtomsByTypes`
    const query = this.queryFactory.forGet(filter, queryName)

    return this.getAllHelper(query, transaction, queryName)
  }

  async searchAtomsByName(
    searchQuery: string,
    transaction: Txn,
  ): Promise<Array<IAtom>> {
    const filter = `match(name, "${searchQuery}", 14)`
    const queryName = `searchAtomsByName`
    const query = this.queryFactory.forGet(filter, queryName)
    const results = await this.getAllHelper(query, transaction, queryName)

    const fuse = new Fuse(results, {
      keys: ['name', 'type'],
      shouldSort: true,
      isCaseSensitive: false,
      threshold: 0.4,
    })

    // Dgraph doesn't order the results by relevance, so we have to do it manually
    return fuse.search(searchQuery).map((r) => r.item)
  }

  getAtomByElement(elementId: string, transaction: Txn): Promise<Maybe<IAtom>> {
    const query = this.queryFactory.forGetByElement(elementId)

    return this.getHelper(query, transaction, 'query')
  }

  async delete(id: string, transaction: Txn): Promise<void> {
    const existing = await this.getOne(id, transaction)

    if (!existing) {
      throw new Error(`Atom does not exist`)
    }

    await this.typeRepo.delete(existing.api.id, transaction)

    const mutation = this.mutationFactory.forDelete(existing)
    await transaction.mutate(mutation)
  }

  async deleteAll(ids: Array<string>, transaction: Txn): Promise<void> {
    if (!ids?.length) {
      return
    }

    const existing = await this.getAllByIds(ids, transaction)

    if (existing.length !== ids.length) {
      throw new Error(`Some of the ${this.entityType} do not exist`)
    }

    await Promise.all(
      existing.map((e) => this.typeRepo.delete(e.api.id, transaction)),
    )

    const mutations = existing.map((e) => this.mutationFactory.forDelete(e))

    await mergeAndMutate(transaction, ...mutations)
  }

  async upsertAtoms(
    atoms: Array<IAtom>,
    currentUser: IUser,
    transaction: Txn,
  ): Promise<Array<CreateResponsePort>> {
    const blankUids: Array<string> = []
    const uids: Array<string> = []

    const mutations = atoms.reduce((mutation, { type, name, api, id }, i) => {
      let apiUid

      if (api) {
        apiUid = `<${api.id}>`
      } else if (!id) {
        // Only create a new blank node if we're creating atom (ie no id)
        apiUid = `_:api${i}`
      }

      let atomId: string

      if (id) {
        // Update
        atomId = id
        uids.push(atomId)
      } else {
        // Create
        const blankUidLabel = `atom${i}`
        blankUids.push(blankUidLabel)
        atomId = `_:${blankUidLabel}`
      }

      return `
        ${mutation}
        ${atomId} <dgraph.type> "${DgraphEntityType.Atom}" .
        ${atomId} <atomType> "${type}" .
        ${atomId} <name> "${name}" .
        ${apiUid ? `${atomId} <api> ${apiUid} .` : ''}
        ${
          api
            ? ''
            : `
                  ${apiUid} <dgraph.type> "${DgraphEntityType.Type}" .
                  ${apiUid} <name> "${name} API" .
                  ${apiUid} <typeKind> "${TypeKind.InterfaceType}" .
                  ${
                    currentUser.roles.includes(Role.User)
                      ? `${apiUid} <owner> <${currentUser.id}> .`
                      : ''
                  }
              `
        }
      `
    }, '')

    const res = await transaction.mutate({ setNquads: mutations })

    return [
      ...blankUids.map((uid) => ({ id: getUidFromResponse(res, uid) })),
      ...uids.map((uid) => ({ id: uid })),
    ]
  }
}
