import type { IRouteType } from '@codelab/frontend/abstract/application'
import type {
  PageProps,
  SearchParamsPageProps,
  UrlParams,
} from '@codelab/frontend/abstract/types'

/**
 * Parses the page props by awaiting both params and searchParams
 *
 * The difference is in how TypeScript handles type narrowing in different contexts, as to why it's needed here but not `page.tsx`
 *
 */
export const parsePageProps = async <
  Params extends keyof UrlParams = keyof UrlParams,
  SearchParams extends keyof SearchParamsPageProps = keyof SearchParamsPageProps,
>(
  props: PageProps<Params, SearchParams>,
) => {
  const resolvedParams = await props.params
  const resolvedSearchParams = await props.searchParams

  /**
   * This is a conditional type where the keys are not known at runtime, so we need to use a type assertion to ensure the correct type is returned
   */
  return {
    params: resolvedParams!,
    searchParams: resolvedSearchParams!,
  }
}
