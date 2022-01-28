import {
  isAdmin,
  IType,
  IUser,
  TypeSchema,
} from '@codelab/shared/abstract/core'

export const createType = <TType extends IType>(
  input: TType,
  currentUser?: IUser,
): TType => {
  return TypeSchema.parse({
    ...input,
    id: input.id ?? '',
    /** We use owner field to determine policy */
    owner:
      isAdmin(currentUser) || !currentUser ? undefined : { id: currentUser.id },
  } as IType) as TType
}
