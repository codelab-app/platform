import {
  CurrentUser,
  GqlAuthGuard,
  JwtPayload,
} from '@codelab/backend/adapters'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Lambda } from './lambda.model'
import { CreateLambdaInput } from './use-cases/create-lambda/create-lambda.input'
import { CreateLambdaService } from './use-cases/create-lambda/create-lambda.service'
import {
  DeleteLambdaInput,
  DeleteLambdaService,
} from './use-cases/delete-lambda'

@Resolver(() => Lambda)
@Injectable()
export class LambdaResolver {
  constructor(
    private readonly createLambdaService: CreateLambdaService,
    private readonly deleteLambdaService: DeleteLambdaService,
  ) {}

  @Mutation(() => Lambda)
  @UseGuards(GqlAuthGuard)
  async createLambda(
    @Args('input') input: CreateLambdaInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return await this.createLambdaService.execute({ input, ownerId: user.sub })
  }

  @Mutation(() => Lambda)
  @UseGuards(GqlAuthGuard)
  async deleteLambda(@Args('input') input: DeleteLambdaInput) {
    return await this.deleteLambdaService.execute(input)
  }

  @Query(() => Lambda)
  @UseGuards(GqlAuthGuard)
  async getLambda() {
    return null
  }
}
