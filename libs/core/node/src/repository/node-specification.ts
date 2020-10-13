import {
  NodeCreate,
  NodeI,
  nodeTypeLiterals,
} from '@codelab/shared/interface/node'

export interface IsSpecification<T = any> {
  isSatisfiedBy(data: T): boolean
}

// Alias for input data specification
export type IsInputSpecification = IsSpecification<NodeI>

export class IsValidCreateDto implements IsSpecification<NodeCreate> {
  isSatisfiedBy(data: NodeCreate): boolean {
    const { type } = data

    const validType = nodeTypeLiterals.includes(type)

    return validType
  }
}

/**
 * Checks whether our data is valid for creating a mongoose model
 */
export class IsValidCreateDtoModel implements IsSpecification<NodeI> {
  isSatisfiedBy(data: NodeCreate): boolean {
    const { type } = data

    const validType = nodeTypeLiterals.includes(type)

    return validType
  }
}
