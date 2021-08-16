import { CurrentUser, GqlAuthGuard, Void } from '@codelab/backend/infra'
import { User } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Lambda, LambdaPayload } from '../domain/lambda.model'
import { CreateLambdaInput } from '../use-cases/create-lambda/create-lambda.input'
import { CreateLambdaService } from '../use-cases/create-lambda/create-lambda.service'
import {
  DeleteLambdaInput,
  DeleteLambdaService,
} from '../use-cases/delete-lambda'
import {
  ExecuteLambdaInput,
  ExecuteLambdaService,
} from '../use-cases/execute-lambda'
import { GetLambdaInput, GetLambdaService } from '../use-cases/get-lambda'
import { GetLambdasService } from '../use-cases/get-lambdas'
import { UpdateLambdaInput } from '../use-cases/update-lambda/update-lambda.input'
import { UpdateLambdaService } from '../use-cases/update-lambda/update-lambda.service'
import { LambdaService } from './lambda.service'

@Resolver(() => Lambda)
@Injectable()
export class LambdaResolver {
  constructor(
    private readonly lambdaService: LambdaService,
    private readonly createLambdaService: CreateLambdaService,
    private readonly deleteLambdaService: DeleteLambdaService,
    private readonly getLambdasService: GetLambdasService,
    private readonly getLambdaService: GetLambdaService,
    private readonly executeLambdaService: ExecuteLambdaService,
    private readonly updateLambdaService: UpdateLambdaService,
  ) {}

  @Mutation(() => Lambda)
  @UseGuards(GqlAuthGuard)
  async createLambda(
    @Args('input') input: CreateLambdaInput,
    @CurrentUser() currentUser: User,
  ) {
    const lambda = await this.createLambdaService.execute({
      input,
      currentUser,
    })

    await this.lambdaService.createLambda(lambda)

    return lambda
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deleteLambda(@Args('input') input: DeleteLambdaInput) {
    const lambda = await this.deleteLambdaService.execute(input)

    await this.lambdaService.deleteLambda(lambda)

    return lambda
  }

  @Mutation(() => Lambda, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateLambda(@Args('input') input: UpdateLambdaInput) {
    const lambda = await this.updateLambdaService.execute(input)

    await this.lambdaService.updateLambda(lambda)

    return lambda
  }

  @Query(() => Lambda, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getLambda(@Args('input') input: GetLambdaInput) {
    return this.getLambdaService.execute(input)
  }

  @Mutation(() => LambdaPayload, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async executeLambda(@Args('input') input: ExecuteLambdaInput) {
    const lambda = await this.getLambdaService.execute(input)

    const results = await this.lambdaService.executeLambda(
      lambda,
      JSON.parse(input.payload || '{}'),
    )

    return { payload: JSON.stringify(results) }
  }

  @Query(() => [Lambda])
  @UseGuards(GqlAuthGuard)
  async getLambdas(@CurrentUser() currentUser: User) {
    return this.getLambdasService.execute({ currentUser })
  }
}
