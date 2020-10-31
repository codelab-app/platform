import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from './app.module'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest')

describe('AppModule', () => {
  let app: INestApplication
  let httpServer

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    httpServer = app.getHttpServer()
    // Logger.log(httpServer, 'app.e2e.spec.ts')

    await app.init()
  })

  it(`Get Node`, () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{Node(id: 1) {id type }}' })
      .expect(200)
      .then((response: any) => {
        // Logger.log(response, 'app.e2e.spec.ts')
        // Logger.log("HELLO")
        expect(response.body.data.Node).toStrictEqual([
          { id: '1', type: 'REACT_DIV' },
        ])
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
// Logger.log(process.cwd());
