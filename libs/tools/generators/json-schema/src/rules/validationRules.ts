import { VertexType } from '@prisma/client'

type ValidationRulesMap = {
  [vertexType in VertexType]?: ValidationRules
}

type ValidationRules = {
  /**
   * Allowed children
   */
  allowedChildren: Array<VertexType>
}

export const validationRules: ValidationRulesMap = {
  [VertexType.React_RGL_ResponsiveContainer]: {
    allowedChildren: [VertexType.React_RGL_Item],
  },
  [VertexType.React_Card]: {
    allowedChildren: [VertexType.React_Card_Grid, VertexType.React_Card_Meta],
  },
}
