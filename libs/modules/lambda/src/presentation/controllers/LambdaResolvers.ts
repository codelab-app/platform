import { Inject, Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateLambdaInput } from '../../core/application/useCases/createLambda/CreateLambdaInput'
import { CreateLambdaService } from '../../core/application/useCases/createLambda/CreateLambdaService'
import { DeleteLambdaInput } from '../../core/application/useCases/deleteLambda/DeleteLambdaInput'
import { DeleteLambdaService } from '../../core/application/useCases/deleteLambda/DeleteLambdaService'
import { ExecuteLambdaInput } from '../../core/application/useCases/executeLambda/ExecuteLambdaInput'
import { ExecuteLambdaService } from '../../core/application/useCases/executeLambda/ExecuteLambdaService'
import { GetLambdaInput } from '../../core/application/useCases/getLambda/GetLambdaInput'
import { GetLambdaService } from '../../core/application/useCases/getLambda/GetLambdaService'
import { GetLambdasInput } from '../../core/application/useCases/getLambdas/GetLambdasInput'
import { GetLambdasService } from '../../core/application/useCases/getLambdas/GetLambdasService'
import { UpdateLambdaInput } from '../../core/application/useCases/updateLambda/UpdateLambdaInput'
import { UpdateLambdaService } from '../../core/application/useCases/updateLambda/UpdateLambdaService'
import { Lambda } from '../../core/domain/Lambda'
import { GqlAuthGuard, PrismaDITokens, PrismaService } from '@codelab/backend'

@Resolver(() => Lambda)
@Injectable()
export class LambdaResolvers {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
    private readonly createLambdaService: CreateLambdaService,
    private readonly updateLambdaService: UpdateLambdaService,
    private readonly deleteLambdaService: DeleteLambdaService,
    private readonly getLambdaService: GetLambdaService,
    private readonly getLambdasService: GetLambdasService,
    private readonly executeLambdaService: ExecuteLambdaService,
  ) {}

  @Mutation(() => Lambda)
  @UseGuards(GqlAuthGuard)
  createLambda(@Args('input') input: CreateLambdaInput) {
    return this.createLambdaService.execute(input)
  }

  @Mutation(() => Lambda)
  @UseGuards(GqlAuthGuard)
  updateLambda(@Args('input') input: UpdateLambdaInput) {
    return this.updateLambdaService.execute(input)
  }

  @Mutation(() => Lambda)
  executeLambda(@Args('input') input: ExecuteLambdaInput) {
    return this.executeLambdaService.execute(input)
  }

  @Mutation(() => Lambda)
  @UseGuards(GqlAuthGuard)
  deleteLambda(@Args('input') input: DeleteLambdaInput) {
    return this.deleteLambdaService.execute(input)
  }

  @Query(() => Lambda)
  @UseGuards(GqlAuthGuard)
  getLambda(@Args('input') input: GetLambdaInput) {
    return this.getLambdaService.execute(input)
  }

  @Query(() => [Lambda])
  @UseGuards(GqlAuthGuard)
  getLambdas(@Args('input') input: GetLambdasInput) {
    return this.getLambdasService.execute(input)
  }
}
