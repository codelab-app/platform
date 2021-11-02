import { GqlAuthGuard } from '@codelab/backend/infra'
import { CurrentUser } from '@codelab/backend/modules/user'
import type { IUser } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Lambda, LambdaPayload } from '../domain/lambda.model'
import {
  CreateLambdaInput,
  CreateLambdaService,
} from '../use-cases/create-lambda'
import {
  DeleteLambdaInput,
  DeleteLambdaService,
} from '../use-cases/delete-lambda'
import { ExecuteLambdaInput } from '../use-cases/execute-lambda'
import { GetLambdaInput, GetLambdaService } from '../use-cases/get-lambda'
import { GetLambdasService } from '../use-cases/get-lambdas'
import {
  UpdateLambdaInput,
  UpdateLambdaService,
} from '../use-cases/update-lambda'
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
    private readonly updateLambdaService: UpdateLambdaService,
  ) {}

  @Mutation(() => Lambda)
  @UseGuards(GqlAuthGuard)
  async createLambda(
    @Args('input') input: CreateLambdaInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { id } = await this.createLambdaService.execute({
      input,
      currentUser,
    })

    await this.lambdaService.createLambda({
      id,
      ...input,
    })

    const lambda = await this.getLambdaService.execute({
      lambdaId: id,
    })

    if (!lambda) {
      throw new Error("Can't find created lambda")
    }

    return lambda
  }

  @Mutation(() => Lambda)
  @UseGuards(GqlAuthGuard)
  async deleteLambda(@Args('input') input: DeleteLambdaInput) {
    const lambda = await this.getLambdaService.execute({
      lambdaId: input.lambdaId,
    })

    if (!lambda) {
      throw new Error("Can't find lambda")
    }

    await this.deleteLambdaService.execute(input)

    await this.lambdaService.deleteLambda({ id: input.lambdaId })

    return lambda
  }

  @Mutation(() => Lambda, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateLambda(@Args('input') input: UpdateLambdaInput) {
    await this.updateLambdaService.execute(input)

    await this.lambdaService.updateLambda(input)

    const lambda = await this.getLambdaService.execute({
      lambdaId: input.id,
    })

    if (!lambda) {
      throw new Error("Can't find lambda")
    }

    return lambda
  }

  @Query(() => Lambda, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getLambda(@Args('input') input: GetLambdaInput) {
    const lambda = await this.getLambdaService.execute(input)

    if (!lambda) {
      return null
    }

    return lambda
  }

  @Mutation(() => LambdaPayload, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async executeLambda(@Args('input') input: ExecuteLambdaInput) {
    const lambda = await this.getLambdaService.execute(input)

    if (!lambda) {
      return null
    }

    const results = await this.lambdaService.executeLambda(
      lambda,
      JSON.parse(input.payload || '{}'),
    )

    return { payload: JSON.stringify(results) }
  }

  @Query(() => [Lambda], { defaultValue: [] })
  @UseGuards(GqlAuthGuard)
  async getLambdas(@CurrentUser() currentUser: IUser) {
    return this.getLambdasService.execute({ currentUser })
  }
}
