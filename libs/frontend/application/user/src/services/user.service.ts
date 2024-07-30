import type {
  BuilderWidth,
  BuilderWidthBreakPoint,
  IUserPreference,
} from '@codelab/frontend/abstract/application'
import { userApi } from '@codelab/frontend-domain-user/repositories'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { UserWhere } from '@codelab/shared/abstract/types'
import { atom, useAtom } from 'jotai'
import set from 'lodash/set'
import { useCallback } from 'react'
import { useUser } from './user.hook'

const CODELAB_STORAGE_KEY = 'codelab-preferences'
const DEFAULT_PREFERENCES = { apps: {}, explorerExpandedNodes: {} }
const preferencesAtom = atom<IUserPreference>(DEFAULT_PREFERENCES)

export const useUserService = () => {
  const user = useUser()
  const [preferences, setPreferences] = useAtom(preferencesAtom)

  const getOne = useCallback(async (where: UserWhere) => {
    const { users } = await userApi.GetUsers({ where })

    return users[0]
  }, [])

  const saveUser = useCallback(async (data: Auth0IdToken) => {
    return Promise.resolve(undefined)
    // return restWebClient.post('/user/save', data)
  }, [])

  const setElementTreeExpandedKeys = useCallback(
    (containerId: string, expandedKeys: Array<string>) => {
      setPreferences((prev) => {
        const newPreferences = { ...prev }

        set(
          newPreferences,
          `explorerExpandedNodes.${containerId}`,
          expandedKeys,
        )

        return newPreferences
      })
      savePreferences()
    },
    [setPreferences],
  )

  const setSelectedBuilderBreakpoint = useCallback(
    (containerId: string, breakpoint: BuilderWidthBreakPoint) => {
      setPreferences((prev) => {
        const newPreferences = { ...prev }

        set(
          newPreferences,
          `apps.${containerId}.selectedBuilderBreakpoint`,
          breakpoint,
        )

        return newPreferences
      })
      savePreferences()
    },
    [setPreferences],
  )

  const setSelectedBuilderWidth = useCallback(
    (containerId: string, width: BuilderWidth) => {
      setPreferences((prev) => {
        const newPreferences = { ...prev }

        set(newPreferences, `apps.${containerId}.selectedBuilderWidth`, width)

        return newPreferences
      })
      savePreferences()
    },
    [setPreferences],
  )

  const fetchPreferences = useCallback(() => {
    if (typeof window === 'undefined') {
      // SSR not supported for client preferences service
      return
    }

    const storedPreferences = localStorage.getItem(CODELAB_STORAGE_KEY)

    setPreferences(
      storedPreferences ? JSON.parse(storedPreferences) : DEFAULT_PREFERENCES,
    )
  }, [setPreferences])

  const savePreferences = useCallback(() => {
    localStorage.setItem(CODELAB_STORAGE_KEY, JSON.stringify(preferences))
  }, [preferences])

  return {
    fetchPreferences,
    getOne,
    preferences,
    savePreferences,
    saveUser,
    setElementTreeExpandedKeys,
    setSelectedBuilderBreakpoint,
    setSelectedBuilderWidth,
    user,
  }
}
