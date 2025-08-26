import type { Nullable, ObjectLike } from '@codelab/shared-abstract-types'
import type { Options } from 'sucrase'

export interface IExpressionTransformer {
  context: Nullable<ObjectLike>
  transform: Nullable<
    (code: string, options: Options) => { code: string | null }
  >
  init(): Promise<void>
  transpileAndEvaluateExpression(
    expression: string,
    context?: ObjectLike,
  ): unknown
}
