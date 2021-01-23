import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Connection } from 'typeorm'
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked'
import { TestInfrastructureModule } from '../../../../../../../backend/src/framework/nestjs/test-infrastructure.module'
import { getApolloTestClient } from '../../../../../../../backend/src/infrastructure/graphql/test/apolloTestClient'
import { ICreateApp } from '../../../../../../../backend/src/infrastructure/graphql/test/interface/ICreateApp'
import { IRegisterUser } from '../../../../../../../backend/src/infrastructure/graphql/test/interface/IRegisterUser'
import { CreateAppGql } from '../../../../../../app-stories/src/useCases/createApp/CreateAppInput.generated'
import { AppModule } from '../../../../../../app/src/framework/nestjs/AppModule'
import { GraphModule } from '../../../../../../graph/src/framework/nestjs/GraphModule'
import { UserModule } from '../../../../../../user/src/framework/nestjs/UserModule'
import { PageModule } from '../../../../framework/nestjs/PageModule'
import { mutate } from '@codelab/alpha/shared/utils'
import { RegisterUserGql } from '@codelab/modules/user-stories'

const email = 'test_user@codelab.ai'
const password = 'password'

describe.skip('CreatePageUseCase', () => {
  let app: INestApplication
  let connection: Connection
  let testClient: ApolloClient<NormalizedCacheObject>
  let url = ''

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        TestInfrastructureModule,
        PageModule,
        GraphModule,
        UserModule,
        AppModule,
      ],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)

    const port = 3000

    url = `http://localhost:${port}/graphql`

    await connection.synchronize(true)
    initializeTransactionalContext()
    await app.init()
    await app.listen(port, 'localhost', () => {
      console.log(`Listening at http://localhost:${port}`)
    })
    testClient = getApolloTestClient(url)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create page with graph and a root vertex', async (done) => {
    const registerUserResult: FetchResult<IRegisterUser> = await mutate(
      testClient,
      {
        mutation: RegisterUserGql,
        variables: {
          input: { email, password },
        },
      },
    )

    const accessToken = registerUserResult.data?.registerUser.accessToken

    expect(accessToken).toBeDefined()

    testClient = getApolloTestClient(url, accessToken)

    const newAppResult: FetchResult<ICreateApp> = await mutate(testClient, {
      mutation: CreateAppGql,
      variables: {
        input: { title: 'Test App' },
      },
    })
    const appId = newAppResult.data?.createApp.id

    expect(appId).toBeDefined()
  })

  //   await pageClient.createPage('Page 1', appId as string)
  //
  //   const sub = pageClient.pageCreated$().subscribe((result) => {
  //     const title = result.data?.pageCreated.title
  //
  //     expect(title).toEqual('Page 1')
  //     sub.unsubscribe()
  //     done()
  //   })
  // })
})
