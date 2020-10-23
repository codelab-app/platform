import { Body, Controller, Get, Post } from '@nestjs/common'
import { Neo4jNodeService } from './neo4j-node.service'

@Controller('neo4j')
export class Neo4jNodeController {
  constructor(private readonly neo4jService: Neo4jNodeService) {}

  @Get()
  async findAll() {
    return this.neo4jService.findAll()
  }

  @Post()
  async run(@Body() { query }: { query: string }) {
    return this.neo4jService.run(query)
  }
}
