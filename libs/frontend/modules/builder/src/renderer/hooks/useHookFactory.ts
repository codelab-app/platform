/* eslint-disable react-hooks/rules-of-hooks */
import { HookFragment, HookType } from '@codelab/shared/codegen/graphql'
import axios from 'axios'
import { useQuery } from 'react-query'

export const useHookFactory = (hooks: Array<HookFragment>) => {
  const queryProps: Record<string, any> = {}

  hooks.forEach(({ id, type, config }) => {
    switch (type) {
      case HookType.Query: {
        let body = config.body ?? undefined

        try {
          if (body) {
            body = JSON.parse(body)
          }
        } catch (e) {
          //
        }

        const { data, error, isLoading } = useQuery(
          config.queryKey,
          (context) =>
            axios({
              data: body,
              url: config.url,
              method: config.method ?? 'GET',
              headers: {
                'Content-type': 'application/json',
              },
            }).then((r) => r.data),
        )

        if (config.dataPropKey) {
          queryProps[config.dataPropKey] = data
        }

        if (config.errorPropKey) {
          queryProps[config.errorPropKey] = error
        }

        if (config.loadingPropKey) {
          queryProps[config.loadingPropKey] = isLoading
        }

        break
      }
    }
  })

  return queryProps
}
