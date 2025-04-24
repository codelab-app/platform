import { ParamProps } from './params.props';
import { SearchParamsClientProps, SearchParamsProps } from './search-params.client.props';
import { UrlParams } from './url-params';
/**
 * Examples below
 */
export type PageProps<Params extends keyof UrlParams = never, SearchParams extends keyof SearchParamsClientProps = never> = ParamProps<Params> & SearchParamsProps<SearchParams>;
