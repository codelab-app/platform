import { ITypeNeo4jRepository } from '@codelab/backend/abstract/core'
import { IType } from '@codelab/shared/abstract/core'
import { EntityLike } from '@codelab/shared/abstract/types'
import {
  InjectPersistenceManager,
  ObjectUtils,
  PersistenceManager,
  Transactional,
} from '@liberation-data/drivine'
import { Injectable } from '@nestjs/common'
import path from 'path'

@Injectable()
export class TypeNeo4jRepository implements ITypeNeo4jRepository {
  constructor(
    @InjectPersistenceManager() readonly persistenceManager: PersistenceManager, // @InjectCypher(path.resolve(__dirname, 'cypher/type'), 'mutations/save-type') // readonly saveType: CypherStatement,
  ) {
    console.log(path.resolve(process.cwd()))
    console.log(path.resolve(__dirname))
  }

  @Transactional()
  async save(type: IType): Promise<any> {
    const typeProps = ObjectUtils.primitiveProps(type)

    console.log(typeProps)

    // const results = this.persistenceManager.execute(
    //   new QuerySpecification(
    //     `match (n) with count(n) as count return {count: count}`,
    //   ),
    // )

    // console.log(results)
    const parameters = {
      typeProps,
    }

    // const statement = new QuerySpecification(this.saveType).bind(parameters)
    // const results = await this.persistenceManager.execute(statement)
    //
    // console.log(results)

    return Promise.resolve()
  }

  exists(type: EntityLike) {
    return Promise.resolve(false)
  }

  /**
   * On Neo4j we can perform a save using an atomic CYPHER statement, like that found in save-urbanite.cypher.
   * @param person
   */
  // private async neo4jSave(obj: any): Promise<void> {
  //   const urbaniteProps = ObjectUtils.primitiveProps(obj)

  //   const parameters = {
  //     urbaniteProps: urbaniteProps,
  //     metros: person.favoriteHaunts.map((it) => it.name),
  //   }

  //   const statement = new QuerySpecification(this.saveUrbanite).bind(parameters)
  //   await this.persistenceManager.execute(statement)
  // }
}
