
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
export async function getServerPageGraph<T extends true | false>(options: Omit<Apollo.QueryOptions<Types.GraphQueryVariables>, 'query'>, ctx? :any
    , rawQueryResult?: T): Promise<{props: T extends true ? Apollo.ApolloQueryResult<Types.GraphQuery> : {apolloState: NormalizedCacheObject} }>  {
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GraphQuery>({ ...options, query:Operations.GraphDocument });

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
export async function getServerPageCreateGraph<T extends true | false>(options: Omit<Apollo.QueryOptions<Types.CreateGraphMutationVariables>, 'query'>, ctx? :any
    , rawQueryResult?: T): Promise<{props: T extends true ? Apollo.ApolloQueryResult<Types.CreateGraphMutation> : {apolloState: NormalizedCacheObject} }>  {
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CreateGraphMutation>({ ...options, query:Operations.CreateGraphDocument });

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
export const useCreateGraph = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CreateGraphMutation, Types.CreateGraphMutationVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};

  
return useQuery(Operations.CreateGraphDocument, options);
};
export type PageCreateGraphComp = React.FC<{data?: Types.CreateGraphMutation, error?: Apollo.ApolloError}>;
export const withPageCreateGraph = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CreateGraphMutation, Types.CreateGraphMutationVariables>) => (WrappedComponent:PageCreateGraphComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CreateGraphDocument, options)    

                
return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCreateGraph = {
      getServerPage: getServerPageCreateGraph,
      withPage: withPageCreateGraph,
      usePage: useCreateGraph,
    }
export async function getServerPageVertices<T extends true | false>(options: Omit<Apollo.QueryOptions<Types.VerticesQueryVariables>, 'query'>, ctx? :any
    , rawQueryResult?: T): Promise<{props: T extends true ? Apollo.ApolloQueryResult<Types.VerticesQuery> : {apolloState: NormalizedCacheObject} }>  {
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.VerticesQuery>({ ...options, query:Operations.VerticesDocument });

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