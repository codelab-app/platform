import { isArray } from 'lodash'
import { IInput, IOutput, RefSet, TransformFn, TraverseFn } from './abstract'

const isReactNode = (obj: IInput) => Boolean(obj['$$typeof'])
const isMobxModel = (obj: IInput) => Boolean(obj['$modelType'])
const isHtmlNode = (obj: IInput) => obj instanceof HTMLElement

const skipTraversal = (obj: IInput | IOutput, _refs: RefSet) =>
  /**
   * skip in one of many cases
   *    ${1} is not an object |  ${2} circular objects  | ${3} is already visited
   * some circular objects we know they exists
   *    ${2.a} isReactObject | ${2.b} isMobxModel |  ${2.c} isHtmlElement
   * */
  !obj ||
  typeof obj !== 'object' ||
  isReactNode(obj) ||
  isMobxModel(obj) ||
  isHtmlNode(obj) ||
  _refs?.has(obj)

export const traverseDeep = (
  obj: IOutput,
  traverse: TraverseFn,
  transform: TransformFn,
  _refs: RefSet = new WeakSet(),
): IOutput => {
  if (isArray(obj)) {
    return obj.map((e) => traverseDeep(e, traverse, transform, _refs))
  }

  // provided object can't be traversed
  if (skipTraversal(obj, _refs)) {
    return obj
  }

  // register object to detect circular objects
  _refs.add(obj)

  // apply transformment to object
  obj = transform(obj, '', obj)

  // object transformment is an array
  if (isArray(obj)) {
    return traverseDeep(obj, traverse, transform, _refs)
  }

  /**
   * check if object transformment can be traversed
   *
   * when the transform function doesn't change the object
   * we don't want to skip traversing therefore
   * we pass an empty WeakSet
   *
   */
  return skipTraversal(obj, new WeakSet())
    ? obj
    : traverse(obj, transform, _refs)
}
