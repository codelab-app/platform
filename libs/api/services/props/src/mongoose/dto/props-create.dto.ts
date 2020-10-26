import { NodeType } from '@codelab/api/services/node'

export interface PropsCreateDto {
  type: NodeType
  values: object
}
