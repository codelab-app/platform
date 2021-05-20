import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export type StringExtractionFn<TInput> = (
  input: TInput,
) => string | undefined | Promise<string | undefined>

export const getGqlContextRequestAddon = () => (context: ExecutionContext) => {
  return GqlExecutionContext.create(context).getContext().req
}

export const isOwnerAddOn =
  <TInput>(
    extractOwnerIdFromArgs: StringExtractionFn<TInput>,
    failOnUndefinedOwner = true,
  ) =>
  async (context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const ownerIdFromInput = await extractOwnerIdFromArgs(ctx.getArgs())

    if (!ownerIdFromInput) {
      return !failOnUndefinedOwner
    }

    const { req } = ctx.getContext()
    const loggedInUserId = req.user.sub

    return ownerIdFromInput === loggedInUserId
  }
