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
    const srcTarget: { source?: string; target?: string } = {}

    if (query.hasOwnProperty('source') && query.hasOwnProperty('target')) {
      srcTarget.source = query.source
      srcTarget.target = query.target
    }

    return this.cyGraphSerice.shouldMoveWithDiffParentCorrectOrder(
      query.move,
      srcTarget,
    )
  }

  @Get('simpleGraph')
  async simpleGraph() {
    return this.cyGraphSerice.simpleGraph()
  }

  @Get('shouldMoveWithDifferentParent')
  async shouldMoveWithDifferentParent(@Query() query: any) {
    const srcTarget: { source?: string; target?: string } = {}

    if (query.hasOwnProperty('source') && query.hasOwnProperty('target')) {
      srcTarget.source = query.source
      srcTarget.target = query.target
    }

    return this.cyGraphSerice.shouldMoveWithDifferentParent(
      query.move,
      srcTarget,
    )
  }

  @Get('shouldMoveItemToEndOfListSameParent')
  async shouldMoveItemToEndOfListSameParent(@Query() query: any) {
    const srcTarget: { source?: string; target?: string } = {}

    if (query.hasOwnProperty('source') && query.hasOwnProperty('target')) {
      srcTarget.source = query.source
      srcTarget.target = query.target
    }

    return this.cyGraphSerice.shouldMoveItemToEndOfListSameParent(
      query.move,
      srcTarget,
    )
  }

  @Get('shouldMoveItemToEndOfListDifferentParent')
  async shouldMoveItemToEndOfListDifferentParent(@Query() query: any) {
    const srcTarget: { source?: string; target?: string } = {}

    if (query.hasOwnProperty('source') && query.hasOwnProperty('target')) {
      srcTarget.source = query.source
      srcTarget.target = query.target
    }

    return this.cyGraphSerice.shouldMoveItemToEndOfListDifferentParent(
      query.move,
      srcTarget,
    )
  }

  @Get('shouldMoveWithDifferentParentWithTwoChildren')
  async shouldMoveWithDifferentParentWithTwoChildren(@Query() query: any) {
    const srcTarget: { source?: string; target?: string } = {}

    if (query.hasOwnProperty('source') && query.hasOwnProperty('target')) {
      srcTarget.source = query.source
      srcTarget.target = query.target
    }

    return this.cyGraphSerice.shouldMoveWithDifferentParentWithTwoChildren(
      query.move,
      srcTarget,
    )
  }
}
