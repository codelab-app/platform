import {
  IAtomRepository,
  IAtomRepositoryToken,
  ITransaction,
  ITypeRepository,
  ITypeRepositoryToken,
} from '@codelab/backend/abstract/core'
import { compareIds, TransactionManager } from '@codelab/backend/infra'
import {
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { AtomType, Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { AtomInfrastructureModule } from '../../modules/atom-infrastructure.module'
import { atomUpdateData, testApi, testAtom } from './atom-test-data'

describe('Atom repository', function () {
  let app: INestApplication
  let atomRepo: IAtomRepository
  let typeRepo: ITypeRepository
  let transaction: ITransaction
  let transactionMan: TransactionManager
  let apiId: string

  beforeAll(async () => {
    app = await setupTestModule([AtomInfrastructureModule, AtomModule], {
      resetDb: true,
      role: Role.User,
    })
    typeRepo = app.get<ITypeRepository>(ITypeRepositoryToken)
    atomRepo = app.get<IAtomRepository>(IAtomRepositoryToken)
    transactionMan = app.get(TransactionManager)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  beforeEach(async () => {
    transaction = transactionMan.generateTransaction()

    apiId = await typeRepo.create(testApi, transaction).then((r) => r.id)
  })

  afterEach(async () => {
    await transactionMan.discardTransaction(transaction)
  })

  it('should inject the AtomRepository', function () {
    expect(atomRepo).toBeDefined()
  })

  it('should create get update and delete atom', async () => {
    const { id } = await atomRepo.create(
      { ...testAtom, api: { id: apiId } },
      transaction,
    )

    let atom = await atomRepo.getOne(id, transaction)

    if (!atom) {
      throw new Error('atom is null')
    }

    expect(atom).toEqual({
      ...testAtom,
      api: { id: apiId },
      id,
    })

    await atomRepo.update({ ...atom, ...atomUpdateData }, transaction)

    atom = await atomRepo.getOne(id, transaction)

    expect(atom).toEqual({
      ...testAtom,
      ...atomUpdateData,
      api: { id: apiId },
      id,
    })

    const { id: id2 } = await atomRepo.create(
      { ...testAtom, api: { id: apiId } },
      transaction,
    )

    const all = await atomRepo.getAll(transaction)

    const expectedAll = [
      { ...testAtom, ...atomUpdateData, api: { id: apiId }, id },
      { ...testAtom, api: { id: apiId }, id: id2 },
    ]

    expect(all.sort(compareIds)).toEqual(expectedAll)

    const allByIds = await atomRepo.getAllByIds([id, id2], transaction)

    expect(allByIds.sort(compareIds)).toEqual(expectedAll)

    await atomRepo.delete(id, transaction)

    expect(await atomRepo.getOne(id, transaction)).toBeUndefined()
    expect(await typeRepo.getOne(apiId, transaction)).toBeUndefined()
  })

  it('should get atom by type', async () => {
    const { id } = await atomRepo.create(
      { ...testAtom, api: { id: apiId } },
      transaction,
    )

    const { id: id2 } = await atomRepo.create(
      { ...testAtom, type: AtomType.AntDesignCardMeta, api: { id: apiId } },
      transaction,
    )

    const found = await atomRepo.getAtomByType(testAtom.type, transaction)

    expect(found).toEqual({ ...testAtom, api: { id: apiId }, id })

    const foundAll = await atomRepo.getAtomsByTypes(
      [testAtom.type, AtomType.AntDesignCardMeta],
      transaction,
    )

    expect(foundAll.sort(compareIds)).toEqual([
      { ...testAtom, api: { id: apiId }, id },
      {
        ...testAtom,
        type: AtomType.AntDesignCardMeta,
        api: { id: apiId },
        id: id2,
      },
    ])
  })

  it('should search atom by name', async () => {
    await atomRepo.create({ ...testAtom, api: { id: apiId } }, transaction)

    const name = 'Some random name'

    const { id: id2 } = await atomRepo.create(
      { ...testAtom, name, api: { id: apiId } },
      transaction,
    )

    const found = await atomRepo.searchAtomsByName('random', transaction)

    expect(found.sort(compareIds)).toEqual([
      { ...testAtom, name, api: { id: apiId }, id: id2 },
    ])
  })
})
