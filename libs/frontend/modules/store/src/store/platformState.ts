import {
  STATE_PATH_TEMPLATE_END,
  STATE_PATH_TEMPLATE_REGEX,
  STATE_PATH_TEMPLATE_START,
} from '@codelab/frontend/abstract/core'
import {
  IApp,
  IPage,
  IStateTreeNode,
  IStore,
  MobxStateKeyTemplate,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { get, isString, merge } from 'lodash'
import { NextRouter } from 'next/router'

export const mobxStateKeyTemplate: MobxStateKeyTemplate = {
  start: STATE_PATH_TEMPLATE_START,
  end: STATE_PATH_TEMPLATE_END,
}

export const createMobxState = (
  appStore: Maybe<IStore> | null,
  apps: Array<IApp>,
  pages: Array<IPage>,
  router?: NextRouter,
) => {
  if (!appStore) {
    return null
  }

  // group pages by apps (easier to read in the state tree)
  const appsState = apps
    .map((app) => ({
      [app.name]: {
        name: app.name,
        id: app.id,
        slug: app.slug,
        ownerId: app.ownerId,
        rootElement: { id: app.id },
        store: { id: app.store?.id },
        pages: pages
          .filter((page) => page.app.id === app.id)
          .map((page) => ({
            [page.slug]: {
              id: page.id,
              name: page.name,
              slug: page.slug,
              appId: page.app.id,
              rootElementId: page.rootElement.id,
              url: `${router?.basePath}/apps/${app.id}/pages/${page.id}`,
            },
          }))
          .reduce(merge, {}),
      },
    }))
    .reduce(merge, {})

  // we inject here state globals
  const stateGlobals = {
    router,
    apps: appsState,
  }

  console.log(stateGlobals)

  return appStore.toMobxObservable(stateGlobals)
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

  return isString(str) && str.includes(start) && str.includes(end)
}

const stripExpression = (expression: string) =>
  expression.substring(2, expression.length - 2)

export const getState = (value: string, state: unknown): any => {
  if (!matchesTemplate(value)) {
    return value
  }

  /**
   * action will have the following format {{actionName}}
   */
  const possibleAction = get(state, stripExpression(value), {})

  if (possibleAction.isAction) {
    return possibleAction.run
  }

  /**
   * state data will format "[text1]? {{expression1}} [text2]? {{expression2}}..."
   * therefore we replace all expressions
   */
  return value.replace(STATE_PATH_TEMPLATE_REGEX, (expression) => {
    try {
      // eslint-disable-next-line no-new-func
      return new Function(`return ${stripExpression(expression)}`).call(state)
    } catch (error) {
      console.log(error)

      return expression
    }
  })
}
