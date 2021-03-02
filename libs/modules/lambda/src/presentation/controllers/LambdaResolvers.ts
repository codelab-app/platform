import { Inject, Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateLambdaInput } from '../../core/application/useCases/createLambda/CreateLambdaInput'
import { CreateLambdaService } from '../../core/application/useCases/createLambda/CreateLambdaService'
import { DeleteLambdaInput } from '../../core/application/useCases/deleteLambda/DeleteLambdaInput'
import { DeleteLambdaService } from '../../core/application/useCases/deleteLambda/DeleteLambdaService'
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
  @UseGuards(GqlAuthGuard)
  deleteLambda(@Args('input') input: DeleteLambdaInput) {
    return this.deleteLambdaService.execute(input)
  }
}
