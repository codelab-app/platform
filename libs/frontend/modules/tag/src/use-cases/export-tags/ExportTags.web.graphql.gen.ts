import * as Types from '@codelab/shared/codegen/graphql';

import { TagGraphFragment } from '../Tag.fragment.graphql.gen';
import { TagGraphFragmentDoc } from '../Tag.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type ExportTagsQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetTagGraphsInput>;
}>;


export type ExportTagsQuery = { getTagGraphs: TagGraphFragment };


export const ExportTagsGql = `
    query ExportTags($input: GetTagGraphsInput) {
  getTagGraphs(input: $input) {
    ...TagGraph
  }
}
    ${TagGraphFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ExportTags: build.query<ExportTagsQuery, ExportTagsQueryVariables | void>({
      query: (variables) => ({ document: ExportTagsGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useExportTagsQuery, useLazyExportTagsQuery } = injectedRtkApi;

