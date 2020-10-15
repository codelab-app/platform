import { Body, Controller, Get, Post } from '@nestjs/common'
import { Neo4jService } from './neo4j.service'

@Controller('neo4j')
export class Neo4jController {
  constructor(private readonly neo4jService: Neo4jService) {}

  @Get()
  async findAll() {
    return this.neo4jService.findAll()
  }

  @Post()
  async run(@Body() { query }: { query: string }) {
    return this.neo4jService.run(query)
  }
}
