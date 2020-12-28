import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient} from '@codelab/ui/hoc';
import type { NormalizedCacheObject } from '@apollo/client';
export async function getServerPageGraphs
    (options: Omit<Apollo.QueryOptions<Types.GraphsQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GraphsQuery>({ ...options, query:Operations.GraphsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
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
export async function getServerPageGraph
    (options: Omit<Apollo.QueryOptions<Types.GraphQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GraphQuery>({ ...options, query:Operations.GraphDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGraph = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GraphQuery, Types.GraphQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GraphDocument, options);
};
export type PageGraphComp = React.FC<{data?: Types.GraphQuery, error?: Apollo.ApolloError}>;
export const withPageGraph = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GraphQuery, Types.GraphQueryVariables>) => (WrappedComponent:PageGraphComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GraphDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGraph = {
      getServerPage: getServerPageGraph,
      withPage: withPageGraph,
      usePage: useGraph,
    }

export async function getServerPageVertices
    (options: Omit<Apollo.QueryOptions<Types.VerticesQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.VerticesQuery>({ ...options, query:Operations.VerticesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useVertices = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.VerticesQuery, Types.VerticesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.VerticesDocument, options);
};
export type PageVerticesComp = React.FC<{data?: Types.VerticesQuery, error?: Apollo.ApolloError}>;
export const withPageVertices = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.VerticesQuery, Types.VerticesQueryVariables>) => (WrappedComponent:PageVerticesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.VerticesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrVertices = {
      getServerPage: getServerPageVertices,
      withPage: withPageVertices,
      usePage: useVertices,
    }