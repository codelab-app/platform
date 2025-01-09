'use client'

import type { Nullish, ObjectLike } from '@codelab/shared/abstract/types'
import type { AnyModel } from 'mobx-keystone'

import { diff } from 'deep-object-diff'
import { getSnapshot, isModel } from 'mobx-keystone'
import { useEffect, useRef } from 'react'
import { isDeepEqual, isEmpty } from 'remeda'

import { logger } from './logger'

// Move renderCountMap and prevPropsMap outside the hooks to make them static
const renderCountMap: Record<string, number> = {}
const prevPropsMap: Record<string, ObjectLike> = {}

/**
 * Gets a plain object representation of a model or object
 */
const getObjectOrSnapshot = (target: Nullish<AnyModel | ObjectLike>) => {
  return isModel(target) ? getSnapshot(target) : target
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

/**
 * Creates a hook that tracks changes between renders for mobx-keystone objects
 *
 * Make sure not to use after a conditional in component due to `useRef` usage internally
 */
const useModelDiff = (
  context: string,
  target: Nullish<AnyModel | ObjectLike>,
) => {
  const prevRef = useRef(target)

  useEffect(() => {
    const targetObject = getObjectOrSnapshot(target)
    const prevObject = getObjectOrSnapshot(prevRef.current)
    const diffResult = diff(prevObject, targetObject)
    const refChanged = prevRef.current !== target
    const hasChanges = Object.keys(diffResult).length > 0

    renderCountMap[context] = (renderCountMap[context] || 0) + 1

    logger.debug(`Comparing diff (#${renderCountMap[context]})`, {
      context,
      data: {
        // Only include current/previous if there are actual changes
        ...(hasChanges && {
          current: targetObject,
          previous: prevObject,
        }),
        diffResult,
        refChanged,
      },
    })

    prevRef.current = target
  })
}

/**
 * Hook that compares props between renders and logs differences
 */
const usePropsDiff = <T extends ObjectLike>(
  componentName: string,
  props: T,
) => {
  // Store previous props
  const prevPropsRef = useRef<T>(props)

  useEffect(() => {
    const prevProps = prevPropsRef.current
    const currentProps = props

    // Compare them deeply for changes
    if (!isDeepEqual(prevProps, currentProps)) {
      const referenceChangedKeys: Array<string> = []
      const diffResult = diff(prevProps, currentProps)

      const allKeys = new Set([
        ...Object.keys(currentProps),
        ...Object.keys(prevProps),
      ])

      allKeys.forEach((key) => {
        // Check reference equality
        if (prevProps[key] !== currentProps[key]) {
          referenceChangedKeys.push(key)
        }
      })

      logger.debug('Props changed', {
        context: componentName,
        data: {
          referenceChangedKeys,
          valueChangedKeys: diffResult,
        },
      })
    }

    prevPropsRef.current = currentProps
  })
}

/**
 * Hook for basic event logging
 */
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

/**
 * Creates a hook that tracks changes between renders for mobx-keystone objects
 *
 * Make sure not to use after a conditional in component due to `useRef` usage internally
 */
const useModelDiff = (
  context: string,
  target: Nullish<AnyModel | ObjectLike>,
) => {
  const prevRef = useRef(target)

  useEffect(() => {
    const targetObject = getObjectOrSnapshot(target)
    const prevObject = getObjectOrSnapshot(prevRef.current)
    const diffResult = diff(prevObject, targetObject)
    const refChanged = prevRef.current !== target
    const hasChanges = Object.keys(diffResult).length > 0

    renderCountMap[context] = (renderCountMap[context] || 0) + 1

    logger.debug(`Comparing diff (#${renderCountMap[context]})`, {
      context,
      data: {
        // Only include current/previous if there are actual changes
        ...(hasChanges && {
          current: targetObject,
          previous: prevObject,
        }),
        diffResult,
        refChanged,
      },
    })

    prevRef.current = target
  })
}

/**
 * Hook that compares props between renders and logs differences
 */
const usePropsDiff = <T extends ObjectLike>(
  componentName: string,
  props: T,
) => {
  // Store previous props
  const prevPropsRef = useRef<T>(props)

  useEffect(() => {
    const prevProps = prevPropsRef.current
    const currentProps = props

    // Compare them deeply for changes
    if (!isDeepEqual(prevProps, currentProps)) {
      const referenceChangedKeys: Array<string> = []
      const diffResult = diff(prevProps, currentProps)

      const allKeys = new Set([
        ...Object.keys(currentProps),
        ...Object.keys(prevProps),
      ])

      allKeys.forEach((key) => {
        // Check reference equality
        if (prevProps[key] !== currentProps[key]) {
          referenceChangedKeys.push(key)
        }
      })

      logger.debug('Props changed', {
        context: componentName,
        data: {
          referenceChangedKeys,
          valueChangedKeys: diffResult,
        },
      })
    }

    prevPropsRef.current = currentProps
  })
}

/**
 * Hook for basic event logging
 */
const useEvent = ({
  componentName,
  event,
}: {
  event: string
  componentName: string
}) => {
  logger.debug(`Event '${event}' triggered for component '${componentName}'`)
}

export const tracker = {
  useEvent,
  useModelDiff,
  usePropsDiff,
  useReferenceChange,
  useRenderedCount,
}
