/* eslint-disable react-hooks/rules-of-hooks */
import {
  IRecoilStateHookConfig,
  PersistenceType,
} from '@codelab/shared/abstract/core'
import { capitalizeFirstLetter } from '@codelab/shared/utils'
import { useCallback, useEffect, useState } from 'react'
import { atomFamily, useRecoilState } from 'recoil'
import { HookHandler } from '../HookHandler'

export const stateAtomFamily = atomFamily<any, any>({
  key: 'stateElement',
  default: undefined,
})

export const useRecoilStateHook: HookHandler = (
  config: IRecoilStateHookConfig,
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

  const getStorage = (): Storage =>
    config.persisted === PersistenceType.LocalStorage
      ? localStorage
      : sessionStorage

  const isPersisted = (): boolean =>
    [PersistenceType.SessionStorage, PersistenceType.LocalStorage].includes(
      config.persisted,
    )

  const logError = (message: string, e: any): void => {
    console.error(message, config.stateKey, config.persisted, e)
  }

  // Stores the value in the configured storage
  const store = useCallback(
    (value: any) => {
      if (!isPersisted()) {
        return
      }

      try {
        console.log(JSON.stringify(value))
        getStorage().setItem(storageKey, JSON.stringify(value))
      } catch (e) {
        logError('Error while persisting state', e)
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config.persisted, storageKey],
  )

  useEffect(() => {
    if (isInitialized) {
      return
    }

    // Set the default value on mount
    let defaultValue: any | null

    if (isPersisted()) {
      try {
        const item = getStorage().getItem(storageKey)
        defaultValue = item ? JSON.parse(item) : null
      } catch (e) {
        logError('Error while loading persisted state value', e)
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

    setState((s: any) => s || defaultValue)
    setIsInitialized(true)
  }, [setState])

  // Store the vlaue whenever it changes, that way we need to set the storage config on only 1 hook
  useEffect(() => {
    store(state)
  }, [store, state])

  const output = {
    [config.stateKey]: state,
    [`set${capitalizeFirstLetter(config.stateKey)}`]: setState,
  }

  return { recoilStateHook: output }
}
