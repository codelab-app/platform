import { Lambda } from '@codelab/hasura';

export type LambdaInput = Omit<Lambda, 'id'>
