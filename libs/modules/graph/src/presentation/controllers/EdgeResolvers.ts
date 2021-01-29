import { Injectable } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UpdateEdgeInput } from '../../core/application/useCases/updateEdge/UpdateEdgeInput'
import { UpdateEdgeService } from '../../core/application/useCases/updateEdge/UpdateEdgeService'
import { Edge } from '../../core/domain/edge/Edge'

@Resolver(() => Edge)
@Injectable()
export class EdgeResolvers {
  constructor(private readonly updateEdgeService: UpdateEdgeService) {}

  @Mutation(() => Edge)
  updateEdge(@Args('input') input: UpdateEdgeInput) {
    return this.updateEdgeService.execute(input)
  }
}
