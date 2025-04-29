import type { ParamProps } from './params.props';
import type { SearchParamsClientProps, SearchParamsProps } from './search-params.client.props';
import type { UrlParams } from './url-params';
/**
 * Examples below
 */
export type PageProps<Params extends keyof UrlParams = never, SearchParams extends keyof SearchParamsClientProps = never> = ParamProps<Params> & SearchParamsProps<SearchParams>;
//# sourceMappingURL=page.props.d.ts.map