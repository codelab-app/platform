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
import { NextRouter } from 'next/router'

export const mobxStateKeyTemplate: MobxStateKeyTemplate = {
  start: STATE_PATH_TEMPLATE_START,
  end: STATE_PATH_TEMPLATE_END,
}

export const createMobxState = (
  rootStore: Maybe<IStore> | null,
  apps: Array<IApp>,
  pages: Array<IPage>,
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
      .filter((page) => page.app.id === app.id)
      .map((page) => ({
        id: page.id,
        name: page.name,
        appId: page.app.id,
        rootElementId: page.rootElement.id,
        providerElementId: page.providerElement.id,
      })),
  }))

  // we inject here state globals
  const stateGlobals = {
    router,
    apps: pagesByApps,
  }

  return rootStore.toMobxObservable()
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

  if (typeof str !== 'string') {
    return false
  }

  return str.includes(start) && str.includes(end)
}

export const parseTemplateExpressions = (str: string) => {
  if (!matchesTemplate(str)) {
    return undefined
  }

  return str.match(STATE_PATH_TEMPLATE_REGEX)
}

const expressionFnFactory = (expression: string, globalState: any): any => {
  // eslint-disable-next-line no-new-func
  const fn = new Function(`with(this){ return ${expression} }`)

  if (!globalState) {
    return undefined
  }

  return fn.call(
    new Proxy(
      {},
      {
        has() {
          return true
        },
        get(target, key) {
          const value = globalState[key]

          if (typeof value === 'function') {
            return value.bind(globalState)
          }

          return value
        },
      },
    ),
  )
}

export const evaluateTemplateExpression = (value: string, globalState: any) => {
  const { start, end } = mobxStateKeyTemplate

  if (!value) {
    return value
  }

  // here value is in the form of {{ someExpression }}
  const expression = value
    .trim()
    .substring(start.length, value.length - end.length)
    .trim()

  try {
    return expressionFnFactory(expression, globalState)
  } catch (e) {
    console.log('Error while parsing expression: ', e)

    return value
  }
}

export const getState = (value: string, globalState: unknown) => {
  const templateExpressions = parseTemplateExpressions(value)

  if (!templateExpressions) {
    return value
  }

  for (const templateExpression of templateExpressions) {
    const evaluated = evaluateTemplateExpression(
      templateExpression,
      globalState,
    )

    // event handlers
    if (typeof evaluated === 'function') {
      return evaluated
    }

    // if there is nothing else in the whole vlaue just return the evaluated value
    // e.g. '{{ someExpression }}', not 'some text {{ someExpression }}'
    if (templateExpression === value && typeof evaluated !== 'string') {
      return evaluated
    }

    value = value?.replace(templateExpression, evaluated)
  }

  return value
}
