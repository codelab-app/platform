import { Inject, Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Vertex } from '../../../../graph/src/core/domain/vertex/Vertex'
import { AssignStyleInput } from '../../core/application/useCases/assignStyle/AssignStyleInput'
import { AssignStyleService } from '../../core/application/useCases/assignStyle/AssignStyleService'
import { CreateStyleInput } from '../../core/application/useCases/createStyle/CreateStyleInput'
import { CreateStyleService } from '../../core/application/useCases/createStyle/CreateStyleService'
import { DeleteStyleInput } from '../../core/application/useCases/deleteStyle/DeleteStyleInput'
import { DeleteStyleService } from '../../core/application/useCases/deleteStyle/DeleteStyleService'
import { GetStyleInput } from '../../core/application/useCases/getStyle/GetStyleInput'
import { GetStyleService } from '../../core/application/useCases/getStyle/GetStyleService'
import { GetStylesInput } from '../../core/application/useCases/getStyles/GetStylesInput'
import { GetStylesService } from '../../core/application/useCases/getStyles/GetStylesService'
import { UnAssignStyleInput } from '../../core/application/useCases/unAssignStyle/UnAssignStyleInput'
import { UnAssignStyleService } from '../../core/application/useCases/unAssignStyle/UnAssignStyleService'
import { UpdateStyleInput } from '../../core/application/useCases/updateStyle/UpdateStyleInput'
import { UpdateStyleService } from '../../core/application/useCases/updateStyle/UpdateStyleService'
import { Style } from '../../core/domain/Style'
import { GqlAuthGuard, PrismaDITokens, PrismaService } from '@codelab/backend'

@Resolver(() => Style)
@Injectable()
export class StyleResolvers {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
    private readonly getStylesService: GetStylesService,
    private readonly getStyleService: GetStyleService,
    private readonly createStyleService: CreateStyleService,
    private readonly assignStyleService: AssignStyleService,
    private readonly unAssignStyleService: UnAssignStyleService,
    private readonly deleteStyleService: DeleteStyleService,
    private readonly updateStyleService: UpdateStyleService,
  ) {}

  @Query(() => [Style])
  @UseGuards(GqlAuthGuard)
  getStyles(@Args('input') input: GetStylesInput) {
    return this.getStylesService.execute(input)
  }

  @Query(() => Style)
  @UseGuards(GqlAuthGuard)
  getStyle(@Args('input') input: GetStyleInput) {
    return this.getStyleService.execute(input)
  }

  @Mutation(() => Style)
  @UseGuards(GqlAuthGuard)
  createStyle(@Args('input') input: CreateStyleInput) {
    return this.createStyleService.execute(input)
  }

  @Mutation(() => Style)
  @UseGuards(GqlAuthGuard)
  assignStyle(@Args('input') input: AssignStyleInput) {
    return this.assignStyleService.execute(input)
  }

  @Mutation(() => Style)
  @UseGuards(GqlAuthGuard)
  unAssignStyle(@Args('input') input: UnAssignStyleInput) {
    return this.unAssignStyleService.execute(input)
  }

  @Mutation(() => Style)
  @UseGuards(GqlAuthGuard)
  deleteStyle(@Args('input') input: DeleteStyleInput) {
    return this.deleteStyleService.execute(input)
  }

  @Mutation(() => Style)
  @UseGuards(GqlAuthGuard)
  updateStyle(@Args('input') input: UpdateStyleInput) {
    return this.updateStyleService.execute(input)
  }

  @ResolveField('vertices', () => [Vertex])
  vertices(@Parent() style: Style) {
    return this.prismaService.style
      .findFirst({ where: { id: style.id } })
      .vertices()
  }
}
