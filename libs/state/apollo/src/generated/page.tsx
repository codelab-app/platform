
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import React from 'react';
import * as Operations from './graphql';
import { getApolloClient} from '@codelab/ui/hoc';

export async function getServerPageNodeCreate<T extends true | false>(options: Omit<Apollo.QueryOptions<Types.NodeCreateMutationVariables>, 'query'>, ctx? :any
    , rawQueryResult?: T): Promise<{props: T extends true ? Apollo.ApolloQueryResult<Types.NodeCreateMutation> : {apolloState: NormalizedCacheObject} }>  {
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.NodeCreateMutation>({ ...options, query:Operations.NodeCreateDocument });

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
export const useNodeCreate = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.NodeCreateMutation, Types.NodeCreateMutationVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};

  
return useQuery(Operations.NodeCreateDocument, options);
};
export type PageNodeCreateComp = React.FC<{data?: Types.NodeCreateMutation, error?: Apollo.ApolloError}>;
export const withPageNodeCreate = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.NodeCreateMutation, Types.NodeCreateMutationVariables>) => (WrappedComponent:PageNodeCreateComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.NodeCreateDocument, options)    

                
return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrNodeCreate = {
      getServerPage: getServerPageNodeCreate,
      withPage: withPageNodeCreate,
      usePage: useNodeCreate,
    }
export async function getServerPageNodeDelete<T extends true | false>(options: Omit<Apollo.QueryOptions<Types.NodeDeleteMutationVariables>, 'query'>, ctx? :any
    , rawQueryResult?: T): Promise<{props: T extends true ? Apollo.ApolloQueryResult<Types.NodeDeleteMutation> : {apolloState: NormalizedCacheObject} }>  {
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.NodeDeleteMutation>({ ...options, query:Operations.NodeDeleteDocument });

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
export const useNodeDelete = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.NodeDeleteMutation, Types.NodeDeleteMutationVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};

  
return useQuery(Operations.NodeDeleteDocument, options);
};
export type PageNodeDeleteComp = React.FC<{data?: Types.NodeDeleteMutation, error?: Apollo.ApolloError}>;
export const withPageNodeDelete = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.NodeDeleteMutation, Types.NodeDeleteMutationVariables>) => (WrappedComponent:PageNodeDeleteComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.NodeDeleteDocument, options)    

                
return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrNodeDelete = {
      getServerPage: getServerPageNodeDelete,
      withPage: withPageNodeDelete,
      usePage: useNodeDelete,
    }
export async function getServerPageNodes<T extends true | false>(options: Omit<Apollo.QueryOptions<Types.NodesQueryVariables>, 'query'>, ctx? :any
    , rawQueryResult?: T): Promise<{props: T extends true ? Apollo.ApolloQueryResult<Types.NodesQuery> : {apolloState: NormalizedCacheObject} }>  {
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.NodesQuery>({ ...options, query:Operations.NodesDocument });

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
export const useNodes = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.NodesQuery, Types.NodesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};

  
return useQuery(Operations.NodesDocument, options);
};
export type PageNodesComp = React.FC<{data?: Types.NodesQuery, error?: Apollo.ApolloError}>;
export const withPageNodes = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.NodesQuery, Types.NodesQueryVariables>) => (WrappedComponent:PageNodesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.NodesDocument, options)    

                
return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrNodes = {
      getServerPage: getServerPageNodes,
      withPage: withPageNodes,
      usePage: useNodes,
    }