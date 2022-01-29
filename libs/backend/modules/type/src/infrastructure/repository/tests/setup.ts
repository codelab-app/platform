import {
  ITransaction,
  ITypeRepository,
  ITypeRepositoryToken,
} from '@codelab/backend/abstract/core'
import { TransactionManager } from '@codelab/backend/infra'
import {
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../type.module'

export const setupTypeRepositoryTest = () => {
  const module: {
    app: INestApplication
    repo: ITypeRepository
    transactionManager: TransactionManager
    transaction: ITransaction
  } = {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    app: null!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    repo: null!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    transactionManager: null!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    transaction: null!,
  }

  beforeAll(async () => {
    module.app = await setupTestModule([TypeModule], {
      role: Role.User,
      resetDb: true,
    })
    module.repo = module.app.get<ITypeRepository>(ITypeRepositoryToken)
    module.transactionManager = module.app.get(TransactionManager)
  })

  afterAll(async () => {
    await teardownTestModule(module.app)
  })

  beforeEach(() => {
    module.transaction = module.transactionManager.generateTransaction()
  })

  afterEach(async () => {
    await module.transaction.discard()
  })

  return module
}
