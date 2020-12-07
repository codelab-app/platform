import { Controller, Get, Query } from '@nestjs/common'
import { CytoscapeStorybookService } from './cytoscape-storybook.service'
import { GraphService } from './graph.service'

@Controller('graph')
export class GraphController {
  constructor(
    private readonly graphService: GraphService,
    private readonly cyGraphSerice: CytoscapeStorybookService,
  ) {}

  @Get('shouldMoveWithDiffParentCorrectOrder')
  async shouldMoveWithDiffParentCorrectOrder(@Query() query: any) {
    return this.cyGraphSerice.shouldMoveWithDiffParentCorrectOrder(query.move)
  }

  @Get('simpleGraph')
  async simpleGraph() {
    return this.cyGraphSerice.simpleGraph()
  }

  @Get('shouldMoveWithDifferentParent')
  async shouldMoveWithDifferentParent(@Query() query: any) {
    return this.cyGraphSerice.shouldMoveWithDifferentParent(query.move)
  }

  @Get('shouldMoveItemToEndOfListSameParent')
  async shouldMoveItemToEndOfListSameParent(@Query() query: any) {
    return this.cyGraphSerice.shouldMoveItemToEndOfListSameParent(query.move)
  }

  @Get('shouldMoveItemToEndOfListDifferentParent')
  async shouldMoveItemToEndOfListDifferentParent(@Query() query: any) {
    return this.cyGraphSerice.shouldMoveItemToEndOfListDifferentParent(
      query.move,
    )
  }

  @Get('shouldMoveWithDifferentParentWithTwoChildren')
  async shouldMoveWithDifferentParentWithTwoChildren(@Query() query: any) {
    return this.cyGraphSerice.shouldMoveWithDifferentParentWithTwoChildren(
      query.move,
    )
  }
}
