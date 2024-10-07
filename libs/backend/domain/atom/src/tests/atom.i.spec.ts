import type { INestApplication } from '@nestjs/common'

import { UserDomainModule } from '@codelab/backend/domain/user'
import { initUserContext } from '@codelab/backend/test'
import { CreateAtomsDocument } from '@codelab/shared-domain-module-atom'
import { print } from 'graphql'
import request from 'supertest'

describe('Atom CRUD', () => {
  let app: INestApplication

  const context = initUserContext({
    imports: [UserDomainModule],
    providers: [],
  })

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    app = ctx.nestApp

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('can create atom', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CreateAtomsDocument.toString(),
      })
      .expect(200)
      .expect((res) => {
        console.log(res)
      })

    expect(true).toBeTruthy()
  })
})
