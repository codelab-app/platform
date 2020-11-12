
import { NormalizedCacheObject } from '@apollo/client';
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import React from 'react';
import * as Operations from './graphql';
import * as Types from './graphql';
import { getApolloClient} from '@codelab/ui/hoc';

export async function getServerPageGraphs<T extends true | false>(options: Omit<Apollo.QueryOptions<Types.GraphsQueryVariables>, 'query'>, ctx? :any
    , rawQueryResult?: T): Promise<{props: T extends true ? Apollo.ApolloQueryResult<Types.GraphsQuery> : {apolloState: NormalizedCacheObject} }>  {
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GraphsQuery>({ ...options, query:Operations.GraphsDocument });

        if(rawQueryResult){
          return {
             props: data,
          } as any;
        }

        const apolloState = apolloClient.cache.extract();

        
return {
            props: {
                apolloState,
            },
        } as any;
        
        
      }
export const useGraphs = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GraphsQuery, Types.GraphsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};

  
return useQuery(Operations.GraphsDocument, options);
};
export type PageGraphsComp = React.FC<{data?: Types.GraphsQuery, error?: Apollo.ApolloError}>;
export const withPageGraphs = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GraphsQuery, Types.GraphsQueryVariables>) => (WrappedComponent:PageGraphsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GraphsDocument, options)    

                
return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGraphs = {
      getServerPage: getServerPageGraphs,
      withPage: withPageGraphs,
      usePage: useGraphs,
    }