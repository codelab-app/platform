import { SharedApplicationModule } from '@codelab/backend/application/shared'
import { AppDomainModule, AppRepository } from '@codelab/backend/domain/app'
import { PageRepository } from '@codelab/backend/domain/page'
import type { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { AuthDomainModule } from '@codelab/backend/domain/shared/auth'
import {
  UserDomainModule,
  UserDomainService,
  UserRepository,
} from '@codelab/backend/domain/user'
import { Neo4jService, OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import {
  RequestContextMiddleware,
  RequestContextModule,
} from '@codelab/backend/infra/adapter/request-context'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { initUserContext } from '@codelab/backend/test'
import { userDto } from '@codelab/shared/data/test'
import type { INestApplication } from '@nestjs/common'
import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'

describe('Element types', () => {
  const context = initUserContext({
    imports: [AppDomainModule, SharedApplicationModule],
    providers: [UserRepository, AppRepository, PageRepository],
  })

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('can fetch types for an element', () => {
    //
  })
})
