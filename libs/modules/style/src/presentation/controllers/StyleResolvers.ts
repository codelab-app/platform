import { Inject, Injectable } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AssignStyleInput } from '../../core/application/useCases/assignStyle/AssignStyleInput'
import { AssignStyleService } from '../../core/application/useCases/assignStyle/AssignStyleService'
import { CreateStyleInput } from '../../core/application/useCases/createStyle/CreateStyleInput'
import { CreateStyleService } from '../../core/application/useCases/createStyle/CreateStyleService'
import { DeleteStyleInput } from '../../core/application/useCases/deleteStyle/DeleteStyleInput'
import { DeleteStyleService } from '../../core/application/useCases/deleteStyle/DeleteStyleService'
import { UpdateStyleInput } from '../../core/application/useCases/updateStyle/UpdateStyleInput'
import { UpdateStyleService } from '../../core/application/useCases/updateStyle/UpdateStyleService'
import { Style } from '../../core/domain/Style'
import { PrismaDITokens, PrismaService } from '@codelab/backend'

@Resolver(() => Style)
@Injectable()
export class StyleResolvers {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
    private readonly createStyleService: CreateStyleService,
    private readonly assignStyleService: AssignStyleService,
    private readonly deleteStyleService: DeleteStyleService,
    private readonly updateStyleService: UpdateStyleService,
  ) {}

  @Query(() => Style)
  getStyle() {
    return null
  }

  @Mutation(() => Style)
  createStyle(@Args('input') input: CreateStyleInput) {
    return this.createStyleService.execute(input)
  }

  @Mutation(() => Style)
  assignStyle(@Args('input') input: AssignStyleInput) {
    return this.assignStyleService.execute(input)
  }

  @Mutation(() => Style)
  deleteStyle(@Args('input') input: DeleteStyleInput) {
    return this.deleteStyleService.execute(input)
  }

  @Mutation(() => Style)
  updateStyle(@Args('input') input: UpdateStyleInput) {
    return this.updateStyleService.execute(input)
  }
}
