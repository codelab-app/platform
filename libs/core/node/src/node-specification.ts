import {
  NodeCreateDto,
  NodeDtoI,
  nodeTypeLiterals,
} from '@codelab/shared/interface/node'

export interface IsSpecification<T = any> {
  isSatisfiedBy(data: T): boolean
}

// Alias for input data specification
export type IsInputSpecification = IsSpecification<NodeDtoI>

export class IsValidCreateDto implements IsSpecification<NodeCreateDto> {
  isSatisfiedBy(data: NodeCreateDto): boolean {
    const { type } = data

    const validType = nodeTypeLiterals.includes(type)

    return validType
  }
}

/**
 * Checks whether our data is valid for creating a mongoose model
 */
export class IsValidCreateDtoModel implements IsSpecification<NodeDtoI> {
  isSatisfiedBy(data: NodeCreateDto): boolean {
    const { type } = data

    const validType = nodeTypeLiterals.includes(type)

    return validType
  }
}
