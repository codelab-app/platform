import { Lambda } from '@codelab/codegen/hasura'

export type LambdaInput = Omit<Lambda, 'id'>
