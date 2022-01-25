import { isUser, IType, IUser, TypeSchema } from '@codelab/shared/abstract/core'

export const createType = <TType extends IType>(
  input: TType,
  currentUser?: IUser,
): TType => {
  return TypeSchema.parse({
    ...input,
    id: input.id ?? '',
    /** We use owner field to determine policy */
    owner: isUser(currentUser) ? { id: currentUser.id } : undefined,
  } as IType) as TType
}
