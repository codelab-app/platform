'use client'

import type {
  SupportedPaginationDto,
  SupportedPaginationModel,
} from '@codelab/frontend/abstract/application'
import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'
import type {
  IAtomDto,
  IComponentDto,
  IRef,
  ITagDto,
  ITypeDto,
} from '@codelab/shared/abstract/core'

import { Model, UrlParams } from '@codelab/frontend/abstract/types'
import { parseSearchParamsPageProps } from '@codelab/frontend-application-shared-store/router'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { type ReactNode, useEffect, useState } from 'react'
import { useCustomCompareEffect } from 'react-use'
import { isDeepEqual, isDefined } from 'remeda'

interface ApplicationStoreHydratorProps {
  children: ReactNode
  /**
   * Need to disable fallback in some cases. i.e. after update popover submission, the isHydrated will be false, even though we don't need to hydrate, since update optimistic cache.
   *
   * This will show an unnecessary loading state for data that is already updated
   *
   * The initial motivation is to block children from rendering until data is loaded, perhaps we can push this logic to a callback function instead.
   *
   * In that case we'll need some override to disable loader
   */
  fallback?: ReactNode
  pagination:
    | {
        type: Model.Atom
        data: Array<IRef>
        totalItems: number
      }
    | {
        type: Model.Component
        data: Array<IComponentDto>
        totalItems: number
      }
    | {
        type: Model.Tag
        data: Array<ITagDto>
        totalItems: number
      }
    | {
        type: Model.Type
        data: Array<ITypeDto>
        totalItems: number
      }
  searchParams?: SearchParamsPageProps
}

export const ApplicationStoreHydrator = observer<ApplicationStoreHydratorProps>(
  ({ children, pagination: { data, totalItems, type }, searchParams }) => {
    const {
      pagination: { atomPagination },
      routerService,
    } = useApplicationStore()

    const { atomDomainService } = useDomainStore()

    useEffect(
      () => {
        if (type === Model.Atom) {
          const atoms = data
            .map((ref) => atomDomainService.atoms.get(ref.id))
            .filter(isDefined)

          atomPagination.setData(atoms, totalItems)
        }
      },
      /**
       * `atomsList` ensure reactivity when data changes
       */
      [atomDomainService.atomsList],
    )

    useCustomCompareEffect(
      () => {
        if (searchParams) {
          const params = parseSearchParamsPageProps(searchParams)

          console.log('Set search params!', params)

          routerService.setSearchParams(params)
        }
      },
      [searchParams],
      isDeepEqual,
    )

    return <>{children}</>
  },
)

ApplicationStoreHydrator.displayName = 'ApplicationStoreHydrator'
