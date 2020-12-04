import { ResolverFn } from '@codelab/state/apollo'

export type GraphqlRequest<
  TResult = any,
  TParent = any,
  TContext = any,
  TArgs = any
> = ResolverFn<TResult, TParent, TContext, TArgs>

export type GraphqlResponse = any

export abstract class GraphqlController {
  protected abstract executeImpl(req: GraphqlRequest): Promise<void | any>

  public async execute(req: GraphqlRequest): Promise<void> {
    await this.executeImpl(req)
  }
}
