import type {
  IActionDto,
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/shared-abstract-core'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import {
  type IActionCreateRoute,
  type IActionService,
  type IActionUpdateRoute,
  IRouteType,
  RoutePaths,
} from '@codelab/frontend-abstract-application'
import {
  type IActionModel,
  type IActionWhere,
} from '@codelab/frontend-abstract-domain'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { actionRepository } from '@codelab/frontend-domain-store/repositories'
import { useDomainStoreHydrator } from '@codelab/frontend-infra-context'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx-context'
import { IActionKind } from '@codelab/shared-abstract-core'
import { actionFactory } from '@codelab/shared-domain-module-action'
import { Validator } from '@codelab/shared-infra-typebox'
import { v4 } from 'uuid'

export const useActionService = (): IActionService => {
  const { actionDomainService } = useDomainStore()
  const { builderService } = useApplicationStore()
  const hydrate = useDomainStoreHydrator()

  const cloneAction = async (action: IActionModel, storeId: string) => {
    return await recursiveClone(action, storeId)
  }

  const create = async (data: ICreateActionData) => {
    const action = actionFactory.mapDataToDto(data)

    hydrate({ actionsDto: [action] })

    return await actionRepository.add(action, {
      revalidateTags: [CACHE_TAGS.Action.list()],
    })
  }

  const removeMany = async (actions: Array<IActionModel>) => {
    for (const action of actions) {
      const { id } = action
      const { runtimeStore } = builderService.selectedNode?.current ?? {}

      const foundRuntimeAction = runtimeStore?.runtimeActionsList.find(
        (runtimeAction) => runtimeAction.action.id === id,
      )

      actionDomainService.actions.delete(id)

      if (runtimeStore && foundRuntimeAction) {
        runtimeStore.runtimeActions.delete(foundRuntimeAction.id)
      }
    }

    return await actionRepository.delete(actions, {
      revalidateTags: [CACHE_TAGS.Action.list()],
    })
  }

  const getAll = async (where: IActionWhere) => {
    const { items: actionFragments } = await actionRepository.find(where)

    return actionDomainService.load(actionFragments)
  }

  const getOne = async (id: string) => {
    return actionDomainService.actions.has(id)
      ? actionDomainService.actions.get(id)
      : (await getAll({ id }))[0]
  }

  const update = async (data: IUpdateActionData) => {
    const action = actionDomainService.actions.get(data.id)

    Validator.assertsDefined(action)

    const actionDto = actionFactory.mapDataToDto(data)

    hydrate({ actionsDto: [actionDto] })

    await actionRepository.update({ id: action.id }, actionDto, {
      revalidateTags: [CACHE_TAGS.Action.list()],
    })

    return action
  }

  const recursiveClone = async (action: IActionModel, storeId: string) => {
    const actionDto = action.toJson

    let newActionDto: IActionDto = {
      ...actionDto,
      id: v4(),
      store: { id: storeId },
    }

    if (action.type === IActionKind.ApiAction) {
      if (action.successAction?.current) {
        const successActionCloned = await recursiveClone(
          action.successAction.current,
          storeId,
        )

        newActionDto = {
          ...newActionDto,
          successAction: { id: successActionCloned.id },
        } as IActionDto
      }

      if (action.errorAction?.current) {
        const errorActionCloned = await recursiveClone(
          action.errorAction.current,
          storeId,
        )

        newActionDto = {
          ...newActionDto,
          errorAction: { id: errorActionCloned.id },
        } as IActionDto
      }
    }

    const newAction = actionDomainService.hydrate(newActionDto)

    return await actionRepository.add(newActionDto, {
      revalidateTags: [CACHE_TAGS.Action.list()],
    })
  }

  const createPopover = {
    close: (router: AppRouterInstance) => {
      router.back()
    },
    open: (router: AppRouterInstance, context: IActionCreateRoute) => {
      const url =
        context.type === IRouteType.Page
          ? RoutePaths.Page.builderAction.create(context)
          : RoutePaths.Component.builderAction.create(context)

      router.push(url)
    },
  }

  const updatePopover = {
    close: (router: AppRouterInstance) => {
      router.back()
    },
    open: (router: AppRouterInstance, context: IActionUpdateRoute) => {
      const url =
        context.type === IRouteType.Page
          ? RoutePaths.Page.builderAction.update(context)
          : RoutePaths.Component.builderAction.update(context)

      router.push(url)
    },
  }

  const deletePopover = {
    close: (router: AppRouterInstance) => {
      router.back()
    },
    open: (router: AppRouterInstance, context: IActionUpdateRoute) => {
      const url =
        context.type === IRouteType.Page
          ? RoutePaths.Page.builderAction.delete(context)
          : RoutePaths.Component.builderAction.delete(context)

      router.push(url)
    },
  }

  return {
    cloneAction,
    create,
    createPopover,
    deletePopover,
    getAll,
    getOne,
    removeMany,
    update,
    updatePopover,
  }
}
