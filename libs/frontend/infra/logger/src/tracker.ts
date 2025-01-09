'use client'

import type { Nullish, ObjectLike } from '@codelab/shared/abstract/types'
import type { AnyModel } from 'mobx-keystone'

import { diff } from 'deep-object-diff'
import { getSnapshot, isModel } from 'mobx-keystone'
import { useEffect, useRef } from 'react'
import { useCustomCompareEffect } from 'react-use'
import { isDeepEqual } from 'remeda'

import { logger } from './logger'

// Move renderCountMap outside the hook to make it static
const renderCountMap: Record<string, number> = {}

/**
 * Gets a plain object representation of a model or object
 */
const getObjectOrSnapshot = (target: Nullish<AnyModel | ObjectLike>) => {
  return isModel(target) ? getSnapshot(target) : target
}

/**
 * Creates a hook that tracks changes between renders for mobx-keystone objects
 *
 * Make sure not to use after a conditional in component due to `useRef` usage internally
 */
const useModelDiff = (
  context: string,
  target: Nullish<AnyModel | ObjectLike>,
) => {
  const prevModel = useRef<ObjectLike>({})

  useEffect(() => {
    const targetObject = getObjectOrSnapshot(target)
    const diffResult = diff(prevModel.current, targetObject)

    renderCountMap[context] = (renderCountMap[context] || 0) + 1

    logger.debug(`Comparing diff (render #${renderCountMap[context]})`, {
      context,
      data: {
        diffResult,
        previous: prevModel.current,
      },
    })

    prevModel.current = targetObject
  })
}

/**
 * Hook that automatically tracks and logs the number of times a component renders
 */
const useRenderedCount = (componentName: string) => {
  const name = useRef(componentName)

  useEffect(() => {
    renderCountMap[name.current] = (renderCountMap[name.current] || 0) + 1

    logger.debug('Component rendered', {
      context: name.current,
      data: {
        renderCount: renderCountMap[name.current],
      },
    })
  })
}

const useEvent = ({
  componentName,
  event,
}: {
  event: string
  componentName: string
}) => {
  logger.debug(`Event '${event}' triggered for component '${componentName}'`)
}

/**
 * Hook that tracks if object references have changed between renders
 */
const useReferenceChange = (
  context: string,
  targets: Array<{ name: string; value: unknown }>,
) => {
  const prevRefs = useRef<Array<{ name: string; value: unknown }>>(targets)

  useEffect(() => {
    const changes = targets.map((target, index) => {
      const prev = prevRefs.current[index]
      const hasChanged = prev?.value !== target.value

      return {
        hasChanged,
        name: target.name,
      }
    })

    const hasAnyChange = changes.some((change) => change.hasChanged)

    if (hasAnyChange) {
      logger.debug('References changed', {
        context,
        data: {
          changes: changes.filter((change) => change.hasChanged),
        },
      })
    }

    prevRefs.current = targets
  })
}

export const tracker = {
  useEvent,
  useModelDiff,
  useReferenceChange,
  useRenderedCount,
}
