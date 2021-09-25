/* eslint-disable react-hooks/rules-of-hooks */

import { RecoilStateHookConfigFragment } from '@codelab/frontend/modules/element'
import { PersistenceType } from '@codelab/shared/codegen/graphql'
import { capitalizeFirstLetter } from '@codelab/shared/utils'
import { useCallback, useEffect, useState } from 'react'
import { atomFamily, useRecoilState } from 'recoil'
import { HookHandler } from '../HookHandler'

export const stateAtomFamily = atomFamily<any, any>({
  key: 'stateElement',
  default: undefined,
})

export const useRecoilStateHook: HookHandler = (
  config: RecoilStateHookConfigFragment,
) => {
  if (!config.stateKey) {
    return undefined
  }

  // used to set the default value on first render
  const [isInitialized, setIsInitialized] = useState(false)
  const storageKey = `codelab_state_${config.stateKey}`

  const [state, setState] = useRecoilState<any>(
    stateAtomFamily(config.stateKey),
  )

  // Stores the value in the configured storage
  const store = useCallback(
    (value: any) => {
      if (
        config.persisted === PersistenceType.SessionStorage ||
        config.persisted === PersistenceType.LocalStorage
      ) {
        try {
          const storage =
            config.persisted === PersistenceType.LocalStorage
              ? localStorage
              : sessionStorage

          console.log(JSON.stringify(value))
          storage.setItem(storageKey, JSON.stringify(value))
        } catch (e) {
          console.error(
            'Error while persisting state',
            config.stateKey,
            config.persisted,
            e,
          )
        }
      }
    },
    [config.persisted, storageKey],
  )

  useEffect(() => {
    if (!isInitialized) {
      // Set the default value on mount
      let defaultValue: any | null

      if (
        config.persisted === PersistenceType.SessionStorage ||
        config.persisted === PersistenceType.LocalStorage
      ) {
        const storage =
          config.persisted === PersistenceType.LocalStorage
            ? localStorage
            : sessionStorage

        try {
          const item = storage.getItem(storageKey)
          defaultValue = item ? JSON.parse(item) : null
        } catch (e) {
          console.error(
            'Error while loading persisted state value',
            config.stateKey,
            config.persisted,
            e,
          )
        }
      }

      if (!defaultValue && typeof config.defaultValue !== 'undefined') {
        try {
          if (config.defaultValue) {
            defaultValue = JSON.parse(config.defaultValue)
          } else {
            defaultValue = config.defaultValue
          }
        } catch (e) {
          defaultValue = config.defaultValue
        }
      }

      setState((s: any) => {
        if (s) {
          return s
        }

        return defaultValue
      })

      setIsInitialized(true)
    }
  }, [setState])

  // Store the vlaue whenever it changes, that way we need to set the storage config on only 1 hook
  useEffect(() => {
    store(state)
  }, [store, state])

  return {
    [config.stateKey]: state,
    [`set${capitalizeFirstLetter(config.stateKey)}`]: setState,
  }
}
