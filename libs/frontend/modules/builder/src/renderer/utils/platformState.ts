import {
  STATE_PATH_TEMPLATE_END,
  STATE_PATH_TEMPLATE_START,
} from '@codelab/frontend/abstract/core'
import {
  IStateTreeNode,
  MobxStateKeyTemplate,
} from '@codelab/shared/abstract/core'
import { App } from '@codelab/frontend/modules/app'
import { Page } from '@codelab/frontend/modules/page'
import { Store } from '@codelab/frontend/modules/store'
import { Nullish } from '@codelab/shared/abstract/types'
import { get } from 'lodash'
import { NextRouter } from 'next/router'

export const mobxStateKeyTemplate: MobxStateKeyTemplate = {
  start: STATE_PATH_TEMPLATE_START,
  end: STATE_PATH_TEMPLATE_END,
}

export const createMobxState = (
  rootStore: Nullish<Store>,
  apps: Array<App>,
  pages: Array<Page>,
  router: NextRouter,
) => {
  if (!rootStore) {
    return null
  }

  // group pages by apps (easier to read in the state tree)
  const pagesByApps = apps.map((app) => ({
    name: app.name,
    id: app.id,
    ownerId: app.ownerId,
    rootProviderElement: { id: app.id },
    store: { id: app.store?.id },
    pages: pages
      .filter((page) => page.appId === app.id)
      .map((page) => ({
        id: page.id,
        name: page.name,
        appId: page.appId,
        rootElementId: page.rootElementId,
        providerElementId: page.providerElementId,
      })),
  }))

  // we inject here state globals
  const stateGlobals = {
    router,
    apps: pagesByApps,
  }

  return rootStore.toMobxObservable(stateGlobals)
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
