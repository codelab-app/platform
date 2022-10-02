import { IAtomType } from '@codelab/shared/abstract/core'

export const hookTypes = new Set([
  IAtomType.HookGraphqlQuery,
  IAtomType.HookGraphqlMutation,
  IAtomType.HookQueryPage,
  IAtomType.HookQueryPages,
  IAtomType.HookRecoilState,
  IAtomType.HookQueryConfig,
  IAtomType.HookQueryLambda,
  IAtomType.HookRouter,
])

export const filterNotHookType = (atom: IAtomType): atom is IAtomType =>
  !hookTypes.has(atom as IAtomType)

export const isAtomTypeForTest = (atom: IAtomType) =>
  [IAtomType.AntDesignButton, IAtomType.AntDesignCard].includes(atom)
