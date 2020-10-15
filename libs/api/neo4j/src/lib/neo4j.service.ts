import { Inject, Injectable } from '@nestjs/common'
import { Driver } from 'neo4j-driver'
import { NEO4J_PROVIDER } from './neo4j.provider'

@Injectable()
export class Neo4jService {
  constructor(@Inject(NEO4J_PROVIDER) private readonly neo4j: Driver) {}

  async findAll(): Promise<any> {
    return this.neo4j.session().run('MATCH (n:Movie) RETURN n LIMIT 5')
  }

  async run(query: string): Promise<any> {
    return this.neo4j.session().run(query)
  }
}
