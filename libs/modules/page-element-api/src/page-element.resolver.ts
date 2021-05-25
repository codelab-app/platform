import { CurrentUser, GqlAuthGuard, JwtPayload } from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PageElementRoot } from './models'

@Resolver(() => PageElementRoot)
@Injectable()
export class PageElementResolver {}
