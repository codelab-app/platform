import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CodelabAppEntity } from '../models/app/codelab-app.entity'
import { EdgeEntity } from '../models/edge/edge.entity'
import { GraphEntity } from '../models/graph/graph.entity'
import { PageEntity } from '../models/page/page.entity'
import { VertexEntity } from '../models/vertex/vertex.entity'
import { NodeType } from '@codelab/shared/interface/node'

@Injectable()
export class SeedDbService {
  constructor(
    @InjectRepository(VertexEntity)
    private readonly vertexRepository: Repository<VertexEntity>,
    @InjectRepository(EdgeEntity)
    private readonly edgeRepository: Repository<EdgeEntity>,
    @InjectRepository(GraphEntity)
    private readonly graphRepository: Repository<GraphEntity>,
    @InjectRepository(CodelabAppEntity)
    private readonly appRepository: Repository<CodelabAppEntity>,
    @InjectRepository(PageEntity)
    private readonly pageRepository: Repository<PageEntity>,
  ) {}

  async seedDB() {
    this.seedDemoDB()
    this.seedButtonData()
  }

  async seedDemoDB() {
    /**
     * Vertices
     */
    const vList = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_List,
        props: {},
      }),
    )
    const vListItem0 = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_List_Item,
        props: {},
      }),
    )
    const vListItem1 = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_List_Item,
        props: {},
      }),
    )

    const vListItem2 = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_List_Item,
        props: {},
      }),
    )

    /**
     * Layout vertices
     */
    const layoutVertex = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_Layout,
        props: {},
      }),
    )

    const textWithDataVertex0 = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_Text,
        props: {},
      }),
    )

    const textWithDataVertex1 = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_Text,
        props: {},
      }),
    )

    const textWithDataVertex2 = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_Text,
        props: {},
      }),
    )

    /**
     * Layout edges
     */

    const layoutEdge1 = await this.edgeRepository.save(
      this.edgeRepository.create({
        order: 0,
        source: layoutVertex.id,
        target: textWithDataVertex0.id,
        props: {},
      }),
    )

    const layoutEdge2 = await this.edgeRepository.save(
      this.edgeRepository.create({
        order: 1,
        source: layoutVertex.id,
        target: textWithDataVertex1.id,
        props: {},
      }),
    )

    const layoutEdge3 = await this.edgeRepository.save(
      this.edgeRepository.create({
        order: 2,
        source: layoutVertex.id,
        target: textWithDataVertex2.id,
        props: {},
      }),
    )

    /**
     * Edges
     */
    const edge1 = await this.edgeRepository.save(
      this.edgeRepository.create({
        order: 0,
        source: vList.id,
        target: vListItem0.id,
        props: {},
      }),
    )
    const edge2 = await this.edgeRepository.save(
      this.edgeRepository.create({
        order: 1,
        source: vList.id,
        target: vListItem1.id,
        props: {},
      }),
    )

    const edge3 = await this.edgeRepository.save(
      this.edgeRepository.create({
        order: 2,
        source: vList.id,
        target: vListItem2.id,
        props: {},
      }),
    )
    /**
     * Graph
     */
    const graph = await this.graphRepository.save(
      this.graphRepository.create({
        vertices: [vList, vListItem0, vListItem1, vListItem2],
        edges: [edge1, edge2, edge3],
      }),
    )
    const layoutGraph = await this.graphRepository.save(
      this.graphRepository.create({
        vertices: [
          layoutVertex,
          textWithDataVertex0,
          textWithDataVertex1,
          textWithDataVertex2,
        ],
        edges: [layoutEdge1, layoutEdge2, layoutEdge3],
      }),
    )
    /**
     * App
     */
    const app = await this.appRepository.save(
      this.appRepository.create({
        graphs: [graph],
      }),
    )

    /**
     * Page - has only layout graph
     */
    const page = await this.pageRepository.save(
      this.pageRepository.create({
        app,
        graphs: [layoutGraph],
      }),
    )
  }

  async seedButtonData() {
    /**
     * Vertices
     */

    const vertexFragment = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_Fragment,
        props: {},
      }),
    )
    const vertexButton = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_Button,
        props: {
          type: 'primary',
        },
      }),
    )
    const vertexText = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_Text,
        props: {
          value: 'Click me',
        },
      }),
    )

    /**
     * Edges
     */
    const edgeFragmentToButton = await this.edgeRepository.save(
      this.edgeRepository.create({
        order: 0,
        source: vertexFragment.id,
        target: vertexButton.id,
        props: {},
      }),
    )
    const edgeButtonToText = await this.edgeRepository.save(
      this.edgeRepository.create({
        order: 1,
        source: vertexButton.id,
        target: vertexText.id,
        props: {},
      }),
    )

    /**
     * Graph
     */
    const graph = await this.graphRepository.save(
      this.graphRepository.create({
        vertices: [vertexFragment, vertexButton, vertexText],
        edges: [edgeFragmentToButton, edgeButtonToText],
        label: 'button-graph',
      }),
    )

    /**
     * App
     */

    await this.appRepository.save(
      this.appRepository.create({
        graphs: [graph],
      }),
    )
  }
}
