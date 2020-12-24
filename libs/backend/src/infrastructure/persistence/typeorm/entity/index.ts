import { TypeOrmEdge } from './TypeOrmEdge'
import { TypeOrmGraph } from './TypeOrmGraph'
import { TypeOrmPage } from './TypeOrmPage'
import { TypeOrmUser } from './TypeOrmUser'
import { TypeOrmVertex } from './TypeOrmVertex'

export * from './TypeOrmEdge'
export * from './TypeOrmGraph'
export * from './TypeOrmUser'
export * from './TypeOrmVertex'
export * from './TypeOrmPage'

export const typeormEntities = [
  TypeOrmEdge,
  TypeOrmGraph,
  TypeOrmUser,
  TypeOrmVertex,
  TypeOrmPage,
]
