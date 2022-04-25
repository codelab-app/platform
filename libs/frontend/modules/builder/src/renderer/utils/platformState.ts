import {
  STATE_PATH_TEMPLATE_END,
  STATE_PATH_TEMPLATE_START,
} from '@codelab/frontend/abstract/core'
import { get } from 'lodash'

export interface MobxStateKeyTemplate {
  start: string
  end: string
}

export interface IStateTreeNode {
  name: string
  key: string
  path: string
  type: string
  children: Array<IStateTreeNode>
  useModal: boolean
  content: any
}

export const mobxStateKeyTemplate: MobxStateKeyTemplate = {
  start: STATE_PATH_TEMPLATE_START,
  end: STATE_PATH_TEMPLATE_END,
}

export const toAntd = (
  state: any,
  parentPath: string,
): Array<IStateTreeNode> => {
  return Object.getOwnPropertyNames(state || {}).map((key) => {
    const value = state[key]
    const typeOfValue = typeof value
    const path = parentPath ? `${parentPath}.${key}` : key
    const useModal = key === '$data' || key === '$error'

    return {
      name: key,
      key: path,
      useModal,
      path,
      type: typeOfValue,
      content: value,
      children:
        !useModal && value && typeOfValue === 'object'
          ? toAntd(value, path)
          : [],
    }
  })
}

export const matchesTemplate = (str: string) => {
  const { start, end } = mobxStateKeyTemplate

  return str.startsWith(start) && str.endsWith(end)
}

export const parsePath = (str: string) => {
  const { start, end } = mobxStateKeyTemplate

  return matchesTemplate(str)
    ? str.substring(start.length, str.length - end.length).trim()
    : undefined
}

export const getState = (path: string, globalState: unknown) => {
  const parsedPath = parsePath(path)

  if (!parsedPath) {
    return path
  }

  const value = get(globalState, parsedPath)

  console.info(`${parsedPath} : ${value}`)

  return value
}
