import { Body, Controller, Get, Post } from '@nestjs/common'
import { Neo4jDriversService } from './neo4j-drivers.service'

@Controller('neo4j')
export class Neo4jDriversController {
  constructor(private readonly neo4jService: Neo4jDriversService) {}

  @Get()
  async findAll() {
    return this.neo4jService.findAll()
  }

  @Post()
  async run(@Body() { query }: { query: string }) {
    return this.neo4jService.run(query)
  }
}
