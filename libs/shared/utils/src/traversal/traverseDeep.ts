import { IPropData } from '@codelab/shared/abstract/core'
import { MaybeArray, Nullish } from '@codelab/shared/abstract/types'
import { isArray } from 'lodash'

export type IInput = IPropData
export type IOutput = MaybeArray<IInput>
export type RefSet = Nullish<WeakSet<IOutput>>

export type ReplaceFn = (
  value: IInput,
  key: string,
  innerObj: IOutput,
) => IOutput

export type TraverseFn = (
  obj: IInput,
  replaceFn: ReplaceFn,
  _refs: RefSet,
) => IOutput

const skipTraversal = (obj: IInput | IOutput, _refs: RefSet) =>
  /**
   * skip in one of many cases
   *    ${1} is not an object |  ${2} circular objects  | ${3} is already visited
   * some circular objects we know they exists
   *    ${2.a} isReactObject | ${2.b} isMobxModel |  ${2.c} isHtmlElement
   * */
  !obj ||
  typeof obj !== 'object' ||
  Boolean((obj as IInput)['$$typeof']) ||
  Boolean((obj as IInput)['$modelType']) ||
  obj instanceof HTMLElement ||
  _refs?.has(obj)

export const traverseDeep = (
  obj: IOutput,
  traverse: TraverseFn,
  replace: ReplaceFn,
  _refs?: RefSet,
): IOutput => {
  if (!_refs) {
    _refs = new WeakSet()
  }

  if (skipTraversal(obj, _refs)) {
    return obj
  }

  _refs.add(obj)

  if (isArray(obj)) {
    return obj.map((e) => traverse(e, replace, _refs))
  }

  obj = replace(obj, '', obj)

  if (skipTraversal(obj, new WeakSet())) {
    return obj
  }

  if (isArray(obj)) {
    return obj.map((e) => traverse(e, replace, _refs))
  }

  return traverse(obj, replace, _refs)
}
